"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn, lerp } from "@/lib/utils";
import {
  useIsCoarsePointer,
  usePrefersReducedMotion,
} from "@/lib/hooks/useMediaQuery";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Applied to the inner moving span — needed to stretch full-width rows. */
  contentClassName?: string;
  /** Fraction of the pointer offset the element travels. */
  strength?: number;
  /** Inner content travels further, giving the element a sense of depth. */
  contentStrength?: number;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  cursor?: string;
  cursorLabel?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

/**
 * Pulls toward the pointer while it is nearby and springs back on exit.
 * All movement is written straight to style — never through React state.
 */
export function MagneticButton({
  children,
  className,
  contentClassName,
  strength = 0.34,
  contentStrength = 0.16,
  href,
  onClick,
  ariaLabel,
  cursor = "link",
  cursorLabel,
  external = false,
  type = "button",
  disabled = false,
}: MagneticProps) {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const coarse = useIsCoarsePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = !coarse && !reducedMotion;

  useEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    if (!enabled || !root || !content) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let running = false;

    const render = () => {
      current.x = lerp(current.x, target.x, 0.16);
      current.y = lerp(current.y, target.y, 0.16);

      root.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      content.style.transform = `translate3d(${
        current.x * (contentStrength / strength - 1) * -1
      }px, ${current.y * (contentStrength / strength - 1) * -1}px, 0)`;

      const settled =
        Math.abs(current.x - target.x) < 0.05 &&
        Math.abs(current.y - target.y) < 0.05;

      if (settled && target.x === 0 && target.y === 0) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      target.x = (event.clientX - (rect.left + rect.width / 2)) * strength;
      target.y = (event.clientY - (rect.top + rect.height / 2)) * strength;
      start();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      start();
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.style.transform = "";
      content.style.transform = "";
    };
  }, [enabled, strength, contentStrength]);

  const shared = {
    className: cn("inline-flex will-change-transform", className),
    "data-cursor": cursor,
    "data-cursor-label": cursorLabel,
    "aria-label": ariaLabel,
  };

  const inner = (
    <span
      ref={contentRef}
      className={cn("inline-flex items-center gap-2.5", contentClassName)}
    >
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        ref={rootRef as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
        {...shared}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={rootRef as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...shared}
    >
      {inner}
    </button>
  );
}
