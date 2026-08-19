"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerLenis } from "@/lib/scroll";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

/**
 * Owns the page's scroll loop. Lenis is driven by gsap.ticker rather than its
 * own rAF so smoothing and every ScrollTrigger resolve on the same frame —
 * two independent loops produce visible tearing on pinned sections.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  // Web fonts change every measurement on the page; triggers set before the
  // swap would pin and scrub against stale offsets.
  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      registerLenis(null);
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices already have momentum scrolling; overriding it feels wrong.
      syncTouch: false,
      touchMultiplier: 1.6,
      autoRaf: false,
    });

    registerLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      registerLenis(null);
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
