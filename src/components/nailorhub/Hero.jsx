import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Zap, Layers, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import DataFlowGrid from "./DataFlowGrid";
import SystemConnectors from "./SystemConnectors";

const credibilityItems = [
  { icon: Settings, text: "Built for operations" },
  { icon: Zap, text: "Fast delivery, maintainable systems" },
  { icon: Layers, text: "No-code to custom code" },
  { icon: BarChart3, text: "Data-first dashboards" },
];

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a1628]">
      {/* Tech background */}
      <div
        className="absolute inset-0 opacity-10 hidden md:block"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/70 via-[#0a1628]/80 to-[#0a1628]" />

      {/* Data flow animation */}
      <div className="absolute inset-0">
        <DataFlowGrid />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1a6fb5]/[0.04] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1a6fb5]/[0.04] rounded-full blur-3xl" />

      {/* Centered content */}
      <div className="relative flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full px-6 lg:px-8 pt-14 sm:pt-16 md:pt-12 pb-2">
        {/* Text content - centered */}
        <div className="flex flex-col items-center justify-center text-center w-full px-6 md:px-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-500/5 mb-7 px-4 py-2 opacity-50 rounded-full inline-flex items-center gap-2 border border-blue-500/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
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
            <span className="text-[#1a6fb5]">workflow</span> and your{" "}
            <span className="text-[#1a6fb5]">data</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-gray-300 mb-7 leading-[1.6] max-w-[640px]"
          >
            Built custom with no-code, low-code, and custom development so your
            workflows stay clean, connected, and visible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5"
          >
            <Button
              onClick={() => scrollTo("#contact")}
              className="bg-[#1a6fb5] hover:bg-[#155d99] text-white text-[14px] md:text-[15px] font-semibold px-6 md:px-7 h-11 md:h-12 rounded-xl shadow-lg shadow-[#1a6fb5]/20 hover:shadow-[#1a6fb5]/30 transition-all"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              variant="outline"
              onClick={() => scrollTo("#services")}
              className="text-[14px] md:text-[15px] font-medium px-6 md:px-7 h-11 md:h-12 rounded-xl border-[#1a6fb5]/30 text-white hover:text-white hover:bg-[#1a6fb5]/10 bg-transparent"
            >
              Explore Services
            </Button>
          </motion.div>

          {/* System connectors visual */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            <SystemConnectors />
          </motion.div>
        </div>
      </div>

      {/* Credibility items - anchored to bottom */}
      <div className="relative w-full border-t border-white/10 bg-white/[0.02] backdrop-blur-sm opacity-70">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 md:py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x divide-white/10">
            {credibilityItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.7 + i * 0.1,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="flex items-center justify-center gap-2 px-2"
              >
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-[#1a6fb5]/10 border border-[#1a6fb5]/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#1a6fb5]" />
                </div>
                <span className="text-[10px] md:text-[12px] font-semibold text-gray-300 leading-tight">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
