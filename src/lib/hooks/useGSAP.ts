"use client";

import type { RefObject } from "react";
import { gsap } from "gsap";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

type UseGSAPOptions = {
  /** Scopes every selector in the callback, and reverts on unmount. */
  scope?: RefObject<HTMLElement | null>;
  dependencies?: unknown[];
};

/**
 * Minimal stand-in for @gsap/react: runs the callback inside a gsap.context
 * so all tweens and ScrollTriggers created within it are torn down together.
 * Layout-effect timing keeps ScrollTrigger's first measurement pre-paint.
 */
export function useGSAP(
  callback: () => void,
  { scope, dependencies = [] }: UseGSAPOptions = {},
): void {
  useIsomorphicLayoutEffect(() => {
    const context = gsap.context(callback, scope?.current ?? undefined);
    return () => context.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
