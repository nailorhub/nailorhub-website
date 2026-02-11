import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function PageNotFound() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0b121a] text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold text-[#1a6fb5] uppercase tracking-widest mb-3">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Page not found</h1>
        <p className="text-gray-400 text-[15px] leading-relaxed mb-8">
          No route matches <span className="text-gray-200">{location.pathname}</span>.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-[#1a6fb5] hover:bg-[#155d99] font-semibold transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
