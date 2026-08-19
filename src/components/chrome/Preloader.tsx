"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/data/site";
import { lockPageScroll, unlockPageScroll } from "@/lib/scrollLock";
import { clamp } from "@/lib/utils";
import {
  PRELOADER_COUNT_SECONDS,
  PRELOADER_EXIT_SECONDS,
} from "@/lib/constants";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";
import { useIsomorphicLayoutEffect } from "@/lib/hooks/useIsomorphicLayoutEffect";

/**
 * The entry sequence: a count to 100 against a drawn rule, then the whole
 * veil is wiped upward to hand over to the hero.
 *
 * Deliberately short — it exists to cover the font swap and give the hero a
 * beat to arrive into, not to make anyone wait.
 */
export function Preloader() {
  const reducedMotion = usePrefersReducedMotion();
  const [done, setDone] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  // Runs before paint, so a reduced-motion visitor never sees the veil at all.
  useIsomorphicLayoutEffect(() => {
    if (reducedMotion) setDone(true);
  }, [reducedMotion]);

  // Hold the page still while the veil is up.
  useEffect(() => {
    if (done) return;
    lockPageScroll();
    return unlockPageScroll;
  }, [done]);

  useEffect(() => {
    if (reducedMotion || done) return;

    let frame = 0;
    const started = performance.now();

    const step = (now: number) => {
      const t = clamp((now - started) / (PRELOADER_COUNT_SECONDS * 1000), 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (countRef.current) {
        countRef.current.textContent = String(Math.round(eased * 100)).padStart(
          3,
          "0",
        );
      }
      if (t < 1) frame = requestAnimationFrame(step);
      else setDone(true);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, done]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="preloader"
          className="gutter fixed inset-0 z-[80] flex flex-col justify-between bg-void py-6 md:py-10"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{
            duration: PRELOADER_EXIT_SECONDS,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div className="flex items-start justify-between">
            <span className="label text-muted">{site.monogram}</span>
            <span className="label text-muted">
              {site.location.city}, {site.location.country}
            </span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <motion.p
              className="label max-w-[22ch] text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {site.discipline}
            </motion.p>

            <span
              ref={countRef}
              aria-hidden
              className="font-display text-[clamp(4rem,16vw,12rem)] font-extrabold leading-[0.78] tracking-tighter text-ink tabular-nums"
            >
              000
            </span>
          </div>

          <motion.div
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: PRELOADER_COUNT_SECONDS,
              ease: [0.33, 1, 0.68, 1],
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
