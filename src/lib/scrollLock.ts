import { getLenis } from "./scroll";

/**
 * Page scroll lock, shared by every overlay (preloader, index panel).
 *
 * Reference counted, because overlays can legitimately overlap — the
 * preloader may still be clearing when something else locks. A plain
 * set/unset pair would let the first release re-enable scrolling underneath
 * the second overlay.
 *
 * The lock goes on `documentElement`, not `body`: the root already carries
 * `overflow-x: clip`, so body-level overflow no longer propagates to the
 * viewport and setting it there would not stop the page scrolling.
 *
 * No width compensation is needed here — `scrollbar-gutter: stable` in
 * globals.css keeps the gutter reserved whether or not a scrollbar is
 * showing, so locking causes no layout shift.
 */
let depth = 0;
let previousOverflow = "";

export function lockPageScroll(): void {
  depth += 1;
  if (depth > 1) return;

  const root = document.documentElement;
  previousOverflow = root.style.overflow;
  root.style.overflow = "hidden";

  // Lenis keeps its own animation loop; hiding overflow alone would not stop it.
  getLenis()?.stop();
}

export function unlockPageScroll(): void {
  if (depth === 0) return;

  depth -= 1;
  if (depth > 0) return;

  document.documentElement.style.overflow = previousOverflow;
  getLenis()?.start();
}
