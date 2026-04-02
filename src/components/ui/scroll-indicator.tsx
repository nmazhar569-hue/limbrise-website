"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-2"
    >
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#14b8a6]">Scroll Down</span>
      <ArrowDown className="size-6 text-white/50 animate-bounce" />
    </motion.div>
  );
}
