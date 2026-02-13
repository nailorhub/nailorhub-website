import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const faqs = [
  {
    q: "Do you take on new clients?",
    a: "We're primarily focused on internal projects right now. However, we do review a limited number of outside requests. If your project involves high-leverage operations work, submit a request and we'll follow up if it's a fit.",
  },
  {
    q: "When should I go with no-code vs custom code?",
    a: "No-code is ideal for rapid prototyping, simple workflows, and teams that want to iterate quickly without engineering overhead. Custom code is the right call when you need full control, complex logic, enterprise-grade performance, or deep integrations. We help you choose the right path based on scope, timeline, and long-term needs.",
  },
  {
    q: "What types of projects are the best fit?",
    a: "We work best with operational challenges: internal dashboards, workflow automation, data unification, and team tools. If your team is running on spreadsheets, disconnected tools, or manual processes and you need a system that scales — that's our sweet spot.",
  },
];

function FAQItem({ faq, isOpen, toggle }) {
  return (
    <div className="border-b border-gray-300 last:border-0">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-[16px] font-semibold text-[#1e1e2f] pr-4 group-hover:text-[#1a6fb5] transition-colors">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[15px] text-gray-500 leading-relaxed pr-8">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 md:py-28 bg-gradient-to-b from-white to-[#fafbfd]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-[13px] font-semibold text-[#1a6fb5] uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e1e2f] tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-2xl border border-gray-300 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}