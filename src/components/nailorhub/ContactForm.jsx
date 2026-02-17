import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export default function ContactForm({ embedded = false, simple = false }) {
  const [form, setForm] = useState({
    name: "", email: "", company: "", need: "",
    current_tools: "", timeline: "", budget_range: ""
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      setErrorMessage("Form is not configured. Please add VITE_WEB3FORMS_ACCESS_KEY to your .env file.");
      return;
    }

    const subject = simple
      ? "Contact from nailorhub.com"
      : "Project Request from nailorhub.com";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          name: form.name,
          email: form.email,
          company: form.company || undefined,
          message: form.need,
          current_tools: form.current_tools || undefined,
          timeline: form.timeline || undefined,
          budget_range: form.budget_range || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", company: "", need: "", current_tools: "", timeline: "", budget_range: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Failed to send. Please try again or email patrick@nailorhub.com directly.");
    }
  };

  const successContent = simple ? (
    <motion.div
      initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12"
    >
      <CheckCircle2 className="w-12 h-12 text-[#1a6fb5] mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-white mb-2">Message Sent</h3>
      <p className="text-gray-400 text-[15px]">I'll get back to you soon.</p>
    </motion.div>
  ) : (
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
  );

  const errorContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-500/30 p-12"
    >
      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-white mb-2">Something went wrong</h3>
      <p className="text-gray-400 text-[15px] mb-6">{errorMessage}</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => { setStatus("idle"); setErrorMessage(""); }}
          className="border-white/20 text-white hover:bg-white/10"
        >
          Try again
        </Button>
        <a
          href="mailto:patrick@nailorhub.com"
          className="inline-flex items-center gap-2 text-[#1a6fb5] font-medium hover:underline"
        >
          <Mail className="w-4 h-4" />
          Email patrick@nailorhub.com directly
        </a>
      </div>
    </motion.div>
  );

  if (status === "sent") {
    if (embedded) {
      return <div className="text-center">{successContent}</div>;
    }
    return (
      <section id="contact" className="py-24 md:py-32 bg-[#0f1923] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="relative max-w-2xl mx-auto px-6 text-center">{successContent}</div>
      </section>
    );
  }

  if (status === "error") {
    if (embedded) {
      return <div className="text-center">{errorContent}</div>;
    }
    return (
      <section id="contact" className="py-24 md:py-32 bg-[#0f1923] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="relative max-w-2xl mx-auto px-6 text-center">{errorContent}</div>
      </section>
    );
  }

  const formEl = (
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

      {!simple && (
        <div className="mb-5">
          <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">Company</label>
          <Input
            value={form.company}
            onChange={handleChange("company")}
            placeholder="Company or organization"
            className="h-11 bg-white/5 border-white/10 rounded-lg focus:border-[#1a6fb5] focus:ring-[#1a6fb5]/10 text-white placeholder:text-gray-500"
          />
        </div>
      )}

      <div className="mb-5">
        <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">
          {simple ? "Message" : "What you need"} <span className="text-red-400">*</span>
        </label>
        <Textarea
          required
          value={form.need}
          onChange={handleChange("need")}
          placeholder={simple ? "What's on your mind?" : "Describe what you're trying to improve or build..."}
          className="min-h-[120px] bg-white/5 border-white/10 rounded-lg focus:border-[#1a6fb5] focus:ring-[#1a6fb5]/10 resize-none text-white placeholder:text-gray-500"
        />
      </div>

      {!simple && (
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
      )}

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
        {status === "sending" ? "Sending..." : simple ? "Send Message" : "Submit Request"}
      </Button>
    </motion.form>
  );

  if (embedded) {
    return <div>{formEl}</div>;
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0f1923] relative overflow-hidden">
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
              {simple ? "Contact Me" : "Request a Project"}
            </h2>
            <p className="text-[15px] text-gray-400 leading-relaxed">
              {simple
                ? "Reach out about anything—questions, ideas, or just to say hi."
                : "Share what you're trying to improve. If it aligns with our current focus, we'll follow up."}
            </p>
          </motion.div>
          {formEl}
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