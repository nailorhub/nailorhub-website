import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canUseCustomCursor =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    setEnabled(!!canUseCustomCursor);
    if (!canUseCustomCursor) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const interactive = e.target.closest(
        "button, a, input, textarea, select, [role='button']"
      );
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#1a6fb5] rounded-full pointer-events-none z-[99999]"
        style={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        animate={{
          scale: isHovering ? 0.6 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Follower ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#1a6fb5]/40 rounded-full pointer-events-none z-[99999]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering
            ? "rgba(26, 111, 181, 0.6)"
            : "rgba(26, 111, 181, 0.4)",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
    </>
  );
}
