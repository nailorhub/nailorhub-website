import React from "react";
import { motion } from "framer-motion";
import { Search, Hammer, Scaling } from "lucide-react";

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Discover",
    desc: "Map your workflow, define success metrics, and identify the highest-leverage opportunities.",
  },
  {
    num: "02",
    icon: Hammer,
    title: "Build",
    desc: "Ship in tight iterations with milestones, clear ownership, and no surprises.",
  },
  {
    num: "03",
    icon: Scaling,
    title: "Scale",
    desc: "Permissions, documentation, performance tuning, and long-term maintainability built in.",
  },
];

export default function Approach() {
  return (
    <section id="approach" className="py-24 md:py-32 bg-[#0f1923] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-[13px] font-semibold text-[#1a6fb5] uppercase tracking-widest mb-3">
            Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How we deliver
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={isMobile ? { duration: 0 } : { delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/[0.07] transition-all text-center"
            >
              <div className="relative inline-block mb-5">
                <span className="text-[80px] font-black text-[#1a6fb5]/40 leading-none select-none">
                  {step.num}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-[15px] text-gray-400 leading-relaxed">{step.desc}</p>
              
              {/* Arrow connector */}
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="flex items-center">
                    <div className="w-4 h-[2px] bg-gradient-to-r from-[#1a6fb5]/60 to-[#1a6fb5]/30" />
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#1a6fb5]/30" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Callout */}
        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
          className="relative max-w-3xl mx-auto bg-gradient-to-r from-[#1a6fb5]/10 to-[#1a6fb5]/5 border border-[#1a6fb5]/20 rounded-2xl p-8 text-center backdrop-blur-sm"
        >
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-20 h-[2px] bg-gradient-to-r from-transparent via-[#1a6fb5] to-transparent" />
          <p className="text-[17px] sm:text-lg font-semibold text-white leading-relaxed">
            "No-code when it's enough.{" "}
            <span className="text-[#1a6fb5]">Low-code when you need speed.</span>{" "}
            Custom code when you need scale."
          </p>
        </motion.div>
      </div>
    </section>
  );
}