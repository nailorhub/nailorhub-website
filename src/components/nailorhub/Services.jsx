import React from "react";
import { motion } from "framer-motion";
import { BarChart3, AppWindow, Workflow, Database, Blocks, Globe } from "lucide-react";

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const noAnimVariants = { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } };

const services = [
  {
    icon: BarChart3,
    title: "Dashboards & Reporting",
    bullets: [
      "MOH, inventory risk bands, and shortage alerts",
      "Cross-location visibility and exception queues",
      "KPI rollups and executive snapshots",
    ],
  },
  {
    icon: AppWindow,
    title: "Internal Tools & Apps",
    bullets: [
      "Request, approval, and escalation workflows",
      "Role-based access with audit trail",
      "Clean data entry and exception handling",
    ],
  },
  {
    icon: Workflow,
    title: "Automation & Integrations",
    bullets: [
      "Workflow triggers, status tracking, and alerts",
      "API-based system integrations",
      "Slack notifications and email escalations",
    ],
  },
  {
    icon: Database,
    title: "Data & System Unification",
    bullets: [
      "Single source of truth across disconnected systems",
      "Cross-system reconciliation and validation",
      "Standardized datasets and definitions",
    ],
  },
  {
    icon: Blocks,
    title: "No-code & Low-code Delivery",
    bullets: [
      "Rapid internal MVPs and prototypes",
      "DronaHQ-style apps for operations teams",
      "Zapier and Paably workflow automation",
    ],
  },
  {
    icon: Globe,
    title: "Web & Commerce",
    bullets: [
      "WordPress with Breakdance and Divi",
      "WooCommerce for simple online stores",
      "Performance optimization and maintenance",
    ],
    secondary: true,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-28 bg-gradient-to-b from-white via-[#fafbfd] to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-[13px] font-semibold text-[#1a6fb5] uppercase tracking-widest mb-3">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e1e2f] tracking-tight">
            What we build
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={isMobile ? { duration: 0 } : { delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
              className="group relative bg-white rounded-2xl border border-gray-300 p-7 hover:shadow-lg hover:shadow-gray-100/80 hover:border-gray-400 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1a6fb5]/5 group-hover:bg-[#1a6fb5]/10 flex items-center justify-center mb-5 transition-colors">
                <s.icon className="w-5 h-5 text-[#1a6fb5]" />
              </div>

              <h3 className="text-[17px] font-bold text-[#1e1e2f] mb-3 flex items-center gap-2">
                {s.title}
                {s.secondary && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                    Secondary
                  </span>
                )}
              </h3>

              <ul className="space-y-2.5">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#1a6fb5]/40 mt-2 flex-shrink-0" />
                    <span className="text-[14px] text-gray-500 leading-relaxed">{b}</span>
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