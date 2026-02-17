import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollProgressBar from "@/components/nailorhub/ScrollProgressBar";
import Header from "@/components/nailorhub/Header";
import Hero from "@/components/nailorhub/Hero";
import Services from "@/components/nailorhub/Services";
import Approach from "@/components/nailorhub/Approach";
import ToolsSection from "@/components/nailorhub/ToolsSection";
import CurrentFocus from "@/components/nailorhub/CurrentFocus";
import AboutSection from "@/components/nailorhub/AboutSection";
import ContactForm from "@/components/nailorhub/ContactForm";
import FAQ from "@/components/nailorhub/FAQ";
import Footer from "@/components/nailorhub/Footer";
import FloatingCTA from "@/components/nailorhub/FloatingCTA";
import CustomCursor from "@/components/nailorhub/CustomCursor";


export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="bg-white antialiased" style={{ minHeight: "var(--viewport-height, 100svh)" }}>
      <CustomCursor />
      <ScrollProgressBar />
      <Header />

      <main className="pt-[0px]">
        <Hero />
        <Services />
        <Approach />
        <ToolsSection />
        <CurrentFocus />
        <AboutSection />
        <ContactForm simple />
        <FAQ />
        <Footer />
        <FloatingCTA />
      </main>
    </div>
  );
}
