"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/data/site";
import { scrollToTarget } from "@/lib/scroll";
import { HERO_START_SECONDS } from "@/lib/constants";
import { useLocalTime } from "@/lib/hooks/useLocalTime";
import {
  useIsCoarsePointer,
  usePrefersReducedMotion,
} from "@/lib/hooks/useMediaQuery";
import { MagneticButton } from "@/components/motion/MagneticButton";

const NAME_LINES = ["Pavan", "Seshu", "Kumar"] as const;

/** Staircase indents — the asymmetry is the composition, not decoration. */
const INDENTS = ["md:ml-0", "md:ml-[14vw]", "md:ml-[28vw]"] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const time = useLocalTime(site.location.timeZone);
  const reducedMotion = usePrefersReducedMotion();
  const coarse = useIsCoarsePointer();

  const start = reducedMotion ? 0 : HERO_START_SECONDS;

  // The whole composition lifts and dims as it leaves — the hand-off to Index.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  /**
   * Moves the light inside the letterforms. Coordinates are written as CSS
   * custom properties on each line, measured against that line's own box —
   * a single shared value would smear the highlight across the staircase.
   */
  useEffect(() => {
    if (reducedMotion) return;

    const heading = nameRef.current;
    if (!heading) return;

    const lines = Array.from(
      heading.querySelectorAll<HTMLElement>("[data-lit-line]"),
    );
    if (lines.length === 0) return;

    let rects: DOMRect[] = [];
    let measureQueued = false;

    const measure = () => {
      rects = lines.map((line) => line.getBoundingClientRect());
      measureQueued = false;
    };

    const queueMeasure = () => {
      if (measureQueued) return;
      measureQueued = true;
      requestAnimationFrame(measure);
    };

    const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.45 };
    const smoothed = { ...pointer };
    let frame = 0;
    let elapsed = 0;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const render = (now: number) => {
      // Without a pointer, the light drifts on its own so the effect still reads.
      if (coarse) {
        elapsed = now / 1000;
        const rect = rects[0];
        const width = rect?.width ?? window.innerWidth;
        pointer.x = width * (0.5 + 0.42 * Math.sin(elapsed * 0.45));
        pointer.y =
          window.innerHeight * (0.45 + 0.16 * Math.sin(elapsed * 0.31));
      }

      smoothed.x += (pointer.x - smoothed.x) * 0.1;
      smoothed.y += (pointer.y - smoothed.y) * 0.1;

      for (let index = 0; index < lines.length; index += 1) {
        const rect = rects[index];
        if (!rect) continue;
        lines[index].style.setProperty("--lx", `${smoothed.x - rect.left}px`);
        lines[index].style.setProperty("--ly", `${smoothed.y - rect.top}px`);
      }

      frame = requestAnimationFrame(render);
    };

    // Measure after the entrance has settled — the lines are still moving before that.
    const settle = window.setTimeout(measure, (start + 1.3) * 1000);
    measure();
    frame = requestAnimationFrame(render);

    if (!coarse) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", queueMeasure);
    window.addEventListener("scroll", queueMeasure, { passive: true });

    return () => {
      window.clearTimeout(settle);
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", queueMeasure);
      window.removeEventListener("scroll", queueMeasure);
    };
  }, [reducedMotion, coarse, start]);

  /**
   * The hydration render always reports "no preference" — the server cannot
   * know the visitor's setting — so the hidden `initial` state is applied to
   * every element before the real preference arrives. Dropping the motion
   * props on the corrected render is not enough on its own: without an
   * `animate` target the element simply stays hidden.
   *
   * `motionKey` therefore remounts the animated elements when the preference
   * resolves, so they mount fresh with no initial state at all. It costs one
   * remount, and only for visitors who asked for less motion.
   */
  const motionKey = reducedMotion ? "static" : "animated";

  const fadeUp = (extraDelay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 1,
            delay: start + extraDelay,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  const riseIn = (index: number) =>
    reducedMotion
      ? {}
      : {
          initial: { y: "112%" },
          animate: { y: "0%" },
          transition: {
            duration: 1.25,
            delay: start + index * 0.1,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pb-8 pt-20 md:pb-12 md:pt-32"
    >
      <motion.div
        style={reducedMotion ? undefined : { y, opacity }}
        className="gutter flex flex-1 flex-col justify-between gap-7 md:gap-12"
      >
        {/* Masthead metadata */}
        <motion.div
          key={`meta-${motionKey}`}
          className="flex flex-wrap items-start justify-between gap-x-10 gap-y-4"
          {...(reducedMotion
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.9, delay: start },
              })}
        >
          <p className="label flex items-center gap-2.5 text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {site.availability}
          </p>

          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 md:gap-x-8">
            <p className="label text-muted">{site.location.coordinates}</p>
            <p className="label text-muted">
              <span className="tabular-nums text-ink">{time ?? "--:--:--"}</span>
              <span className="pl-2">IST</span>
            </p>
          </div>
        </motion.div>

        {/* The name */}
        <h1
          ref={nameRef}
          aria-label={site.name}
          className="hero-name font-display font-extrabold uppercase leading-[0.8] tracking-[-0.045em]"
        >
          {NAME_LINES.map((line, index) => (
            <span key={`${line}-${motionKey}`} aria-hidden className="reveal-clip">
              <motion.span
                data-lit-line
                className={`lit-text block ${INDENTS[index]}`}
                {...riseIn(index)}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Statement and actions */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            key={`statement-${motionKey}`}
            className="max-w-[46ch]"
            {...fadeUp(0.45)}
          >
            <p className="label mb-4 text-accent">{site.role}</p>
            <p className="text-lead text-ink/60">{site.tagline}</p>
          </motion.div>

          <motion.div
            key={`actions-${motionKey}`}
            className="flex flex-wrap items-center gap-3"
            {...fadeUp(0.55)}
          >
            <MagneticButton
              onClick={() => scrollToTarget("#work")}
              cursorLabel="Go"
              className="label items-center border border-line px-5 py-4 md:px-6 text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Selected work
              <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
            </MagneticButton>

            <MagneticButton
              href={site.resume}
              external
              className="label items-center bg-ink px-5 py-4 md:px-6 text-void transition-colors duration-300 hover:bg-accent"
            >
              Résumé
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
