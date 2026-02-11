import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32 bg-[#1a6fb5] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }} />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">
            Ready to transform your operations?
          </h2>
          <p className="text-[17px] text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
            Let's discuss how we can streamline your workflows and build the perfect solution for your business.
          </p>
          <Button
            onClick={() => scrollTo("#contact")}
            className="bg-white hover:bg-gray-50 text-[#1a6fb5] text-[15px] font-semibold px-8 h-12 rounded-xl shadow-lg"
          >
            Let's Talk
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}