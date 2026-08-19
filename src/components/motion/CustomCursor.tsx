"use client";

import { useEffect, useRef, useState } from "react";
import { lerp } from "@/lib/utils";

/**
 * Desktop-only pointer.
 *
 * Hover states are declared by the *target* via `data-cursor` /
 * `data-cursor-label`, resolved here with a single delegated listener. Nothing
 * about the cursor passes through React state, so moving the mouse across the
 * page renders exactly zero components.
 */
export function CustomCursor() {
  const [active, setActive] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Decide eligibility only after mount: matchMedia is unavailable on the
  // server, and mounting-then-unmounting would flash a cursor on touch devices.
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");

    const evaluate = () => setActive(fine.matches && wide.matches && !still.matches);
    evaluate();

    fine.addEventListener("change", evaluate);
    still.addEventListener("change", evaluate);
    wide.addEventListener("change", evaluate);
    return () => {
      fine.removeEventListener("change", evaluate);
      still.removeEventListener("change", evaluate);
      wide.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const root = document.documentElement;
    root.classList.add("cursor-custom");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const rendered = { x: pointer.x, y: pointer.y };
    let ringScale = 1;
    let targetScale = 1;
    let visible = false;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!visible) {
        visible = true;
        rendered.x = pointer.x;
        rendered.y = pointer.y;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const setVariant = (variant: string | null, text: string | null) => {
      ring.dataset.variant = variant ?? "default";
      targetScale = variant === "view" ? 3.4 : variant === "link" ? 1.9 : 1;
      label.textContent = text ?? "";
      label.style.opacity = text ? "1" : "0";
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const owner = target?.closest?.<HTMLElement>("[data-cursor]");
      if (owner) {
        setVariant(owner.dataset.cursor ?? "link", owner.dataset.cursorLabel ?? null);
        return;
      }
      // Anything clickable still deserves feedback, even without an opt-in.
      const interactive = target?.closest?.("a, button, input, textarea, [role='button']");
      setVariant(interactive ? "link" : null, null);
    };

    const onDown = () => {
      ring.style.borderColor = "var(--color-accent)";
    };
    const onUp = () => {
      ring.style.borderColor = "";
    };

    const render = () => {
      // The dot tracks tightly, the ring trails — the gap is what reads as weight.
      rendered.x = lerp(rendered.x, pointer.x, 0.19);
      rendered.y = lerp(rendered.y, pointer.y, 0.19);
      ringScale = lerp(ringScale, targetScale, 0.14);

      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rendered.x}px, ${rendered.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      root.classList.remove("cursor-custom");
    };
  }, [active]);

  if (!active) return null;

  return (
    // Above every overlay. At a lower layer the index panel (z-74) painted
    // over the cursor while `cursor: none` still hid the native one, leaving
    // no visible pointer at all inside the menu.
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent opacity-0 mix-blend-difference"
      />
      <div
        ref={ringRef}
        data-variant="default"
        className="fixed left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-ink/40 opacity-0 transition-[background-color,border-color] duration-300 data-[variant=view]:border-accent/0 data-[variant=view]:bg-accent"
      >
        <span
          ref={labelRef}
          className="label select-none text-[0.3rem] text-void opacity-0 transition-opacity duration-200"
        />
      </div>
    </div>
  );
}
