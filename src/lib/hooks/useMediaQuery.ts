"use client";

import { useCallback, useSyncExternalStore } from "react";

/** One MediaQueryList per query, shared by every subscriber. */
const registry = new Map<string, MediaQueryList>();

function getList(query: string): MediaQueryList {
  let list = registry.get(query);
  if (!list) {
    list = window.matchMedia(query);
    registry.set(query, list);
  }
  return list;
}

/**
 * Resolves on the hydration render rather than in an effect. That matters for
 * `prefers-reduced-motion`: an effect-based read lets one frame of animation
 * escape before it is honoured.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = getList(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => getList(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Touch-primary devices, where a custom cursor and magnetics are meaningless. */
export function useIsCoarsePointer(): boolean {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
