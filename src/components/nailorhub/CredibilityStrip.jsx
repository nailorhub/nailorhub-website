import React from "react";
import { motion } from "framer-motion";
import { Settings, Zap, Layers, BarChart3 } from "lucide-react";

const items = [
  { icon: Settings, text: "Built for operations" },
  { icon: Zap, text: "Fast delivery, maintainable systems" },
  { icon: Layers, text: "No-code to custom code" },
  { icon: BarChart3, text: "Data-first dashboards" },
];

export default function CredibilityStrip() {
  return (
    <section className="relative bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-gray-100">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="flex items-center justify-center gap-3 px-4"
            >
              <div className="w-9 h-9 rounded-lg bg-[#1a6fb5]/5 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-[#1a6fb5]" />
              </div>
              <span className="text-[13px] font-semibold text-gray-700 leading-tight">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}