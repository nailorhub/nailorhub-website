import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Database, Sheet, PlugZap, Webhook, Network } from "lucide-react";

const CHIP_COUNT = 4;

// Rotation pool (your stack + what you do)
const TOOL_POOL = [
  { label: "SQL Database", Icon: Database },
  { label: "Google Sheets", Icon: Sheet },
  { label: "MongoDB", Icon: Database },
  { label: "Supabase", Icon: Database },
  { label: "Azure", Icon: Network },
  { label: "GitHub", Icon: Network },
  { label: "Vercel", Icon: Network },
  { label: "DigitalOcean", Icon: Network },
  { label: "Zapier", Icon: PlugZap },
  { label: "Pabbly", Icon: PlugZap },
  { label: "GraphQL", Icon: PlugZap },
  { label: "REST APIs", Icon: PlugZap },
  { label: "Webhooks", Icon: Webhook },
  { label: "Airtable", Icon: Sheet },
  { label: "Notion", Icon: Sheet },
  { label: "Slack", Icon: Network },
  { label: "Microsoft Teams", Icon: Network },
  { label: "Google Drive", Icon: Sheet },
  { label: "WordPress", Icon: Network },
];

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function useIsMobile(breakpointPx = 640) {
  const getMatches = () => {
    if (typeof window === "undefined") return true; // SSR: assume mobile to avoid hydration layout jump on mobile
    return window.matchMedia(`(max-width: ${breakpointPx}px)`).matches;
  };

  const [isMobile, setIsMobile] = useState(getMatches);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const update = () => setIsMobile(mq.matches);

    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, [breakpointPx]);

  return isMobile;
}


