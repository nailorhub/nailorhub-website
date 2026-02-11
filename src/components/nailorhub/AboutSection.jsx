import React from "react";
import { motion } from "framer-motion";

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export default function AboutSection() {
  return (
    <section className="py-20 md:py-24 bg-[#fafbfd] border-y border-gray-100">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1e1e2f] tracking-tight mb-5">
            Small team. Operations-first.
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed">
            NailorHub is a small team building internal systems with a focus on operations, 
            data, and maintainability. We right-size the solution: no-code when it's enough, 
            low-code when speed matters, and custom code when scale is required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}