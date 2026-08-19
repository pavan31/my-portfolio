"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Hairline read-out of document progress, pinned above everything. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[78] h-px origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
