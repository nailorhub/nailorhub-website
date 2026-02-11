import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Current Focus", href: "#focus" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white md:bg-white/90 md:backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-b border-gray-100/80"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[64px]">
          {/* Logo */}
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-1">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69768ca36d17d36952af3138/2f66f57b1_NAILORHUB.png"
              alt="NailorHub"
              className="h-[17px] md:h-[17px] w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={[
                  "text-[13px] font-medium tracking-wide uppercase transition-colors",
                  scrolled
                    ? "text-gray-500 hover:text-[#1a6fb5]"   // when header is white
                    : "text-white/85 hover:text-white"       // when over blue hero
                ].join(" ")}
                
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("#contact")}
              className="bg-[#1a6fb5] hover:bg-[#155d99] text-white text-[13px] font-semibold tracking-wide px-5 h-9 rounded-lg shadow-sm"
            >
              Request a Project
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 transition-colors ${scrolled ? "text-gray-600" : "text-white"}`}

            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left py-3 text-sm font-medium text-gray-600 hover:text-[#1a6fb5] border-b border-gray-50 last:border-0"

              >
                {link.label}
              </button>
            ))}
            <div className="pt-3">
              <Button
                onClick={() => scrollTo("#contact")}
                className="w-full bg-[#1a6fb5] hover:bg-[#155d99] text-white text-sm font-semibold h-10 rounded-lg"
              >
                Request a Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}