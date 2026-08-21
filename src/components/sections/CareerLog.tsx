"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { career, careerLog, type CareerChapter } from "@/lib/data/experience";
import { useGSAP } from "@/lib/hooks/useGSAP";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

gsap.registerPlugin(ScrollTrigger);

/*
 * Motion is layered rather than piled onto the same elements, which is what
 * keeps it from fighting itself:
 *
 *   1. ENTRANCE — a one-shot timeline per chapter. Every piece starts from
 *      its own direction and converges; the directions are declared in SCORE
 *      below rather than buried in the tweens.
 *   1b. EXIT — the same pieces drift a fraction of the way back along the
 *      vector they arrived on, so each one reads as having a direction of
 *      its own rather than just fading.
 *   2. EMPHASIS — a scrubbed pass on the chapter box, so whatever is nearest
 *      the middle of the window is the brightest thing on screen.
 *   3. PARALLAX — a scrubbed drift on two children, in opposite directions.
 *
 * Layers 1/1b own the pieces; layer 2 owns the chapter box; layer 3 owns
 * yPercent where the others own x/y. Nothing shares a property with anything
 * that could be running at the same time, so the transforms compose instead
 * of overwriting one another. None of it is driven by React state, and
 * everything animates transform or opacity.
 */

const EASE_OUT = "power3.out";

/** Where a piece starts, in px at full strength, and when it sets off. */
type Cue = {
  slot: string;
  from: { x?: number; y?: number; scale?: number };
  at: number;
};

/**
 * The entrance score, one line per moving piece.
 *
 * Each chapter has its own directions on purpose: the education year arrives
 * from the left, the eight years arrive from the right against a company name
 * coming from the left, and the present drops in from above. Reading the
 * table should tell you what the section looks like in motion.
 *
 * Distances are desktop values. Narrower screens scale them down rather than
 * dropping the direction, so the choreography survives on a phone at a
 * fraction of the travel.
 */
const SCORE: Record<string, readonly Cue[]> = {
  iiitdm: [
    { slot: "head", from: { x: -40 }, at: 0 },
    { slot: "plate", from: { x: -80 }, at: 0.06 },
    { slot: "period", from: { x: -60 }, at: 0.16 },
    { slot: "org", from: { x: 40, y: 50 }, at: 0.24 },
    { slot: "title", from: { y: 35 }, at: 0.36 },
  ],
  aspire: [
    { slot: "head", from: { y: -28 }, at: 0 },
    { slot: "plate", from: { x: 100 }, at: 0.06 },
    { slot: "period", from: { x: 80 }, at: 0.16 },
    { slot: "org", from: { x: -100 }, at: 0.22 },
    { slot: "title", from: { y: 50 }, at: 0.36 },
    /* The number is revealed rather than moved. */
    { slot: "figure", from: { scale: 0.88 }, at: 0.46 },
    /* Deliberately not the mirror of anything above it. */
    { slot: "support", from: { x: -46, y: 28 }, at: 0.58 },
  ],
  carelon: [
    { slot: "head", from: { y: -36 }, at: 0 },
    { slot: "plate", from: { y: -60 }, at: 0.06 },
    { slot: "period", from: { y: -40 }, at: 0.18 },
    { slot: "org", from: { x: -60, y: 40 }, at: 0.26 },
    { slot: "title", from: { x: 60, y: 40 }, at: 0.38 },
    { slot: "since", from: { y: 30 }, at: 0.5 },
    { slot: "current", from: { x: 30 }, at: 0.56 },
  ],
};

/** How much of the desktop travel each layout actually uses. */
const TRAVEL = { desktop: 1, tablet: 0.6, phone: 0.3 };

/** How far a piece drifts back the way it came as its chapter leaves. */
const DRIFT_BACK = 0.22;

