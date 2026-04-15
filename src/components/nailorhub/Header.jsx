import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/", isHome: true },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Tools", href: "#tools" },
  { label: "Current Focus", href: "#focus" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/" || location.pathname === "/Home";
  const isContactPage = location.pathname === "/contact";

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => {
    setMobileOpen(false);
    if (isHome) scrollTo("#contact");
    else navigate("/#contact");
  };

  const handleRequestProjectClick = () => {
    setMobileOpen(false);
    if (isContactPage) return;
    navigate("/contact");
  };

  const handleNavClick = (link) => {
    const href = typeof link === "string" ? link : link.href;
    if (link.isHome) {
      setMobileOpen(false);
      if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
      else navigate("/");
      return;
    }
    if (href === "#contact") {
      handleContactClick();
      return;
    }
    setMobileOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${href.slice(1)}`);
    }
  };

  useEffect(() => {
    const getTop = () =>
      document.scrollingElement ? document.scrollingElement.scrollTop : 0;

    const onScroll = () => {
      const top = getTop();

      setScrolled((prev) => {
        // Hysteresis band to prevent flicker near threshold
        if (prev) return top > 8;
        return top > 24;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
    className={[
      "site-header fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
      scrolled
        ? "bg-white md:bg-white/90 md:backdrop-blur-xl border-b border-gray-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
        : "bg-transparent border-b border-transparent shadow-none",
    ].join(" ")}
  >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[64px]">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
              else navigate("/");
            }}
            className="flex items-center gap-1"
            aria-label="Back to top"
          >
            <img
              src="/nailorhub-logo.png"
              alt="NailorHub"
              className="h-[17px] w-auto object-contain"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                className={[
                  "text-[13px] font-medium tracking-wide uppercase transition-colors",
                  scrolled
                    ? "text-gray-500 hover:text-[#1a6fb5]"
                    : "text-white/85 hover:text-[#1a6fb5]",
                ].join(" ")}
              >
                {link.label}
              </button>
            ))}

            <Button
              onClick={handleRequestProjectClick}
              className="bg-[#1a6fb5] hover:bg-[#155d99] text-white text-[13px] font-semibold tracking-wide px-5 h-9 rounded-lg shadow-sm"
            >
              Request a Project
            </Button>
          </nav>

          <button
            className={[
              "md:hidden p-2 transition-colors",
              scrolled ? "text-gray-600" : "text-white",
            ].join(" ")}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                className="block w-full text-left py-3 text-sm font-medium text-gray-600 hover:text-[#1a6fb5] border-b border-gray-50 last:border-0"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3">
              <Button
                onClick={handleRequestProjectClick}
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
