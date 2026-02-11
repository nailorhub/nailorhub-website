import React from "react";
import { motion } from "framer-motion";
import { Package, CheckSquare, PieChart } from "lucide-react";

const cases = [
  {
    icon: Package,
    title: "Inventory visibility dashboard",
    bullets: [
      "MOH and risk bands",
      "Shortages and exceptions",
      "Cross-location view and alerts",
    ],
  },
  {
    icon: CheckSquare,
    title: "Purchasing and approvals workflow",
    bullets: [
      "Request and approval flows",
      "Status tracking and escalations",
      "Audit-friendly history",
    ],
  },
  {
    icon: PieChart,
    title: "Operations reporting and reconciliation",
    bullets: [
      "KPI rollups",
      "Exception queues",
      "Single source of truth across systems",
    ],
  },
];

export default function ProofSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white via-[#fafbfd] to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[13px] font-semibold text-[#1a6fb5] uppercase tracking-widest mb-3">
            In Practice
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e1e2f] tracking-tight">
            What this looks like in practice
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#fafbfd] border border-gray-100 rounded-xl p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1a6fb5]/5 flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5 text-[#1a6fb5]" />
              </div>
              <h3 className="text-[16px] font-bold text-[#1e1e2f] mb-3 leading-snug">
                {c.title}
              </h3>
              <ul className="space-y-2">
                {c.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#1a6fb5]/40 mt-2 flex-shrink-0" />
                    <span className="text-[14px] text-gray-600 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}