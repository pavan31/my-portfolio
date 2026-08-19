"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Distance travelled, in px. Direction is set by `from`. */
  distance?: number;
  from?: "bottom" | "top" | "left" | "right";
  /** Wrap in an overflow-hidden box so the child crosses a hard edge. */
  masked?: boolean;
  once?: boolean;
};

/**
 * The page's default entrance: a short, damped move with no fade-from-scale.
 * Everything else composes from this so timings stay consistent.
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  distance = 28,
  from = "bottom",
  masked = false,
  once = true,
}: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motion[as as keyof typeof motion] as typeof motion.div;

  const horizontal = from === "left" || from === "right";
  const sign = from === "bottom" || from === "right" ? 1 : -1;
  const offsetX = horizontal ? distance * sign : 0;
  const offsetY = horizontal ? 0 : distance * sign;

  const variants: Variants = {
    hidden: reducedMotion
      ? { opacity: 1, x: 0, y: 0 }
      : { opacity: 0, x: offsetX, y: offsetY },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: reducedMotion
        ? { duration: 0 }
        : { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const content = (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </Component>
  );

  return masked ? <span className="reveal-clip">{content}</span> : content;
}
