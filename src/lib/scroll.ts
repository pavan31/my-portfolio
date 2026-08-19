import type Lenis from "lenis";

/**
 * Module-level handle on the single Lenis instance. Anchors and the nav need
 * to drive the scroller from outside the React tree; passing it through
 * context would re-render every consumer on mount for no benefit.
 */
let instance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null): void {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Clearance for the fixed masthead. Lenis positions the target at the very top
 * of the viewport and ignores CSS scroll-margin, so section headings would
 * otherwise land underneath the header.
 */
const HEADER_CLEARANCE = 88;

export function scrollToTarget(
  target: string | HTMLElement | number,
  options?: { offset?: number; immediate?: boolean },
): void {
  const lenis = instance;
  const offset =
    options?.offset ?? (typeof target === "number" ? 0 : -HEADER_CLEARANCE);

  if (lenis) {
    lenis.scrollTo(target, {
      offset,
      immediate: options?.immediate ?? false,
      duration: 1.3,
    });
    return;
  }

  // Reduced motion, or before Lenis mounts — fall back to the platform.
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "auto" });
    return;
  }

  const element =
    typeof target === "string" ? document.querySelector(target) : target;
  element?.scrollIntoView({ behavior: "auto", block: "start" });
}
