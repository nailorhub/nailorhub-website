import React from "react";
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

export default function Home() {
  return (
    <div className="bg-white antialiased" style={{ minHeight: "var(--viewport-height, 100svh)" }}>
      <Header />
      <Hero />
      <Services />
      <Approach />
      <ToolsSection />
      <CurrentFocus />
      <AboutSection />
      <ContactForm />
      <FAQ />
      <Footer />
      <FloatingCTA />
    </div>
  );
}