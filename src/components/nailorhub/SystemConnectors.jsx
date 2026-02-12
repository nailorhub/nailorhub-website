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

function supportsOffsetPath() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("offset-path", 'path("M0 0 L10 10")');
}

export default function SystemConnectors() {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [pulses, setPulses] = useState([]);

  const isMobile = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(max-width: 767px)").matches
    : false;

  const usePathMode = !isMobile && supportsOffsetPath() && !reduceMotion;

  // Desktop refs and geometry
  const desktopRowRef = useRef(null);
  const desktopChipRefs = useRef([]);
  const desktopHubRef = useRef(null);

  const [desktopSize, setDesktopSize] = useState({ w: 640, h: 140 });
  const [desktopStarts, setDesktopStarts] = useState([]);
  const [desktopEnd, setDesktopEnd] = useState({ x: 520, y: 70 });

  // Mobile refs and geometry
  const mobileWrapRef = useRef(null);
  const mobileChipRefs = useRef([]);
  const mobileLaneRef = useRef(null);
  const mobileHubRef = useRef(null);

  const [mobileSize, setMobileSize] = useState({ w: 320, h: 70 });
  const [mobileStarts, setMobileStarts] = useState([]);
  const [mobileEnd, setMobileEnd] = useState({ x: 160, y: 60 });

  const makeCurve = useMemo(() => {
    return (s, e) => {
      if (!s || !e) return "";
      const dx = Math.max(60, e.x - s.x);
      const c1x = s.x + dx * 0.45;
      const c2x = s.x + dx * 0.82;
      return `M ${s.x} ${s.y} C ${c1x} ${s.y}, ${c2x} ${e.y}, ${e.x} ${e.y}`;
    };
  }, []);

  const makeMobileCurve = useMemo(() => {
    // Mobile lane is mostly vertical, so use a nice downward bezier
    return (s, e) => {
      if (!s || !e) return "";
      const midY = (s.y + e.y) / 2;
      return `M ${s.x} ${s.y} C ${s.x} ${midY}, ${e.x} ${midY}, ${e.x} ${e.y}`;
    };
  }, []);

  // Desktop paths
  const desktopPaths = useMemo(() => {
    if (!desktopStarts.length) return [];
    return desktopStarts.map((s) => makeCurve(s, desktopEnd));
  }, [desktopStarts, desktopEnd, makeCurve]);

  // Mobile paths (in the connector lane)
  const mobilePaths = useMemo(() => {
    if (!mobileStarts.length) return [];
    return mobileStarts.map((s) => makeMobileCurve(s, mobileEnd));
  }, [mobileStarts, mobileEnd, makeMobileCurve]);

  // Desktop measurement (side-by-side layout)
  useLayoutEffect(() => {
    if (isMobile) return;

    const calc = () => {
      if (!desktopRowRef.current || !desktopHubRef.current) return;

      const row = desktopRowRef.current.getBoundingClientRect();
      const hub = desktopHubRef.current.getBoundingClientRect();

      const w = Math.max(1, Math.round(row.width));
      const h = Math.max(1, Math.round(row.height));

      const starts = desktopChipRefs.current
        .slice(0, tools.length)
        .filter(Boolean)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.left - row.left + r.width, y: r.top - row.top + r.height / 2 };
        });

      const end = {
        x: clamp(hub.left - row.left - 12, 0, w),
        y: clamp(hub.top - row.top + hub.height / 2, 0, h),
      };

      setDesktopSize({ w, h });
      setDesktopStarts(starts);
      setDesktopEnd(end);
    };

    calc();

    const ro = new ResizeObserver(calc);
    ro.observe(desktopRowRef.current);
    ro.observe(desktopHubRef.current);
    window.addEventListener("resize", calc);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, [isMobile]);

  // Mobile measurement (stacked layout with connector lane)
  useLayoutEffect(() => {
    if (!isMobile) return;

    const calc = () => {
      if (!mobileWrapRef.current || !mobileLaneRef.current || !mobileHubRef.current) return;

      const wrap = mobileWrapRef.current.getBoundingClientRect();
      const lane = mobileLaneRef.current.getBoundingClientRect();
      const hub = mobileHubRef.current.getBoundingClientRect();

      const w = Math.max(1, Math.round(lane.width));
      const h = Math.max(1, Math.round(lane.height));

      // Start points are chip centers projected into lane coordinate space (x relative to lane)
      const starts = mobileChipRefs.current
        .slice(0, tools.length)
        .filter(Boolean)
        .map((el) => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          return {
            x: clamp(cx - lane.left, 8, w - 8),
            y: 8, // start at top of lane
          };
        });

      // End point is top-center of hub projected into lane
      const hubCenterX = hub.left + hub.width / 2;
      const end = {
        x: clamp(hubCenterX - lane.left, 8, w - 8),
        y: clamp(lane.height - 10, 10, h),
      };

      setMobileSize({ w, h });
      setMobileStarts(starts);
      setMobileEnd(end);
    };

    calc();

    const ro = new ResizeObserver(calc);
    ro.observe(mobileWrapRef.current);
    ro.observe(mobileLaneRef.current);
    ro.observe(mobileHubRef.current);
    window.addEventListener("resize", calc);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, [isMobile]);

  const hubPing = (scopeRef) => {
    const el = scopeRef.current?.querySelector?.("[data-hub]");
    if (!el) return;
    el.classList.remove("nh-hub-ping");
    el.offsetHeight;
    el.classList.add("nh-hub-ping");
    window.setTimeout(() => el.classList.remove("nh-hub-ping"), 420);
  };

  // Pulse scheduler
  useEffect(() => {
    if (reduceMotion) return;

    const ready = isMobile ? mobileStarts.length === tools.length : desktopStarts.length === tools.length;
    if (!ready) return;

    let cancelled = false;

    const scheduleNext = () => {
      if (cancelled) return;

      const base = hovered ? 900 : 1500;
      const jitter = hovered ? 500 : 900;
      const delay = base + Math.random() * jitter;

      window.setTimeout(() => {
        if (cancelled) return;
        const fromIndex = Math.floor(Math.random() * tools.length);
        setPulses((prev) => [...prev, { id: uid(), fromIndex }]);
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => {
      cancelled = true;
    };
  }, [hovered, reduceMotion, isMobile, mobileStarts.length, desktopStarts.length]);

  const DOT = 10;

  return (
    <div
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
        <div ref={mobileWrapRef} className="relative md:hidden px-5 py-4">
          {/* Chips grid */}
          <div className="grid grid-cols-2 gap-2 relative z-10">
            {tools.map((t, idx) => (
              <div
                key={t.label}
                ref={(el) => (mobileChipRefs.current[idx] = el)}
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

          {/* Connector lane */}
          <div ref={mobileLaneRef} className="relative mt-3 h-[70px]">
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full"
              viewBox={`0 0 ${mobileSize.w} ${mobileSize.h}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {mobilePaths.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="2"
                  fill="none"
                />
              ))}
              <circle cx={mobileEnd.x} cy={mobileEnd.y} r="4.5" fill="rgba(26,111,181,0.60)" />
            </svg>

            {!reduceMotion &&
              pulses.map((p) => {
                const d = mobilePaths[p.fromIndex];
                if (!d) return null;

                return (
                  <motion.div
                    key={p.id}
                    className="pointer-events-none absolute rounded-full bg-[#1a6fb5] shadow-[0_0_18px_rgba(26,111,181,0.55)]"
                    style={{
                      width: DOT,
                      height: DOT,
                      left: 0,
                      top: 0,
                      offsetPath: `path("${d}")`,
                      WebkitOffsetPath: `path("${d}")`,
                      offsetRotate: "0deg",
                      WebkitOffsetRotate: "0deg",
                    }}
                    initial={{ offsetDistance: "0%", opacity: 0, scale: 0.9 }}
                    animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.85] }}
                    transition={{ duration: hovered ? 1.0 : 1.25, ease: "easeInOut" }}
                    onAnimationComplete={() => {
                      setPulses((prev) => prev.filter((x) => x.id !== p.id));
                      hubPing(mobileWrapRef);
                    }}
                  />
                );
              })}
          </div>

          {/* Hub */}
          <div
            ref={mobileHubRef}
            data-hub
            className="nh-hub relative z-10 mt-2 rounded-2xl border border-[#1a6fb5]/35 bg-[#0a1628]/40 px-4 py-5 flex flex-col items-center justify-center text-center"
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
        </div>

        {/* DESKTOP LAYOUT */}
        <div ref={desktopRowRef} className="relative hidden md:flex items-stretch gap-6 px-5 py-4">
          <svg
            className="pointer-events-none absolute inset-0 w-full h-full"
            viewBox={`0 0 ${desktopSize.w} ${desktopSize.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {desktopPaths.map((d, i) => (
              <path
                key={i}
                d={d}
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1.75"
                fill="none"
              />
            ))}
            <circle cx={desktopEnd.x} cy={desktopEnd.y} r="4.5" fill="rgba(26,111,181,0.55)" />
          </svg>

          <div className="relative z-10 flex flex-col gap-2">
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

          {!reduceMotion &&
            usePathMode &&
            pulses.map((p) => {
              const d = desktopPaths[p.fromIndex];
              if (!d) return null;

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
                  }}
                  initial={{ offsetDistance: "0%", opacity: 0, scale: 0.9 }}
                  animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.85] }}
                  transition={{ duration: hovered ? 1.0 : 1.25, ease: "easeInOut" }}
                  onAnimationComplete={() => {
                    setPulses((prev) => prev.filter((x) => x.id !== p.id));
                    hubPing(desktopRowRef);
                  }}
                />
              );
            })}
        </div>
      </div>

      <div className="text-center text-[12px] text-white/60 mt-3">
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
