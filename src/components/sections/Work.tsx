"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, work, type Project } from "@/lib/data/projects";
import { useGSAP } from "@/lib/hooks/useGSAP";
import { scrollToTarget } from "@/lib/scroll";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { Reveal } from "@/components/motion/Reveal";

gsap.registerPlugin(ScrollTrigger);

/*
 * The gallery runs sideways wherever there is room for a full panel.
 *
 * The height floor is deliberately low: a 1366x768 or 1536x864 laptop has
 * roughly 620-730px of viewport once browser chrome is subtracted, and those
 * are ordinary desktops that should get the gallery. Only genuinely
 * unusable heights — a landscape phone, a very short window — fall back to
 * the stacked reading order. Panels are sized in viewport units, so they
 * scale into whatever is left rather than overflowing it.
 */
const GALLERY_QUERY = "(min-width: 1024px) and (min-height: 34rem)";

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef<HTMLElement>(null);
  const gaugeRef = useRef<HTMLSpanElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);

  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  /* Keep the active project in view in the compact index strip. */
  useEffect(() => {
    const nav = indexRef.current;
    const item = nav?.querySelectorAll("button, a")[activeIndex];
    if (!nav || !item) return;

    const navBox = nav.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    if (itemBox.left >= navBox.left && itemBox.right <= navBox.right) return;

    nav.scrollTo({
      left: Math.max(
        0,
        (item as HTMLElement).offsetLeft -
          nav.clientWidth / 2 +
          (item as HTMLElement).clientWidth / 2,
      ),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [activeIndex, reducedMotion]);

  /*
   * The index has to move the *page*, because the page is what drives the
   * track. An anchor jump would land on the panel's document position, which
   * is inside the pinned container and therefore the same for all six.
   */
  const jumpTo = (index: number) => {
    const trigger = ScrollTrigger.getById("work-gallery");
    const track = trackRef.current;
    const panel = panelRefs.current[index];
    if (!trigger || !track || !panel) return false;

    const distance = track.scrollWidth - window.innerWidth;
    if (distance <= 0) return false;

    // Where the track has to sit for this panel to be centred.
    const target =
      panel.offsetLeft - (window.innerWidth - panel.offsetWidth) / 2;
    const progress = Math.min(1, Math.max(0, target / distance));
    scrollToTarget(trigger.start + progress * (trigger.end - trigger.start), {
      offset: 0,
    });
    return true;
  };

  useGSAP(
    () => {
      const panels = panelRefs.current.filter(
        (node): node is HTMLElement => node !== null,
      );
      if (panels.length === 0) return;

      const media = gsap.matchMedia();

      /* ---------- Stacked: a reading line decides what is active ---------- */
      media.add(
        `not all and ${GALLERY_QUERY}, (prefers-reduced-motion: reduce)`,
        () => {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const next = panels.indexOf(entry.target as HTMLElement);
                if (next >= 0) {
                  setActiveIndex((current) =>
                    current === next ? current : next,
                  );
                }
              });
            },
            { rootMargin: "-42% 0px -58% 0px" },
          );
          panels.forEach((panel) => observer.observe(panel));
          return () => observer.disconnect();
        },
      );

      /* ---------- Sideways: vertical scroll becomes lateral travel ------- */
      media.add(
        `${GALLERY_QUERY} and (prefers-reduced-motion: no-preference)`,
        () => {
          const track = trackRef.current;
          const pin = pinRef.current;
          if (!track || !pin) return;

          const distance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          /*
           * One tween moves the track. Everything else hangs off it through
           * `containerAnimation`, which is how ScrollTrigger measures a panel
           * against lateral travel rather than against the page.
           */
          const travel = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              id: "work-gallery",
              trigger: pin,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              /* Last pin in the document — see the note in Hero. */
              refreshPriority: 1,
            },
          });

          // A gauge, not a scrollbar: a short rule that fills as the
          // gallery is walked, sitting with the counter it belongs to.
          if (gaugeRef.current) {
            gsap.fromTo(
              gaugeRef.current,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: pin,
                  start: "top top",
                  end: () => `+=${distance()}`,
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          // The word behind the track drifts the other way. That is what
          // sells the depth, and it costs one more tween on the same scrub.
          if (backdropRef.current) {
            gsap.to(backdropRef.current, {
              xPercent: 24,
              ease: "none",
              scrollTrigger: {
                trigger: pin,
                start: "top top",
                end: () => `+=${distance()}`,
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            });
          }

          panels.forEach((panel, index) => {
            // Becoming dominant: the panel resolves as it reaches the middle
            // of the viewport and recedes once it has passed.
            gsap.fromTo(
              panel,
              { opacity: 0.32, scale: 0.955 },
              {
                opacity: 1,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: travel,
                  start: "left 88%",
                  end: "left 34%",
                  scrub: true,
                },
              },
            );

            gsap.to(panel, {
              opacity: 0.32,
              scale: 0.955,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: travel,
                start: "right 62%",
                end: "right 8%",
                scrub: true,
              },
            });

            // The visual settles the last of the way in as the panel
            // arrives, and eases back out as it leaves. One child, not six.
            const visual = panel.querySelector(".work-media");
            if (visual) {
              gsap.fromTo(
                visual,
                { scale: 0.96 },
                {
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: travel,
                    start: "left 92%",
                    end: "left 30%",
                    scrub: true,
                  },
                },
              );
            }

            ScrollTrigger.create({
              trigger: panel,
              containerAnimation: travel,
              start: "left 64%",
              end: "right 36%",
              onToggle: (self) => {
                if (self.isActive) {
                  setActiveIndex((current) =>
                    current === index ? current : index,
                  );
                }
              },
            });
          });

          ScrollTrigger.refresh();
          return () => {
            /* matchMedia reverts the tweens; the refresh restores geometry. */
            ScrollTrigger.refresh();
          };
        },
      );

      return () => media.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative scroll-mt-24 border-t border-line bg-void"
    >
      {/* ---------- The title plate ---------- */}
      <div className="gutter flex min-h-svh flex-col justify-center py-28 md:py-36">
        <Reveal>
          <p className="label border-t border-line pt-3 text-muted">
            <span className="text-accent">04</span>
            <span className="px-2 text-line">/</span>
            Selected work
          </p>
        </Reveal>

        <motion.h2
          aria-label={work.title.join(" ")}
          className="mt-10 font-display text-[clamp(3.25rem,13.5vw,10.5rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.05em] md:mt-14"
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        >
          {work.title.map((line, index) => {
            const accent = line === work.titleAccent;
            return (
              <span key={line} aria-hidden className="reveal-clip">
                <motion.span
                  className={`block ${accent ? "text-accent" : "text-ink"}`}
                  style={{ paddingLeft: `${index * 0.07}em` }}
                  variants={{
                    hidden: { y: "112%" },
                    visible: {
                      y: "0%",
                      transition: {
                        duration: 1.15,
                        delay: index * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                >
                  {line}
                </motion.span>
              </span>
            );
          })}
        </motion.h2>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-4">
          <Reveal>
            <p className="flex items-baseline gap-3">
              <span className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-none tracking-tighter tabular-nums text-ink">
                {String(projects.length).padStart(2, "0")}
              </span>
              <span className="label text-muted">Projects</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label max-w-[38ch] text-muted normal-case tracking-normal">
              {work.note}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ---------- The gallery ---------- */}
      <div ref={pinRef} className="work-pin relative border-t border-line">
        {/* A word drifting behind the track, counter to it. */}
        <span
          ref={backdropRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 select-none whitespace-nowrap font-display text-[24vw] font-extrabold uppercase leading-none tracking-tighter text-ink/[0.035] lg:block"
        >
          Work 
        </span>

        <div ref={trackRef} className="work-track gutter">
          {projects.map((project, index) => (
            <Panel
              key={project.slug}
              ref={(node) => {
                panelRefs.current[index] = node;
              }}
              project={project}
              active={activeIndex === index}
            />
          ))}
        </div>

        {/* ---------- Index and counter, parked in the corner ---------- */}
        <div className="work-chrome gutter">
          <div className="flex items-center gap-3">
            <span className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-extrabold leading-none tracking-tighter tabular-nums text-accent">
              {projects[activeIndex]?.id ?? "01"}
            </span>
            <span className="label text-muted">
              <span className="sr-only">
                {`Project ${activeIndex + 1} of ${projects.length}`}
              </span>
              <span aria-hidden>
                / {String(projects.length).padStart(2, "0")}
              </span>
            </span>

            {/* Fills as the gallery is walked. Deliberately short. */}
            <span
              aria-hidden
              className="work-gauge relative ml-2 hidden h-px w-16 bg-line lg:block"
            >
              <span
                ref={gaugeRef}
                className="absolute inset-0 origin-left bg-accent"
              />
            </span>
          </div>

          <nav
            ref={indexRef}
            aria-label="Projects"
            className="work-index min-w-0 flex-1"
          >
            <ul className="flex items-center gap-x-6 lg:justify-end">
              {projects.map((project, index) => (
                <li key={project.slug} className="shrink-0">
                  <a
                    href={`#project-${project.slug}`}
                    onClick={(event) => {
                      // Falls through to the anchor when the gallery is not
                      // pinned, which is also what happens without scripting.
                      if (jumpTo(index)) event.preventDefault();
                    }}
                    aria-current={activeIndex === index ? "true" : undefined}
                    data-cursor="link"
                    className={`label flex items-baseline gap-2 whitespace-nowrap py-1 transition-colors duration-300 ${
                      activeIndex === index
                        ? "text-accent"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    <span className="tabular-nums">{project.id}</span>
                    <span>{project.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ---------- Hand-off ---------- */}
      <div className="gutter border-t border-line py-20 md:py-28">
        <Reveal>
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
            <span className="text-accent">{work.outro.kicker}</span>
            <span className="text-line">/</span>
            <span>{work.outro.index}</span>
            <span className="text-ink">{work.outro.title}</span>
            <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
          </p>
        </Reveal>
      </div>
    </section>
  );
}

type PanelProps = {
  project: Project;
  active: boolean;
  ref: (node: HTMLElement | null) => void;
};

/**
 * One project, as an editorial panel rather than a card. The flagship gets a
 * wider measure and larger type; the rest share a composition that varies by
 * the shape of what they contain — how many metrics, how long the stack.
 */
function Panel({ project, active, ref }: PanelProps) {
  const flagship = project.featured;
  const headingId = `project-${project.slug}`;

  return (
    <article
      ref={ref}
      id={headingId}
      data-panel
      data-active={active ? "true" : undefined}
      data-flagship={flagship ? "true" : undefined}
      aria-labelledby={`${headingId}-title`}
      className="work-panel"
    >
      {/* A hairline that lights when the panel holds the viewport. */}
      <span aria-hidden className="work-rule" />

      <div className="work-panel-grid">
        {/* ---- Head ---- */}
        <div className="work-head">
          <p className="label flex items-baseline gap-3 text-muted">
            <span className="text-accent">{project.id}</span>
            <span className="text-line">/</span>
            <span className={flagship ? "text-accent" : undefined}>
              {project.kicker}
            </span>
          </p>

          <h3
            id={`${headingId}-title`}
            className={`mt-4 font-display font-extrabold leading-[0.88] tracking-[-0.04em] text-ink ${
              flagship
                ? "text-[clamp(2.5rem,6vw,5rem)]"
                : "text-[clamp(2rem,4vw,3.25rem)]"
            }`}
          >
            {project.title}
          </h3>

          <p
            className={`mt-3 uppercase ${
              flagship
                ? "font-display text-[clamp(1rem,1.8vw,1.5rem)] font-bold leading-tight tracking-tight text-ink/70"
                : "label text-muted"
            }`}
          >
            {project.subtitle}
          </p>

        </div>

        {/* ---- Visual ---- */}
        <div className="work-media">
          <Link
            href={`/projects/${project.slug}`}
            /*
              Prefetch off: the static export writes each RSC payload under
              __next.projects/$d$slug/__PAGE__.txt, while the client requests
              the same path with dots instead of slashes. On a plain file host
              that is a 404 on every hover, and the navigation falls back to a
              full page load regardless.
            */
            prefetch={false}
            tabIndex={-1}
            aria-hidden
            data-cursor="view"
            data-cursor-label="Case study"
            className="block h-full w-full"
          >
            <ProjectVisual project={project} />
          </Link>
        </div>

        {/* ---- Body ---- */}
        <div className="work-body">
          <p className="max-w-[46ch] text-ink/60">{project.description}</p>

          {/*
            Technologies read as metadata, not pills — and they sit after the
            description, which is the order the panel is meant to be read in
            when it is stacked rather than hung on the wall.
          */}
          <ul className="mt-5 flex flex-wrap items-baseline gap-x-1 gap-y-1.5">
            {project.technologies.map((technology, position) => (
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

          {/* Impact: editorial numerals, never a stat card. */}
          <dl className="mt-7 flex flex-wrap gap-x-9 gap-y-5 border-t border-line pt-5">
            {project.impact.map((stat) => (
              <div key={stat.label}>
                <dd
                  className={`font-display font-extrabold leading-none tracking-tighter text-accent ${
                    flagship
                      ? "text-[clamp(2rem,3.8vw,3rem)]"
                      : "text-[clamp(1.75rem,3vw,2.5rem)]"
                  }`}
                >
                  {stat.value}
                </dd>
                <dt className="label mt-2 max-w-[15ch] text-muted">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-3 pt-7">
            <Link
              href={`/projects/${project.slug}`}
              prefetch={false}
              data-cursor="view"
              data-cursor-label="Case study"
              className="label group inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
            >
              Case study
              <ArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
              <span className="sr-only">{` for ${project.title}`}</span>
            </Link>

            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="link"
                className="label inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
              >
                {link.label}
                <ArrowUpRight
                  aria-hidden
                  className="h-3.5 w-3.5"
                  strokeWidth={1.5}
                />
                <span className="sr-only">{` — ${link.label} for ${project.title}, opens in a new tab`}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
