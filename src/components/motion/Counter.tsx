"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { clamp } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

type CounterProps = {
  value: number;
  className?: string;
  duration?: number;
  /** Zero-pad to this many digits, matching the page's index numerals. */
  pad?: number;
  suffix?: string;
};

/** Counts up once, writing text directly to the node — no render per frame. */
export function Counter({
  value,
  className,
  duration = 1.9,
  pad = 0,
  suffix = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    const format = (n: number) =>
      `${String(n).padStart(pad, "0")}${suffix}`;

    if (reducedMotion) {
      node.textContent = format(value);
      return;
    }

    let frame = 0;
    const started = performance.now();

    const step = (now: number) => {
      const t = clamp((now - started) / (duration * 1000), 0, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      node.textContent = format(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, pad, suffix, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {`${String(0).padStart(pad, "0")}${suffix}`}
    </span>
  );
}
