import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, CheckCircle2, Loader2 } from "lucide-react";

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", need: "",
    current_tools: "", timeline: "", budget_range: ""
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const subject = encodeURIComponent("Project Request from nailorhub.com");
    const body = encodeURIComponent(
      `Name: ${form.name}
` +
      `Email: ${form.email}
` +
      `Company: ${form.company}

` +
      `What you need:
${form.need}

` +
      `Current tools: ${form.current_tools}
` +
      `Timeline: ${form.timeline}
` +
      `Budget range: ${form.budget_range}
`
    );

    // Opens the visitor's email client with a pre-filled message.
    window.location.href = `mailto:patrick@nailorhub.com?subject=${subject}&body=${body}`;

    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <section id="contact" className="py-24 md:py-32 bg-[#0f1923] relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12"
          >
            <CheckCircle2 className="w-12 h-12 text-[#1a6fb5] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Request Submitted</h3>
            <p className="text-gray-400 text-[15px]">
              We'll review your project and follow up if it aligns with our current focus.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0f1923] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <p className="text-[13px] font-semibold text-[#1a6fb5] uppercase tracking-widest mb-3">
              Get in Touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Request a Project
            </h2>
            <p className="text-[15px] text-gray-400 leading-relaxed">
              Share what you're trying to improve. If it aligns with our current focus, we'll follow up.
            </p>
          </motion.div>

          <motion.form
            initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={isMobile ? { duration: 0 } : { delay: 0.1, duration: 0.6, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 sm:p-10"
          >
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">
                  Name <span className="text-red-400">*</span>
                </label>
                <Input
                  required
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Your full name"
                  className="h-11 bg-white/5 border-white/10 rounded-lg focus:border-[#1a6fb5] focus:ring-[#1a6fb5]/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">
                  Email <span className="text-red-400">*</span>
                </label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="you@company.com"
                  className="h-11 bg-white/5 border-white/10 rounded-lg focus:border-[#1a6fb5] focus:ring-[#1a6fb5]/10 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">
                Company
              </label>
              <Input
                value={form.company}
                onChange={handleChange("company")}
                placeholder="Company or organization"
                className="h-11 bg-white/5 border-white/10 rounded-lg focus:border-[#1a6fb5] focus:ring-[#1a6fb5]/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="mb-5">
              <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">
                What you need <span className="text-red-400">*</span>
              </label>
              <Textarea
                required
                value={form.need}
                onChange={handleChange("need")}
                placeholder="Describe what you're trying to improve or build..."
                className="min-h-[120px] bg-white/5 border-white/10 rounded-lg focus:border-[#1a6fb5] focus:ring-[#1a6fb5]/10 resize-none text-white placeholder:text-gray-500"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mb-8">
              <div>
                <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">
                  Current tools <span className="text-gray-500 font-normal">optional</span>
                </label>
                <Input
                  value={form.current_tools}
                  onChange={handleChange("current_tools")}
                  placeholder="e.g. Excel, Airtable"
                  className="h-11 bg-white/5 border-white/10 rounded-lg focus:border-[#1a6fb5] focus:ring-[#1a6fb5]/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">
                  Timeline <span className="text-gray-500 font-normal">optional</span>
                </label>
                <Input
                  value={form.timeline}
                  onChange={handleChange("timeline")}
                  placeholder="e.g. Q2 2026"
                  className="h-11 bg-white/5 border-white/10 rounded-lg focus:border-[#1a6fb5] focus:ring-[#1a6fb5]/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">
                  Budget range <span className="text-gray-500 font-normal">optional</span>
                </label>
                <Input
                  value={form.budget_range}
                  onChange={handleChange("budget_range")}
                  placeholder="e.g. $5k–$15k"
                  className="h-11 bg-white/5 border-white/10 rounded-lg focus:border-[#1a6fb5] focus:ring-[#1a6fb5]/10 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#1a6fb5] hover:bg-[#155d99] text-white text-[15px] font-semibold h-12 rounded-xl shadow-lg shadow-[#1a6fb5]/15 transition-all"
            >
              {status === "sending" ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {status === "sending" ? "Submitting..." : "Submit Request"}
            </Button>
          </motion.form>

          {/* Email */}
          <div className="flex items-center justify-center gap-2 mt-8 text-gray-400">
            <Mail className="w-4 h-4" />
            <a
              href="mailto:patrick@nailorhub.com"
              className="text-[14px] font-medium hover:text-[#1a6fb5] transition-colors"
            >
              patrick@nailorhub.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}