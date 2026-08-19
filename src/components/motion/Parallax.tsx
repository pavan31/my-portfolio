"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Positive drifts against the scroll; negative runs with it. */
  speed?: number;
  axis?: "x" | "y";
};

/**
 * Scroll-linked drift measured as a share of the element's own height, so a
 * given `speed` produces the same feel regardless of viewport size.
 */
export function Parallax({
  children,
  className,
  speed = 0.14,
  axis = "y",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 100}%`, `${speed * -100}%`],
  );

  // Smoothing the progress keeps wheel-step scrolling from stuttering.
  const value = useSpring(raw, { stiffness: 220, damping: 40, mass: 0.4 });

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={axis === "y" ? { y: value } : { x: value }}
    >
      {children}
    </motion.div>
  );
}
