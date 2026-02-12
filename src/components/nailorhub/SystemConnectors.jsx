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

export default function SystemConnectors() {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [pulses, setPulses] = useState([]);

  const rowRef = useRef(null);
  const chipRefs = useRef([]);
  const hubRef = useRef(null);

  const [size, setSize] = useState({ w: 640, h: 140 });
  const [starts, setStarts] = useState([]);
  const [end, setEnd] = useState({ x: 520, y: 70 });

  const makePath = useMemo(() => {
    return (s, e) => {
      if (!s || !e) return "";
      const dx = Math.max(60, e.x - s.x);
      const c1x = s.x + dx * 0.45;
      const c2x = s.x + dx * 0.82;
      return `M ${s.x} ${s.y} C ${c1x} ${s.y}, ${c2x} ${e.y}, ${e.x} ${e.y}`;
    };
  }, []);

  const paths = useMemo(() => {
    if (!starts.length) return [];
    return starts.map((s) => makePath(s, end));
  }, [starts, end, makePath]);

  useLayoutEffect(() => {
    const calc = () => {
      if (!rowRef.current || !hubRef.current) return;

      const row = rowRef.current.getBoundingClientRect();
      const hub = hubRef.current.getBoundingClientRect();

      const w = Math.max(1, Math.round(row.width));
      const h = Math.max(1, Math.round(row.height));

      const newStarts = chipRefs.current
        .slice(0, tools.length)
        .filter(Boolean)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            x: r.left - row.left + r.width,
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

    calc();

    const ro = new ResizeObserver(calc);
    ro.observe(rowRef.current);
    ro.observe(hubRef.current);

    window.addEventListener("resize", calc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, []);

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
    const el = rowRef.current?.querySelector?.("[data-hub]");
    if (!el) return;
    el.classList.remove("nh-hub-ping");
    el.offsetHeight;
    el.classList.add("nh-hub-ping");
    window.setTimeout(() => el.classList.remove("nh-hub-ping"), 420);
  };

  const DOT = 10;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full max-w-[640px] mt-6 sm:mt-8"
      aria-label="System connectors visual"
    >
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* subtle inner grid */}
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* IMPORTANT: slightly tighter spacing on mobile so the caption doesn't get clipped */}
        <div ref={rowRef} className="relative flex items-stretch gap-4 sm:gap-6 px-4 sm:px-5 py-3 sm:py-4">
          {/* Lines */}
          <svg
            className="pointer-events-none absolute inset-0 w-full h-full"
            viewBox={`0 0 ${size.w} ${size.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {paths.map((d, i) => (
              <path
                key={i}
                d={d}
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1.25"
                fill="none"
              />
            ))}
            {/* join dot */}
            <circle cx={end.x} cy={end.y} r="4.5" fill="rgba(26,111,181,0.55)" />
          </svg>

          {/* Chips */}
          <div className="flex flex-col gap-2">
            {tools.map((t, idx) => (
              <div
                key={t.label}
                ref={(el) => (chipRefs.current[idx] = el)}
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

          {/* spacer column */}
          <div className="relative flex-1" />

          {/* Hub */}
          <div
            ref={hubRef}
            data-hub
            className="nh-hub relative z-10 min-w-[200px] sm:min-w-[240px] rounded-2xl border border-[#1a6fb5]/35 bg-[#0a1628]/40 px-4 py-4 flex flex-col items-center justify-center text-center"
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

          {/* Pulses that follow the curve */}
          {!reduceMotion &&
            paths.length === tools.length &&
            pulses.map((p) => {
              const d = paths[p.fromIndex];
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
      </div>

      {/* Caption: smaller on mobile + padding so it never clips */}
      <div className="text-center text-[11px] sm:text-[12px] text-white/60 mt-2 pb-2">
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