export default function SystemConnectors() {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile(640);

  const [hovered, setHovered] = useState(false);

  // Desktop pulses only
  const [pulses, setPulses] = useState([]);

  const shellRef = useRef(null);

  // Desktop refs
  const desktopRowRef = useRef(null);
  const desktopChipRefs = useRef([]);
  const desktopHubRef = useRef(null);

  // Mobile refs
  const mobileWrapRef = useRef(null);
  const mobileChipRefs = useRef([]);
  const mobileHubRef = useRef(null);

  // Shared SVG viewBox size
  const [size, setSize] = useState({ w: 640, h: 220 });

  // Desktop geometry
  const [desktopStarts, setDesktopStarts] = useState([]);
  const [desktopEnd, setDesktopEnd] = useState({ x: 520, y: 70 });

  // Mobile geometry (two vertical lines under bottom row chips index 2 & 3)
  const [mobileGeom, setMobileGeom] = useState({
    ready: false,
    xA: 0,
    xB: 0,
    yStart: 0,
    yEnd: 0,
  });

  const DOT = 9;

  // Queue rotation (carryover so we never show a "lonely leftover")
  const queueRef = useRef([]);
  const lastSetRef = useRef("");

  const [visibleTools, setVisibleTools] = useState(() => {
    queueRef.current = shuffle(TOOL_POOL);
    const first = queueRef.current.slice(0, CHIP_COUNT);
    queueRef.current = queueRef.current.slice(CHIP_COUNT);
    lastSetRef.current = first.map((t) => t.label).join("|");
    return first;
  });

  // Rotate ALL 4 at once using carryover queue logic
  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      if (hovered) return;

      setVisibleTools(() => {
        // If fewer than 4 remain, carry them into next cycle and top up with fresh shuffled items
        if (queueRef.current.length < CHIP_COUNT) {
          let nextBatch = [...queueRef.current]; // 0..3 items carried

          while (nextBatch.length < CHIP_COUNT) {
            const fresh = shuffle(TOOL_POOL);
            const filtered = fresh.filter(
              (t) => !nextBatch.some((x) => x.label === t.label)
            );
            nextBatch = nextBatch.concat(filtered.slice(0, CHIP_COUNT - nextBatch.length));
          }

          // Build a new queue excluding what we just used
          const usedLabels = new Set(nextBatch.map((t) => t.label));
          queueRef.current = shuffle(TOOL_POOL).filter((t) => !usedLabels.has(t.label));

          const sig = nextBatch.map((t) => t.label).join("|");
          lastSetRef.current = sig;
          return nextBatch;
        }

        // Normal case: take next 4
        const next = queueRef.current.slice(0, CHIP_COUNT);
        queueRef.current = queueRef.current.slice(CHIP_COUNT);

        // Prevent exact same 4 twice in a row
        const sig = next.map((t) => t.label).join("|");
        if (sig === lastSetRef.current && queueRef.current.length >= CHIP_COUNT) {
          const alt = queueRef.current.slice(0, CHIP_COUNT);
          queueRef.current = queueRef.current.slice(CHIP_COUNT).concat(next);
          lastSetRef.current = alt.map((t) => t.label).join("|");
          return alt;
        }

        lastSetRef.current = sig;
        return next;
      });
    }, 4200);

    return () => window.clearInterval(interval);
  }, [reduceMotion, hovered]);

  // Desktop path builder
  const makeDesktopPath = useMemo(() => {
    return (s, e) => {
      if (!s || !e) return "";
      const dx = Math.max(80, e.x - s.x);
      const c1x = s.x + dx * 0.45;
      const c2x = s.x + dx * 0.82;
      return `M ${s.x} ${s.y} C ${c1x} ${s.y}, ${c2x} ${e.y}, ${e.x} ${e.y}`;
    };
  }, []);

  const desktopPaths = useMemo(() => {
    if (!desktopStarts.length) return [];
    return desktopStarts.map((s) => makeDesktopPath(s, desktopEnd));
  }, [desktopStarts, desktopEnd, makeDesktopPath]);

  // Measure layout + compute geometry
  useLayoutEffect(() => {
    const calcDesktop = () => {
      if (!desktopRowRef.current || !desktopHubRef.current) return;

      const row = desktopRowRef.current.getBoundingClientRect();
      const hub = desktopHubRef.current.getBoundingClientRect();

      const w = Math.max(1, Math.round(row.width));
      const h = Math.max(1, Math.round(row.height));

      const starts = desktopChipRefs.current
        .slice(0, CHIP_COUNT)
        .filter(Boolean)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            x: r.left - row.left + r.width, // right edge of chip
            y: r.top - row.top + r.height / 2,
          };
        });

      const end = {
        x: clamp(hub.left - row.left - 12, 0, w),
        y: clamp(hub.top - row.top + hub.height / 2, 0, h),
      };

      setSize({ w, h });
      setDesktopStarts(starts);
      setDesktopEnd(end);
    };

    const calcMobile = () => {
      if (!mobileWrapRef.current || !mobileHubRef.current) return;

      const wrap = mobileWrapRef.current.getBoundingClientRect();
      const hub = mobileHubRef.current.getBoundingClientRect();

      const w = Math.max(1, Math.round(wrap.width));
      const h = Math.max(1, Math.round(wrap.height));

      const rects = mobileChipRefs.current
        .slice(0, CHIP_COUNT)
        .filter(Boolean)
        .map((el) => el.getBoundingClientRect());

      // Bottom row chips in a 2-col grid are indices 2 and 3
      const aRect = rects[2];
      const bRect = rects[3];

      setSize({ w, h });

      if (!aRect || !bRect) {
        setMobileGeom((g) => ({ ...g, ready: false }));
        return;
      }

      const xA = clamp(aRect.left - wrap.left + aRect.width / 2, 0, w);
      const xB = clamp(bRect.left - wrap.left + bRect.width / 2, 0, w);

      // Start just under the bottom row
      const yStart = clamp(
        Math.round(Math.max(aRect.bottom, bRect.bottom) - wrap.top + 6),
        0,
        h
      );

      // End a short distance above the hub top
      let yEnd = clamp(Math.round(hub.top - wrap.top - 12), 0, h);
      if (yEnd < yStart + 18) yEnd = clamp(yStart + 32, 0, h);

      setMobileGeom({
        ready: true,
        xA,
        xB,
        yStart,
        yEnd,
      });
    };

    const calc = () => {
      if (isMobile) calcMobile();
      else calcDesktop();
    };

    calc();

    const ro = new ResizeObserver(calc);
    if (isMobile) {
      if (mobileWrapRef.current) ro.observe(mobileWrapRef.current);
      if (mobileHubRef.current) ro.observe(mobileHubRef.current);
    } else {
      if (desktopRowRef.current) ro.observe(desktopRowRef.current);
      if (desktopHubRef.current) ro.observe(desktopHubRef.current);
    }

    window.addEventListener("resize", calc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, [isMobile, visibleTools]);

  // Desktop pulse scheduling
  useEffect(() => {
    if (isMobile) return;
    if (reduceMotion) return;
    if (desktopStarts.length !== CHIP_COUNT) return;

    let cancelled = false;

    const scheduleNext = () => {
      if (cancelled) return;

      const base = hovered ? 900 : 1600;
      const jitter = hovered ? 600 : 900;
      const delay = base + Math.random() * jitter;

      window.setTimeout(() => {
        if (cancelled) return;

        const fromIndex = Math.floor(Math.random() * CHIP_COUNT);
        const id = uid();
        setPulses((prev) => [...prev, { id, fromIndex }]);

        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => {
      cancelled = true;
    };
  }, [hovered, reduceMotion, desktopStarts.length, isMobile]);

  const hubPing = () => {
    const el = shellRef.current?.querySelector?.("[data-hub]");
    if (!el) return;
    el.classList.remove("nh-hub-ping");
    el.offsetHeight;
    el.classList.add("nh-hub-ping");
    window.setTimeout(() => el.classList.remove("nh-hub-ping"), 420);
  };

  return (
    <div
      ref={shellRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full max-w-[560px] md:max-w-[600px] mt-6 sm:mt-8"
      aria-label="System connectors visual"
    >
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* subtle inner grid */}
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {isMobile ? (
          // MOBILE
          <div ref={mobileWrapRef} className="relative px-4 pt-4 pb-5">
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full"
              viewBox={`0 0 ${size.w} ${size.h}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {mobileGeom.ready && (
                <>
                  {/* Two short vertical lines under bottom row chips */}
                  <line
                    x1={mobileGeom.xA}
                    y1={mobileGeom.yStart}
                    x2={mobileGeom.xA}
                    y2={mobileGeom.yEnd}
                    stroke="rgba(255,255,255,0.16)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1={mobileGeom.xB}
                    y1={mobileGeom.yStart}
                    x2={mobileGeom.xB}
                    y2={mobileGeom.yEnd}
                    stroke="rgba(255,255,255,0.16)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  {!reduceMotion && (
                    <>
                      <motion.circle
                        key={`a-dot-${mobileGeom.xA}-${mobileGeom.yStart}-${mobileGeom.yEnd}`}
                        cx={mobileGeom.xA}
                        r={DOT / 2}
                        fill="rgb(26,111,181)"
                        initial={{ cy: mobileGeom.yStart, opacity: 0 }}
                        animate={{ cy: mobileGeom.yEnd, opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration: hovered ? 0.65 : 0.85,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: hovered ? 0.25 : 0.45,
                        }}
                        onUpdate={(latest) => {
                          if (typeof latest?.cy === "number" && latest.cy >= mobileGeom.yEnd - 1) {
                            hubPing();
                          }
                        }}
                      />
                      <motion.circle
                        key={`b-dot-${mobileGeom.xB}-${mobileGeom.yStart}-${mobileGeom.yEnd}`}
                        cx={mobileGeom.xB}
                        r={DOT / 2}
                        fill="rgb(26,111,181)"
                        initial={{ cy: mobileGeom.yStart, opacity: 0 }}
                        animate={{ cy: mobileGeom.yEnd, opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration: hovered ? 0.65 : 0.85,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: hovered ? 0.25 : 0.45,
                          delay: 0.18,
                        }}
                        onUpdate={(latest) => {
                          if (typeof latest?.cy === "number" && latest.cy >= mobileGeom.yEnd - 1) {
                            hubPing();
                          }
                        }}
                      />
                    </>
                  )}
                </>
              )}
            </svg>

            {/* Chips grid */}
            <div className="relative z-10 grid grid-cols-2 gap-3">
              {visibleTools.map((t, idx) => (
                <div
                  key={`${t.label}-${idx}`}
                  ref={(el) => (mobileChipRefs.current[idx] = el)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3"
                >
                  <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center">
                    <t.Icon className="w-4 h-4 text-white/70" />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={t.label}
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.75, ease: "easeOut" }}
                      className="text-[12px] font-semibold text-white/75 whitespace-nowrap"
                    >
                      {t.label}
                    </motion.div>
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Hub full width */}
            <div
              ref={mobileHubRef}
              data-hub
              className="nh-hub relative z-10 mt-6 w-full rounded-2xl border border-[#1a6fb5]/35 bg-[#0a1628]/40 px-4 py-4 flex flex-col items-center justify-center text-center"
            >
              <div className="w-8 h-8 rounded-xl bg-[#1a6fb5]/10 border border-[#1a6fb5]/25 flex items-center justify-center mb-2">
                <Network className="w-4 h-4 text-[#6fb7ff]" />
              </div>

              <div className="text-white font-semibold tracking-tight">NailorHub</div>
              <div className="text-[11px] mt-0.5 text-white/55 leading-tight">
                One connected system
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_0_1px_rgba(26,111,181,0.15),0_0_32px_rgba(26,111,181,0.18)]" />
            </div>
          </div>
        ) : (
          // DESKTOP
          <div ref={desktopRowRef} className="relative flex items-stretch gap-6 px-5 py-4">
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full"
              viewBox={`0 0 ${size.w} ${size.h}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {desktopPaths.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="1.25"
                  fill="none"
                  strokeLinecap="round"
                />
              ))}
              <circle cx={desktopEnd.x} cy={desktopEnd.y} r="4.5" fill="rgba(26,111,181,0.55)" />
            </svg>

            <div className="flex flex-col gap-2">
              {visibleTools.map((t, idx) => (
                <div
                  key={`${t.label}-${idx}`}
                  ref={(el) => (desktopChipRefs.current[idx] = el)}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <div className="w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center">
                    <t.Icon className="w-4 h-4 text-white/70" />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={t.label}
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="text-[12px] font-semibold text-white/75 whitespace-nowrap"
                    >
                      {t.label}
                    </motion.div>
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="relative flex-1" />

            <div
              ref={desktopHubRef}
              data-hub
              className="nh-hub relative z-10 min-w-[200px] rounded-2xl border border-[#1a6fb5]/35 bg-[#0a1628]/40 px-4 py-4 flex flex-col items-center justify-center text-center"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#1a6fb5]/10 border border-[#1a6fb5]/25 flex items-center justify-center mb-2">
                <Network className="w-5 h-5 text-[#6fb7ff]" />
              </div>
              <div className="text-white font-semibold tracking-tight">NailorHub</div>
              <div className="text-[11px] mt-1 text-white/55 leading-tight">One connected system</div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_0_1px_rgba(26,111,181,0.15),0_0_32px_rgba(26,111,181,0.18)]" />
            </div>

            {!reduceMotion &&
              desktopPaths.length === CHIP_COUNT &&
              pulses.map((p) => {
                const d = desktopPaths[p.fromIndex];
                if (!d) return null;

                const duration = hovered ? 1.0 : 1.25;

                return (
                  <motion.div
                    key={p.id}
                    className="pointer-events-none absolute rounded-full bg-[#1a6fb5] shadow-[0_0_18px_rgba(26,111,181,0.65)]"
                    style={{
                      width: DOT,
                      height: DOT,
                      left: 0,
                      top: 0,
                      offsetPath: `path("${d}")`,
                      WebkitOffsetPath: `path("${d}")`,
                      offsetRotate: "0deg",
                      WebkitOffsetRotate: "0deg",
                      willChange: "offset-distance, opacity, transform",
                    }}
                    initial={{ offsetDistance: "0%", opacity: 0, scale: 0.9 }}
                    animate={{
                      offsetDistance: "100%",
                      opacity: [0, 1, 1, 0],
                      scale: [0.9, 1, 1, 0.85],
                    }}
                    transition={{ duration, ease: "easeInOut" }}
                    onAnimationComplete={() => {
                      setPulses((prev) => prev.filter((x) => x.id !== p.id));
                      hubPing();
                    }}
                  />
                );
              })}
          </div>
        )}
      </div>

    
      <style>{`
        .nh-hub-ping { animation: nhHubPing 420ms ease-out; }
        @keyframes nhHubPing {
          0% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.02); filter: brightness(1.15); }
          100% { transform: scale(1); filter: brightness(1); }
        }
      `}</style>
    </div>
  );
}
