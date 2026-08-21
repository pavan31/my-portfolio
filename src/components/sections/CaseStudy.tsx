"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data/projects";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { Reveal } from "@/components/motion/Reveal";

/**
 * One project, at length.
 *
 * The page is built from the six case-study sections, but it only renders the
 * ones that have been written. Overview, implementation and impact exist for
 * every project; problem, approach and architecture are waiting for real
 * write-ups, and an empty section is better than an invented one — so the
 * page says so plainly instead of padding itself out.
 */
export function CaseStudy({ project }: { project: Project }) {
  const index = projects.findIndex((entry) => entry.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const pending = (
    [
      ["Problem", project.caseStudy.problem],
      ["Approach", project.caseStudy.approach],
      ["Architecture", project.caseStudy.architecture],
    ] as const
  ).filter(([, body]) => !body);

  return (
    <main className="bg-void pb-24 pt-28 md:pt-36">
      <div className="gutter">
        <Reveal>
          <Link
            href="/#work"
            data-cursor="link"
            className="label group inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
              strokeWidth={1.5}
            />
            Selected work
          </Link>
        </Reveal>

        {/* ---------- Masthead ---------- */}
        <header className="mt-12 border-t border-line pt-4">
          <Reveal>
            <p className="label flex items-baseline gap-3 text-muted">
              <span className="text-accent">{project.id}</span>
              <span className="text-line">/</span>
              {project.kicker}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,10vw,8rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.045em] text-ink">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-[28ch] font-display text-[clamp(1.25rem,3vw,2.25rem)] font-bold uppercase leading-tight tracking-tight text-ink/70">
              {project.subtitle}
            </p>
          </Reveal>
        </header>

        {/* ---------- Facts rail ---------- */}
        <dl className="mt-12 grid gap-x-10 gap-y-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="label text-muted">Role</dt>
            <dd className="mt-2 text-ink">{project.role}</dd>
          </div>
          <div>
            <dt className="label text-muted">Technologies</dt>
            <dd className="mt-2 flex flex-wrap items-baseline gap-x-1 gap-y-1">
              {project.technologies.map((technology, position) => (
                <span key={technology} className="flex items-baseline gap-1">
                  {position > 0 ? (
                    <span aria-hidden className="label text-line">
                      /
                    </span>
                  ) : null}
                  <span className="label text-ink/70">{technology}</span>
                </span>
              ))}
            </dd>
          </div>
          {project.links.length > 0 ? (
            <div>
              <dt className="label text-muted">Live</dt>
              <dd className="mt-2 flex flex-col gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor="link"
                    className="label inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden
                      className="h-3.5 w-3.5"
                      strokeWidth={1.5}
                    />
                    <span className="sr-only"> — opens in a new tab</span>
                  </a>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>

        {/* ---------- Visual ---------- */}
        <div className="mt-14 aspect-4/3 w-full md:aspect-video">
          <ProjectVisual project={project} />
        </div>
        <p className="label mt-3 text-muted">
          Generated diagram of the product&apos;s surfaces — not a screenshot.
        </p>

        {/* ---------- Overview ---------- */}
        {project.caseStudy.overview ? (
          <Section title="Overview" index="01">
            <p className="max-w-[62ch] text-lead text-ink/70">
              {project.caseStudy.overview}
            </p>
          </Section>
        ) : null}

        {/* ---------- Capabilities, where the product has a surface ---------- */}
        {project.capabilities ? (
          <Section title="Capabilities" index="02">
            <ul className="grid gap-x-10 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {project.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex gap-3 text-sm leading-relaxed text-ink/70"
                >
                  <span aria-hidden className="text-accent">
                    +
                  </span>
                  {capability}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {/* ---------- Implementation ---------- */}
        <Section title="Implementation" index={project.capabilities ? "03" : "02"}>
          <ul className="flex max-w-[72ch] flex-col gap-3">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-4 border-b border-line-soft pb-3 text-ink/70"
              >
                <span aria-hidden className="text-accent">
                  &mdash;
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------- Impact ---------- */}
        <Section title="Impact" index={project.capabilities ? "04" : "03"}>
          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {project.impact.map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-none tracking-tighter text-accent">
                  {stat.value}
                </dd>
                <dt className="label mt-3 max-w-[18ch] text-muted">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Section>

        {/* ---------- What is not written yet ---------- */}
        {pending.length > 0 ? (
          <div className="mt-20 border-t border-line pt-4">
            <p className="label text-muted">In progress</p>
            <p className="mt-3 max-w-[52ch] text-ink/50">
              {`${pending
                .map(([name]) => name)
                .join(", ")} are still being written up. They will appear here rather than be paraphrased from memory.`}
            </p>
          </div>
        ) : null}

        {/* ---------- Next ---------- */}
        <nav
          aria-label="More projects"
          className="mt-20 border-t border-line pt-6"
        >
          <Link
            href={`/projects/${next.slug}`}
            prefetch={false}
            data-cursor="view"
            data-cursor-label="Next"
            className="group flex flex-wrap items-baseline justify-between gap-4"
          >
            <span className="label text-muted">
              <span className="text-accent">Next</span>
              <span className="px-2 text-line">/</span>
              {next.id}
            </span>
            <span className="font-display text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        </nav>
      </div>
    </main>
  );
}

function Section({
  title,
  index,
  children,
}: {
  title: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20 border-t border-line pt-6">
      <h2 className="label mb-6 flex items-baseline gap-3 text-muted">
        <span className="text-accent">{index}</span>
        <span className="text-line">/</span>
        {title}
      </h2>
      {children}
    </section>
  );
}
