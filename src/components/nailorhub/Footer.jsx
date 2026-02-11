import React from "react";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "/Privacy", external: true },
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1e1e2f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69768ca36d17d36952af3138/2f66f57b1_NAILORHUB.png"
              alt="NailorHub"
              className="h-[13px] brightness-0 invert opacity-80"
            />
          </div>

          <nav className="flex items-center gap-6">
            {footerLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-medium text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-[13px] font-medium text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {link.label}
                </button>
              )
            )}
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <p className="text-[12px] text-gray-600">
              © {new Date().getFullYear()} NailorHub. All rights reserved.
            </p>
            <span className="hidden md:inline text-gray-700">·</span>
            <a href="mailto:patrick@nailorhub.com" className="text-[12px] text-gray-600 hover:text-gray-400 transition-colors">
              patrick@nailorhub.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}