"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  /** Percent of the track travelled per second at rest. */
  baseVelocity?: number;
  direction?: 1 | -1;
};

function wrap(min: number, max: number, value: number): number {
  const span = max - min;
  return ((((value - min) % span) + span) % span) + min;
}

/**
 * A continuous ticker whose speed — and direction — are coupled to scroll
 * velocity, so the strip reacts to how hard the page is being thrown.
 * The track is duplicated once and wrapped at -50%, giving a seamless loop.
 */
export function Marquee({
  items,
  className,
  itemClassName,
  baseVelocity = 2.4,
  direction = -1,
}: MarqueeProps) {
  const reducedMotion = usePrefersReducedMotion();
  const baseX = useMotionValue(0);
  const directionRef = useRef<number>(direction);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 380,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reducedMotion) return;

    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();

    // Scrolling up flips the ticker — the strip reads as reacting, not looping.
    if (factor < 0) directionRef.current = -direction;
    else if (factor > 0) directionRef.current = direction;

    moveBy += moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  const track = (
    <>
      {items.map((item, index) => (
        <span key={index} className={cn("flex items-center", itemClassName)}>
          {item}
          <span aria-hidden className="px-[0.6em] text-accent">
            /
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      aria-hidden
    >
      <motion.div className="flex w-max flex-nowrap" style={{ x }}>
        <div className="flex flex-nowrap">{track}</div>
        <div className="flex flex-nowrap">{track}</div>
      </motion.div>
    </div>
  );
}
