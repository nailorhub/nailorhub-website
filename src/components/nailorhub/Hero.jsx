"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Zap, Layers, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import SystemConnectors from "./SystemConnectors";

const credibilityItems = [
  { icon: Settings, text: "Built for operations" },
  { icon: Zap, text: "Maintainable systems" },
  { icon: Layers, text: "Customized solutions" },
  { icon: BarChart3, text: "Data-first dashboards" },
];

function useIsMobile(breakpointPx = 768) {
  const getMatches = () => {
    if (typeof window === "undefined") return true;
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

export default function Hero() {
  const isMobile = useIsMobile(768);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{ minHeight: "var(--viewport-height, 100svh)" }}
      className="
        hero-section relative isolate flex flex-col overflow-hidden bg-[#0a1628]
        pb-[calc(env(safe-area-inset-bottom)-35px)] md:pb-0
      "
    >
      {/* Tech background (desktop only) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10 hidden md:block"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1628]/70 via-[#0a1628]/80 to-[#0a1628]" />

      {/* Gradient orbs (desktop only) */}
      <div className="pointer-events-none hidden md:block absolute top-0 right-0 w-[600px] h-[600px] bg-[#1a6fb5]/[0.04] rounded-full blur-3xl" />
      <div className="pointer-events-none hidden md:block absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1a6fb5]/[0.04] rounded-full blur-3xl" />

      {/* Centered content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full px-6 lg:px-8 pt-16 sm:pt-16 md:pt-12 pb-4">
        <div className="flex flex-col items-center justify-center text-center w-full px-6 md:px-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-500/5 mb-7 px-4 py-2 opacity-50 rounded-full inline-flex items-center gap-2 border border-blue-500/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-blue-300/60 pl-3 text-sm font-medium tracking-wide">
              Currently focused on internal projects
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-white mb-5 text-3xl font-bold tracking-tight leading-[1.2] sm:text-4xl lg:text-5xl"
          >
            Internal tools that connect your{" "}
            <span className="text-[#1a6fb5]">workflow</span> and{" "}
            <span className="text-[#1a6fb5]">data</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-gray-300 mb-7 leading-[1.6] max-w-[640px] text-[14px] sm:text-[15px]"
          >
            Built custom with no-code, low-code, and custom development so your
            workflows stay clean, connected, and visible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex w-full max-w-[420px] flex-row items-center justify-center gap-3"
          >
            <Button
              onClick={() => scrollTo("#contact")}
              className="flex-1 bg-[#1a6fb5] hover:bg-[#155d99] text-white text-[14px] md:text-[15px] font-semibold px-4 md:px-7 h-11 md:h-12 rounded-xl shadow-lg shadow-[#1a6fb5]/20 hover:shadow-[#1a6fb5]/30 transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              variant="outline"
              onClick={() => scrollTo("#services")}
              className="flex-1 text-[14px] md:text-[15px] font-medium px-4 md:px-7 h-11 md:h-12 rounded-xl border-[#1a6fb5]/30 text-white hover:text-white hover:bg-[#1a6fb5]/10 bg-transparent"
            >
              Services
            </Button>
          </motion.div>

          {/* System connectors visual + caption */}
          <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
  className="w-full flex justify-center mt-2 sm:mt-0"
>
            <div className="w-full flex flex-col items-center justify-center min-h-[360px] sm:min-h-[240px] pb-2">
              <SystemConnectors />
              <div className="text-center text-[11px] sm:text-[12px] text-white/60 mt-2">
                We connect your tools into one workflow
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Credibility bar INSIDE hero, anchored to bottom */}
      <div className="relative z-10 w-full mt-auto shrink-0 border-t border-white/10 bg-white/[0.02] md:backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 opacity-80">
          <div className="relative">
            <div className="pointer-events-none hidden md:block absolute inset-y-0 left-0 right-0">
              <div className="absolute inset-y-0 left-1/4 w-px bg-white/10" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
              <div className="absolute inset-y-0 left-3/4 w-px bg-white/10" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 py-3 md:py-6">
              {credibilityItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                  className="px-2 md:px-0"
                >
                  <div className="grid grid-cols-[40px_1fr] items-center gap-3 md:flex md:items-center md:justify-center md:gap-4 md:px-6">
                    <div className="w-9 h-9 rounded-lg bg-[#1a6fb5]/10 border border-[#1a6fb5]/20 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-[#6fb7ff]" />
                    </div>
                    <span className="text-[10px] md:text-[12px] font-semibold text-gray-300 leading-tight">
                      {item.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
