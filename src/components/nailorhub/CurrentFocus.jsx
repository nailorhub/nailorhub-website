import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Target } from "lucide-react";

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const points = [
  { icon: ShieldCheck, text: "Selective intake" },
  { icon: Lock, text: "Approved projects only" },
];

export default function CurrentFocus() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="focus" className="py-24 md:py-32 bg-[#0a1628] relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#1a6fb5]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1a6fb5]/5 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[13px] font-semibold text-[#1a6fb5] uppercase tracking-widest mb-3">
            Status
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
            Current Focus
          </h2>
          <p className="text-[17px] text-gray-400 leading-relaxed mb-4">
            We're currently heads-down building internal systems and dashboards.
            We're not taking on new work publicly.
          </p>
          <p className="text-[15px] text-gray-500 leading-relaxed mb-10">
            If you have a high-leverage operations problem and want to be considered,
            submit a request. We review a limited number of projects and only take on
            what aligns with our focus.
          </p>
        </motion.div>

        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={isMobile ? { duration: 0 } : { delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-6 mb-10"
        >
          {points.map((p, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <p.icon className="w-4 h-4 text-[#1a6fb5]" />
              </div>
              <span className="text-[14px] font-medium text-gray-300">{p.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={isMobile ? { duration: 0 } : { delay: 0.3, duration: 0.6, ease: "easeOut" }}
          onClick={() => scrollTo("#contact")}
          className="inline-flex items-center px-7 py-3 bg-[#1a6fb5] hover:bg-[#155d99] text-white text-[15px] font-semibold rounded-xl shadow-lg shadow-[#1a6fb5]/20 transition-all"
        >
          Submit a Request
        </motion.button>
      </div>
    </section>
  );
}