export function CareerLog() {
  const sectionRef = useRef<HTMLElement>(null);
  const mastheadRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const outroRef = useRef<HTMLDivElement>(null);

  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const chapters = chapterRefs.current.filter(
        (node): node is HTMLElement => node !== null,
      );
      if (chapters.length === 0) return;

      const media = gsap.matchMedia();

      /* ---------------------------------------------------------------- *
       * Reduced motion: the section still assembles, but only by fading.
       * No scrub, no parallax, no scale — and every chapter stays at full
       * contrast, because dimming what is not centred is a focus effect
       * that a reader who cannot scroll smoothly would be stuck inside.
       * ---------------------------------------------------------------- */
      media.add("(prefers-reduced-motion: reduce)", () => {
        const groups = gsap.utils.toArray<HTMLElement>("[data-group]");
        gsap.set(groups, { opacity: 0 });
        groups.forEach((group) => {
          gsap.to(group, {
            opacity: 1,
            duration: 0.3,
            scrollTrigger: {
              trigger: group,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          });
        });
      });

      media.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          tablet:
            "(min-width: 768px) and (max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
          phone: "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { desktop, tablet } = context.conditions as {
            desktop: boolean;
            tablet: boolean;
            phone: boolean;
          };

          /* Parallax is depth, and depth is a wide-screen luxury. */
          const drift = desktop ? 1 : tablet ? 0.7 : 0;
          const emphasis = desktop || tablet;

          /*
           * Entrance travel. The direction each piece comes from is the point
           * of the section, so it survives every breakpoint — only the
           * distance shrinks.
           */
          const travel = desktop
            ? TRAVEL.desktop
            : tablet
              ? TRAVEL.tablet
              : TRAVEL.phone;

          /* ---------- The masthead boots in, then moves away ---------- */
          const masthead = mastheadRef.current;
          if (masthead) {
            const rule = masthead.querySelector("[data-masthead-rule]");
            const meta = masthead.querySelectorAll("[data-masthead-meta]");

            gsap.set(rule, { scaleX: 0 });
            gsap.set(meta, { opacity: 0, y: 14 });

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: masthead,
                  start: "top 86%",
                  toggleActions: "play none none none",
                },
              })
              .to(rule, { scaleX: 1, duration: 1.1, ease: "power3.inOut" })
              .to(meta, { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 }, 0.2);

            // And leaves: the heading drifts up and out as the chapters take
            // over, so the section hands off rather than simply ending.
            if (drift > 0) {
              gsap.to(masthead, {
                yPercent: -6 * drift,
                opacity: 0.25,
                ease: "none",
                scrollTrigger: {
                  trigger: masthead,
                  start: "bottom 70%",
                  end: "bottom top",
                  scrub: 0.6,
                },
              });
            }
          }

          /* ---------- Chapters ---------- */
          chapters.forEach((chapter) => {
            const late = chapter.querySelectorAll<HTMLElement>("[data-late]");
            const plate = chapter.querySelector<HTMLElement>("[data-plate]");
            const marker = chapter.querySelector<HTMLElement>("[data-marker]");
            const support = chapter.querySelector<HTMLElement>("[data-support]");
            const practice =
              chapter.querySelectorAll<HTMLElement>("[data-practice]");

            // ---- 1. Entrance: each piece from its own direction ----
            const cues = SCORE[chapter.dataset.chapter ?? ""] ?? [];
            const piece = (slot: string) =>
              chapter.querySelector<HTMLElement>(`[data-enter="${slot}"]`);

            const entrance = gsap.timeline({
              defaults: { ease: EASE_OUT },
              scrollTrigger: {
                trigger: chapter,
                start: "top 78%",
                toggleActions: "play none none none",
              },
            });

            // Held so the exit can send each piece back the way it came.
            const departures: Array<{ el: HTMLElement; cue: Cue }> = [];

            cues.forEach((cue) => {
              const el = piece(cue.slot);
              if (!el) return;

              const scaled = cue.from.scale !== undefined;
              gsap.set(el, {
                opacity: 0,
                x: (cue.from.x ?? 0) * travel,
                y: (cue.from.y ?? 0) * travel,
                ...(scaled ? { scale: cue.from.scale } : {}),
              });

              entrance.to(
                el,
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  ...(scaled ? { scale: 1 } : {}),
                  duration: scaled ? 0.9 : 1,
                  ease: scaled ? "power2.out" : EASE_OUT,
                },
                cue.at,
              );

              if (cue.from.x || cue.from.y) departures.push({ el, cue });
            });

            // The accent mark draws itself once, and then it is simply there.
            if (marker) {
              gsap.set(marker, { scaleX: 0, transformOrigin: "left center" });
              entrance.to(marker, { scaleX: 1, duration: 0.5 }, 0.62);
            }

            // The technology strip sits far below the chapter's top, so it
            // gets its own trigger and its own small horizontal stagger.
            if (late.length > 0) {
              const items = late[0].children;
              gsap.set(items, { opacity: 0, x: 22 * travel });
              gsap.to(items, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: EASE_OUT,
                stagger: 0.06,
                scrollTrigger: {
                  trigger: late[0],
                  start: "top 90%",
                  toggleActions: "play none none none",
                },
              });
            }

            // ---- 1b. Exit: a little way back along the entry vector ----
            if (emphasis && departures.length > 0) {
              const leaving = gsap.timeline({
                defaults: { ease: "none", duration: 1 },
                scrollTrigger: {
                  trigger: chapter,
                  start: "bottom 58%",
                  end: "bottom top",
                  scrub: 0.7,
                },
              });
              departures.forEach(({ el, cue }) => {
                leaving.to(
                  el,
                  {
                    x: (cue.from.x ?? 0) * travel * DRIFT_BACK,
                    y: (cue.from.y ?? 0) * travel * DRIFT_BACK,
                  },
                  0,
                );
              });
            }

            // ---- 2. Emphasis: brightest at the middle of the window ----
            if (emphasis) {
              gsap
                .timeline({
                  defaults: { ease: "none", duration: 1 },
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top 92%",
                    end: "bottom 8%",
                    scrub: 0.7,
                  },
                })
                .fromTo(
                  chapter,
                  { opacity: 0.55, scale: 0.985 },
                  { opacity: 1, scale: 1 },
                )
                // Leaving: recede and lift, so the next chapter takes over
                // rather than the page simply scrolling past this one.
                .to(chapter, { opacity: 0.5, scale: 0.985, y: -16 });
            }

            // ---- 3. Parallax: two children, opposite directions ----
            if (drift > 0 && plate) {
              // The numeral lags the page a little.
              gsap.fromTo(
                plate,
                { yPercent: -5 * drift },
                {
                  yPercent: 5 * drift,
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.9,
                  },
                },
              );
            }

            if (drift > 0 && support) {
              // The supporting text runs a shade ahead of it.
              gsap.fromTo(
                support,
                { yPercent: 3 * drift },
                {
                  yPercent: -3 * drift,
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.9,
                  },
                },
              );
            }

            // ---- The eight years open up line by line, as they are read ----
            if (practice.length > 0) {
              gsap.fromTo(
                practice,
                { opacity: 0.14, y: 12 },
                {
                  opacity: 1,
                  y: 0,
                  ease: "none",
                  stagger: 0.35,
                  scrollTrigger: {
                    trigger: practice[0].parentElement,
                    start: "top 84%",
                    end: "bottom 64%",
                    scrub: 0.6,
                  },
                },
              );
            }
          });

          /* ---------- The hand-off ---------- */
          if (outroRef.current) {
            gsap
              .timeline({
                defaults: { duration: 1, ease: "none" },
                scrollTrigger: {
                  trigger: outroRef.current,
                  start: "top 78%",
                  end: "top 34%",
                  scrub: 0.5,
                },
              })
              .fromTo("[data-morph-from]", { opacity: 1 }, { opacity: 0.3 }, 0)
              .fromTo("[data-morph-to]", { opacity: 0.25 }, { opacity: 1 }, 0)
              .fromTo(
                "[data-morph-arrow]",
                { x: -14, opacity: 0.2 },
                { x: 0, opacity: 1 },
                0,
              );
          }
        },
      );

      return () => media.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative scroll-mt-24 border-t border-line bg-surface"
    >
      {/* ---------- Masthead and thesis ---------- */}
      <div className="gutter flex min-h-[80svh] flex-col justify-center py-24 md:py-32">
        {/*
          The section masthead, composed here rather than through the shared
          heading so its parts can be staggered: the rule draws, then the
          index line, then the title. Same markup and classes as everywhere
          else on the page — only the timing is local.
        */}
        <div ref={mastheadRef} className="w-full">
          <div
            data-masthead-rule
            className="h-px w-full origin-left bg-line"
          />

          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pt-4">
            <p data-masthead-meta className="label text-muted">
              <span className="text-accent">03</span>
              <span className="px-2 text-line">/</span>
              Experience
            </p>
            <p
              data-masthead-meta
              className="label max-w-[34ch] text-muted normal-case tracking-normal"
            >
              {careerLog.note}
            </p>
          </div>

          <div data-masthead-meta>
            <TextReveal
              as="h2"
              text="Career.log"
              by="word"
              stagger={0.045}
              className="mt-6 font-display text-headline font-extrabold text-ink"
            />
          </div>
        </div>

        <motion.p
          aria-label={careerLog.statement.join(" ")}
          className="mt-14 font-display text-[clamp(2.25rem,7.5vw,6.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] md:mt-20"
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -14% 0px" }}
        >
          {careerLog.statement.map((line, index) => {
            const tail = line.endsWith(careerLog.statementAccent)
              ? careerLog.statementAccent
              : null;
            const lead = tail ? line.slice(0, -tail.length) : line;

            return (
              <span key={line} aria-hidden className="reveal-clip">
                <motion.span
                  className={`block text-ink ${tail ? "pl-[0.09em]" : ""}`}
                  variants={{
                    hidden: { y: "110%" },
                    visible: {
                      y: "0%",
                      transition: {
                        duration: 1.15,
                        delay: index * 0.09,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                >
                  {lead}
                  {tail ? <span className="text-accent">{tail}</span> : null}
                </motion.span>
              </span>
            );
          })}
        </motion.p>
      </div>

      {/* ---------- The chapters ---------- */}
      <ol className="gutter">
        {career.map((chapter, index) => (
          <Chapter
            key={chapter.id}
            ref={(node) => {
              chapterRefs.current[index] = node;
            }}
            chapter={chapter}
          />
        ))}
      </ol>

      {/* ---------- Status, and the hand-off ---------- */}
      <div ref={outroRef} className="gutter border-t border-line py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="label text-muted">{careerLog.status.label}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-extrabold uppercase leading-none tracking-tight text-accent">
                {careerLog.status.value}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 font-display text-[clamp(2.25rem,6.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] text-ink">
                {careerLog.status.line}
              </p>
            </Reveal>
          </div>

          {/* The log's name becoming the next log's name. */}
          <div className="lg:col-span-5">
            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-2 font-display text-[clamp(1.25rem,2.6vw,2rem)] font-bold tracking-tight">
              <span data-morph-from className="text-muted">
                {careerLog.morph.from}
              </span>
              <ArrowRight
                data-morph-arrow
                aria-hidden
                className="h-5 w-5 shrink-0 self-center text-accent"
                strokeWidth={1.5}
              />
              <span data-morph-to className="text-accent">
                {careerLog.morph.to}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-4">
          <Reveal>
            <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              <span className="text-accent">{careerLog.outro.kicker}</span>
              <span className="text-line">/</span>
              <span>{careerLog.outro.index}</span>
              <span className="text-ink">{careerLog.outro.title}</span>
              <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type ChapterProps = {
  chapter: CareerChapter;
  ref: (node: HTMLElement | null) => void;
};

/**
 * One chapter. Education is set at a deliberately smaller measure; the eight
 * years get the largest body and the only figure; the current role gets the
 * accent and the largest plate.
 *
 * `data-group` marks the blocks the entrance stagger walks through, in the
 * order they should arrive.
 */
function Chapter({ chapter, ref }: ChapterProps) {
  const education = chapter.kind === "education";
  const current = Boolean(chapter.current);
  const headingId = `career-${chapter.id}`;

  return (
    <li
      ref={ref}
      data-chapter={chapter.id}
      data-kind={chapter.kind}
      data-current={current ? "true" : undefined}
      className={`border-t border-line will-change-transform ${
        education ? "py-12 md:py-16" : "py-16 md:py-28"
      }`}
    >
      {/* Chapter head: numeral, kind, and where it sits in the arc. */}
      <div
        data-group
        data-enter="head"
        className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2"
      >
        <p className="label flex items-baseline gap-3 text-muted">
          <span className={current ? "text-accent" : "text-ink"}>
            {chapter.index}
          </span>
          <span className="text-line">/</span>
          {education ? "Education" : "Experience"}
        </p>
        <p className={`label ${current ? "text-accent" : "text-muted"}`}>
          {chapter.discipline}
        </p>
      </div>

      <div
        className={`mt-8 flex flex-col gap-6 lg:flex-row lg:items-baseline ${
          education ? "lg:gap-10" : "lg:gap-14"
        }`}
      >
        {/* The plate numeral. */}
        <p
          data-plate
          data-enter="plate"
          aria-hidden
          className={`shrink-0 font-display font-extrabold leading-[0.78] tracking-[-0.05em] tabular-nums will-change-transform ${
            current
              ? "text-[clamp(4.5rem,16vw,12rem)] text-accent"
              : education
                ? "text-[clamp(2.5rem,7vw,5rem)] text-ink/45"
                : "text-[clamp(3.5rem,12vw,9rem)] text-ink"
          }`}
        >
          {chapter.year}
        </p>

        <div className="min-w-0 flex-1">
          {current ? (
            <p
              data-group
              data-enter="current"
              className="label mb-4 flex items-center gap-3 text-accent"
            >
              {/* A static mark that draws itself once — it never pulses. */}
              <span
                data-marker
                aria-hidden
                className="h-2 w-2 shrink-0 bg-accent"
              />
              {careerLog.currentLabel}
            </p>
          ) : null}

          <p data-group data-enter="period" className="label text-muted">
            <span className="sr-only">Period: </span>
            {chapter.period}
          </p>

          <h3
            data-group
            data-enter="org"
            id={headingId}
            className={`mt-3 font-display font-extrabold uppercase leading-[0.92] tracking-[-0.03em] ${
              current
                ? "text-[clamp(1.75rem,4.4vw,3.5rem)] text-ink"
                : education
                  ? "text-[clamp(1.25rem,2.4vw,1.875rem)] text-ink/80"
                  : "text-[clamp(1.625rem,3.6vw,2.875rem)] text-ink"
            }`}
          >
            {chapter.organisation}
          </h3>

          <p
            data-group
            data-enter="title"
            className={`mt-3 ${
              education
                ? "label text-muted"
                : "max-w-[36ch] text-lead text-ink/60"
            }`}
          >
            {chapter.title}
            {chapter.field ? (
              <>
                <span aria-hidden className="px-2 text-line">
                  /
                </span>
                {chapter.field}
              </>
            ) : null}
          </p>

          {chapter.since ? (
            <p data-group data-enter="since" className="label mt-6 text-muted">
              <time dateTime={chapter.since.iso}>{chapter.since.label}</time>
            </p>
          ) : null}
        </div>

        {/* The one verified career figure, on the chapter that earned it. */}
        {chapter.figure ? (
          <p
            data-figure
            data-enter="figure"
            className="shrink-0 will-change-transform lg:text-right"
          >
            <span className="block font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-none tracking-tighter tabular-nums text-accent">
              {chapter.figure.value}
            </span>
            <span className="label mt-2 block text-muted">
              {chapter.figure.label}
            </span>
          </p>
        ) : null}
      </div>

      {/* What the years were. Opens up as the chapter is read. */}
      {chapter.practice ? (
        <div
          data-support
          data-enter="support"
          className="mt-12 grid gap-8 will-change-transform lg:grid-cols-12 lg:gap-12"
        >
          <p className="label text-muted lg:col-span-3">
            {careerLog.practiceLabel}
          </p>
          <ul className="flex flex-col gap-4 lg:col-span-9">
            {chapter.practice.map((line) => (
              <li
                key={line}
                data-practice
                className="flex max-w-[68ch] gap-4 border-b border-line-soft pb-4 text-ink/70"
              >
                <span aria-hidden className="shrink-0 text-accent">
                  &mdash;
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Technologies, as supporting metadata. */}
      {chapter.technologies ? (
        <ul
          data-group
          data-late
          className="mt-8 flex flex-wrap items-baseline gap-x-1 gap-y-2 lg:mt-10"
        >
          {chapter.technologies.map((technology, position) => (
            <li key={technology} className="flex items-baseline gap-1">
              {position > 0 ? (
                <span aria-hidden className="label text-line">
                  /
                </span>
              ) : null}
              <span className="label text-ink/70">{technology}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
