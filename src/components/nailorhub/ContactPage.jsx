import React, { useEffect } from "react";
import CustomCursor from "@/components/nailorhub/CustomCursor";
import Header from "@/components/nailorhub/Header";
import Footer from "@/components/nailorhub/Footer";
import ContactForm from "@/components/nailorhub/ContactForm";
import FloatingCTA from "@/components/nailorhub/FloatingCTA";
import ScrollProgressBar from "@/components/nailorhub/ScrollProgressBar";
import {
  Target,
  Clock,
  ArrowRight,
  Mail,
  MapPin,
  BarChart3,
  Settings,
  Zap,
  Globe,
} from "lucide-react";

const miniCards = [
  {
    icon: Target,
    title: "Scope",
    text: "What you need and what success looks like.",
  },
  {
    icon: Clock,
    title: "Timeline",
    text: "Rough timeframe and any constraints.",
  },
  {
    icon: ArrowRight,
    title: "Next steps",
    text: "Confirm fit, outline a plan, and start.",
  },
];

const projectTypes = ["Dashboards", "Internal Tools", "Automation", "Web"];

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white antialiased" style={{ minHeight: "var(--viewport-height, 100svh)" }}>
      <CustomCursor />
      <ScrollProgressBar />
      <Header />

      <main className="pt-0">
        {/* Hero section — navy gradient, pt for 64px fixed header */}
        <section
          className="relative isolate overflow-hidden bg-[#0a1628] pt-[64px] min-h-[100svh] flex flex-col"
          style={{ minHeight: "var(--viewport-height, 100svh)" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1628]/70 via-[#0a1628]/80 to-[#0a1628]" />
          <div className="pointer-events-none hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-[#1a6fb5]/[0.04] rounded-full blur-3xl" />
          <div className="pointer-events-none hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1a6fb5]/[0.04] rounded-full blur-3xl" />

          <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 max-w-7xl mx-auto w-full px-6 lg:px-8 py-16 md:py-20">
            {/* Left — micro label, H1, copy */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-[12px] font-semibold text-[#1a6fb5] uppercase tracking-widest mb-4">
                Contact
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.2]">
                Let's talk about your project
              </h1>
              <p className="text-[15px] text-gray-300 leading-relaxed max-w-lg">
                We're focused on internal projects right now. We review a limited number of outside
                requests and only take on work that aligns with our scope. Share what you're building
                and we'll let you know if it's a fit.
              </p>
            </div>

            {/* Right — small card */}
            <div className="flex-shrink-0 w-full max-w-sm">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-lg">
                <p className="text-[13px] font-semibold text-[#1a6fb5] uppercase tracking-widest mb-3">
                  Typical response time
                </p>
                <p className="text-white text-[15px] font-medium mb-4">Within 1 business day</p>
                <ul className="space-y-2 text-[14px] text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a6fb5]" />
                    Quick next steps
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a6fb5]" />
                    Limited intake—only projects that fit our focus
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a6fb5]" />
                    Internal projects first
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* White content section — 2 columns */}
        <section id="contact" className="py-16 md:py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
              {/* Left — ContactForm in rounded card */}
              <div className="rounded-2xl overflow-hidden bg-[#0f1923] border border-gray-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="relative p-6 sm:p-8">
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <ContactForm embedded />
                </div>
              </div>

              {/* Right — mini cards + direct contact */}
              <div className="space-y-6">
                {miniCards.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#1a6fb5]/10 border border-[#1a6fb5]/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-[#1a6fb5]" />
                      </div>
                      <div>
                        <h3 className="text-[13px] font-semibold text-[#1a6fb5] uppercase tracking-wider mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[15px] text-gray-600 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Direct contact block */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-6">
                  <p className="text-[13px] font-semibold text-[#1a6fb5] uppercase tracking-widest mb-4">
                    Direct contact
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:patrick@nailorhub.com"
                      className="flex items-center gap-3 text-[15px] text-gray-700 hover:text-[#1a6fb5] transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gray-500" />
                      patrick@nailorhub.com
                    </a>
                    <p className="flex items-center gap-3 text-[15px] text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      Toronto / Remote
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Project types
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-gray-200 text-[13px] text-gray-600"
                        >
                          {t === "Dashboards" && <BarChart3 className="w-3.5 h-3.5" />}
                          {t === "Internal Tools" && <Settings className="w-3.5 h-3.5" />}
                          {t === "Automation" && <Zap className="w-3.5 h-3.5" />}
                          {t === "Web" && <Globe className="w-3.5 h-3.5" />}
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <FloatingCTA />
      </main>
    </div>
  );
}
