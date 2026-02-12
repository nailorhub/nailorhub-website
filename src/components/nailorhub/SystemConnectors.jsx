import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Database, Sheet, PlugZap, Webhook, Network } from "lucide-react";

const tools = [
  { label: "SQL Database", Icon: Database },
  { label: "Google Sheets", Icon: Sheet },
  { label: "APIs", Icon: PlugZap },
  { label: "Webhooks", Icon: Webhook },
];

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function useIsMobile(breakpointPx = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const update = () => setIsMobile(!!mq.matches);
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

  // Shared drawing state
  const [size, setSize] = useState({ w: 640, h: 220 });
  const [starts, setStarts] = useState([]);
  const [join, setJoin] = useState({ x: 320, y: 110 });
  const [end, setEnd] = useState({ x: 320, y: 180 });

  // Path builders
  const makeDesktopPath = useMemo(() => {
    return (s, e) => {
      if (!s || !e) return "";
      const dx = Math.max(80, e.x - s.x);
      const c1x = s.x + dx * 0.45;
      const c2x = s.x + dx * 0.82;
      return `M ${s.x} ${s.y} C ${c1x} ${s.y}, ${c2x} ${e.y}, ${e.x} ${e.y}`;
    };
  }, []);

  const makeMobilePathToJoin = useMemo(() => {
    return (s, j) => {
      if (!s || !j) return "";
      // Vertical, outward-friendly curve so it doesn’t “pinch inward”
      const midY = s.y + Math.max(22, (j.y - s.y) * 0.55);
      return `M ${s.x} ${s.y}
              C ${s.x} ${midY},
                ${j.x} ${j.y - 18},
                ${j.x} ${j.y}`;
    };
  }, []);

  const makeMobileJoinToHub = useMemo(() => {
    return (j, e) => {
      if (!j || !e) return "";
      const midY = j.y + Math.max(18, (e.y - j.y) * 0.55);
      return `M ${j.x} ${j.y}
              C ${j.x} ${midY},
                ${e.x} ${e.y - 18},
                ${e.x} ${e.y}`;
    };
  }, []);

  const paths = useMemo(() => {
    if (!starts.length) return [];
    if (isMobile) {
      const toJoin = starts.map((s) => makeMobilePathToJoin(s, join));
      const joinToHub = makeMobileJoinToHub(join, end);
      return { toJoin, joinToHub };
    }
    // Desktop
    const desktop = starts.map((s) => makeDesktopPath(s, end));
    return { desktop };
  }, [starts, end, join, isMobile, makeDesktopPath, makeMobilePathToJoin, makeMobileJoinToHub]);

  // Measure + compute geometry
  useLayoutEffect(() => {
    const calcDesktop = () => {
      if (!desktopRowRef.current || !desktopHubRef.current) return;

      const row = desktopRowRef.current.getBoundingClientRect();
      const hub = desktopHubRef.current.getBoundingClientRect();

      const w = Math.max(1, Math.round(row.width));
      const h = Math.max(1, Math.round(row.height));

      const newStarts = desktopChipRefs.current
        .slice(0, tools.length)
        .filter(Boolean)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            x: r.left - row.left + r.width, // right edge of chip
            y: r.top - row.top + r.height / 2,
          };
        });

      const newEnd = {
        x: clamp(hub.left - row.left - 12, 0, w),
        y: clamp(hub.top - row.top + hub.height / 2, 0, h),
      };

      setSize({ w, h });
      setStarts(newStarts);
      setEnd(newEnd);
    };

    const calcMobile = () => {
      if (!mobileWrapRef.current || !mobileHubRef.current) return;

      const wrap = mobileWrapRef.current.getBoundingClientRect();
      const hub = mobileHubRef.current.getBoundingClientRect();

      const w = Math.max(1, Math.round(wrap.width));
      const h = Math.max(1, Math.round(wrap.height));

      const chipRects = mobileChipRefs.current
        .slice(0, tools.length)
        .filter(Boolean)
        .map((el) => el.getBoundingClientRect());

      // Start points from bottom-center of each chip
      const newStarts = chipRects.map((r) => ({
        x: r.left - wrap.left + r.width / 2,
        y: r.top - wrap.top + r.height,
      }));

      // Join point: centered under the chip grid (a bit below the lowest chip)
      const lowest = chipRects.reduce((m, r) => Math.max(m, r.bottom), -Infinity);
      const joinY = clamp(lowest - wrap.top + 18, 0, h);

      const newJoin = { x: w / 2, y: joinY };

      // End point: top-center of hub card
      const newEnd = {
        x: clamp(hub.left - wrap.left + hub.width / 2, 0, w),
        y: clamp(hub.top - wrap.top - 10, 0, h),
      };

      setSize({ w, h });
      setStarts(newStarts);
      setJoin(newJoin);
      setEnd(newEnd);
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
  }, [isMobile]);

  // Pulse scheduling
  useEffect(() => {
    if (reduceMotion) return;
    if (starts.length !== tools.length) return;

    let cancelled = false;

    const scheduleNext = () => {
      if (cancelled) return;

      const base = hovered ? 900 : 1600;
      const jitter = hovered ? 600 : 900;
      const delay = base + Math.random() * jitter;

      window.setTimeout(() => {
        if (cancelled) return;

        const fromIndex = Math.floor(Math.random() * tools.length);
        const id = uid();
        setPulses((prev) => [...prev, { id, fromIndex }]);

        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => {
      cancelled = true;
    };
  }, [hovered, reduceMotion, starts.length]);

  const hubPing = () => {
    const el = shellRef.current?.querySelector?.("[data-hub]");
    if (!el) return;
    el.classList.remove("nh-hub-ping");
    el.offsetHeight;
    el.classList.add("nh-hub-ping");
    window.setTimeout(() => el.classList.remove("nh-hub-ping"), 420);
  };

  const DOT = 10;

  return (
    <div
      ref={shellRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full max-w-[640px] mt-7 sm:mt-8"
      aria-label="System connectors visual"
    >
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* MOBILE LAYOUT */}
        {isMobile ? (
          <div ref={mobileWrapRef} className="relative px-4 pt-4 pb-5">
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full"
              viewBox={`0 0 ${size.w} ${size.h}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {(paths.toJoin || []).map((d, i) => (
                <path
                  key={i}
                  d={d}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.35"
                  fill="none"
                  strokeLinecap="round"
                />
              ))}
              {paths.joinToHub ? (
                <path
                  d={paths.joinToHub}
                  stroke="rgba(255,255,255,0.16)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              ) : null}

              {/* join dot */}
              <circle cx={join.x} cy={join.y} r="4.5" fill="rgba(26,111,181,0.60)" />
            </svg>

            {/* Chips grid */}
            <div className="relative z-10 grid grid-cols-2 gap-3">
              {tools.map((t, idx) => (
                <div
                  key={t.label}
                  ref={(el) => (mobileChipRefs.current[idx] = el)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3"
                >
                  <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center">
                    <t.Icon className="w-4 h-4 text-white/70" />
                  </div>
                  <div className="text-[12px] font-semibold text-white/75 whitespace-nowrap">
                    {t.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Hub full width */}
            <div
              ref={mobileHubRef}
              data-hub
              className="nh-hub relative z-10 mt-6 w-full rounded-2xl border border-[#1a6fb5]/35 bg-[#0a1628]/40 px-4 py-6 flex flex-col items-center justify-center text-center"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#1a6fb5]/10 border border-[#1a6fb5]/25 flex items-center justify-center mb-2">
                <Network className="w-5 h-5 text-[#6fb7ff]" />
              </div>
              <div className="text-white font-semibold tracking-tight">NailorHub</div>
              <div className="text-[11px] mt-1 text-white/55 leading-tight">
                One connected system
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_0_1px_rgba(26,111,181,0.15),0_0_32px_rgba(26,111,181,0.18)]" />
            </div>

            {/* Pulses: chip -> join (optional) then join -> hub */}
            {!reduceMotion &&
              starts.length === tools.length &&
              (paths.toJoin || []).length === tools.length &&
              pulses.map((p) => {
                const d = (paths.toJoin || [])[p.fromIndex];
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
        ) : (
          /* DESKTOP LAYOUT */
          <div ref={desktopRowRef} className="relative flex items-stretch gap-6 px-5 py-4">
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full"
              viewBox={`0 0 ${size.w} ${size.h}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {(paths.desktop || []).map((d, i) => (
                <path
                  key={i}
                  d={d}
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="1.25"
                  fill="none"
                  strokeLinecap="round"
                />
              ))}
            </svg>

            {/* Left chips */}
            <div className="flex flex-col gap-2">
              {tools.map((t, idx) => (
                <div
                  key={t.label}
                  ref={(el) => (desktopChipRefs.current[idx] = el)}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <div className="w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center">
                    <t.Icon className="w-4 h-4 text-white/70" />
                  </div>
                  <div className="text-[12px] font-semibold text-white/75 whitespace-nowrap">
                    {t.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative flex-1" />

            {/* Hub card */}
            <div
              ref={desktopHubRef}
              data-hub
              className="nh-hub relative z-10 min-w-[220px] sm:min-w-[240px] rounded-2xl border border-[#1a6fb5]/35 bg-[#0a1628]/40 px-4 py-4 flex flex-col items-center justify-center text-center"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#1a6fb5]/10 border border-[#1a6fb5]/25 flex items-center justify-center mb-2">
                <Network className="w-5 h-5 text-[#6fb7ff]" />
              </div>
              <div className="text-white font-semibold tracking-tight">NailorHub</div>
              <div className="text-[11px] mt-1 text-white/55 leading-tight">
                Connected workflow
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_0_1px_rgba(26,111,181,0.15),0_0_32px_rgba(26,111,181,0.18)]" />
            </div>

            {/* Desktop pulses (straight along the same curve) */}
            {!reduceMotion &&
              (paths.desktop || []).length === tools.length &&
              pulses.map((p) => {
                const d = (paths.desktop || [])[p.fromIndex];
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

      <div className="text-center text-[12px] text-white/60 mt-3 px-2">
        We connect your tools into one workflow
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
