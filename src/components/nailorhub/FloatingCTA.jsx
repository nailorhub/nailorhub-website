import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Desktop: bottom-right button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="hidden md:block fixed bottom-8 right-8 z-40"
          >
            <Button
              onClick={scrollToContact}
              className="bg-[#1a6fb5] hover:bg-[#155d99] text-white text-[14px] font-semibold px-6 h-11 rounded-xl shadow-xl shadow-[#1a6fb5]/20"
            >
              Request a Project
              <ArrowUp className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

         {/* Mobile: floating bottom button (no bar) */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 w-full"
>
  <Button
    onClick={scrollToContact}
    className="w-full max-w-[520px] mx-auto bg-[#1a6fb5] hover:bg-[#155d99] text-white text-[15px] font-semibold h-12 rounded-xl shadow-xl shadow-[#1a6fb5]/25"
  >
    Request a Project
  </Button>
</motion.div>
        </>
      )}
    </AnimatePresence>
  );
}