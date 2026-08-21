"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type PointerBusOptions = {
  enabled?: boolean;
  /**
   * Drift on a path of its own when there is no pointer to follow. Used on
   * touch devices, where the effect should still read but parallax must not.
   * While drifting the bus does not publish --mx/--my — only `onFrame` runs.
   */
  autoDrift?: boolean;
  /** Extra per-frame work, given smoothed viewport coordinates. */
  onFrame?: (x: number, y: number) => void;
  /** Lerp factor toward the raw pointer. Lower is heavier. */
  ease?: number;
};

/**
 * Publishes the smoothed pointer position onto an element as --mx/--my,
 * normalised to -1..1 from the viewport centre.
 *
 * Layers read those through calc() with their own --depth, so a composition of
 * any number of parallax layers costs one property write per frame and zero
 * React renders. The loop is gated on intersection, so an off-screen stage
 * costs nothing at all.
 */
export function usePointerBus(
  ref: RefObject<HTMLElement | null>,
  {
    enabled = true,
    autoDrift = false,
    onFrame,
    ease = 0.075,
  }: PointerBusOptions = {},
): void {
  // Held in a ref so a caller passing an inline closure does not resubscribe.
  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;

  useEffect(() => {
    const stage = ref.current;
    if (!stage || !enabled) return;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight * 0.45 };
    const smooth = { ...pointer };
    let frame = 0;
    let running = false;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const render = (now: number) => {
      if (autoDrift) {
        const t = now / 1000;
        pointer.x = window.innerWidth * (0.5 + 0.4 * Math.sin(t * 0.42));
        pointer.y = window.innerHeight * (0.45 + 0.14 * Math.sin(t * 0.29));
      }

      smooth.x += (pointer.x - smooth.x) * ease;
      smooth.y += (pointer.y - smooth.y) * ease;

      if (!autoDrift) {
        stage.style.setProperty(
          "--mx",
          ((smooth.x / window.innerWidth) * 2 - 1).toFixed(4),
        );
        stage.style.setProperty(
          "--my",
          ((smooth.y / window.innerHeight) * 2 - 1).toFixed(4),
        );
      }

      onFrameRef.current?.(smooth.x, smooth.y);
      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(render);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "15% 0px" },
    );
    observer.observe(stage);

    if (!autoDrift) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    return () => {
      observer.disconnect();
      stop();
      window.removeEventListener("pointermove", onMove);
    };
  }, [ref, enabled, autoDrift, ease]);
}
