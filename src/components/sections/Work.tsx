"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { ordinal } from "@/lib/utils";
import { useGSAP } from "@/lib/hooks/useGSAP";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ProjectPlate } from "@/components/visuals/ProjectPlate";
import { Reveal } from "@/components/motion/Reveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * Desktop pins the viewport and converts vertical scroll into lateral travel;
 * below `lg` the same panels stack, because a horizontal rail on a phone is a
 * gesture nobody asked for. The word behind the track drifts the other way,
 * which is what sells the depth.
 */
export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          const pin = pinRef.current;
          if (!track || !pin) return;

          const distance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (!counterRef.current) return;
                const index = Math.min(
                  projects.length,
                  Math.floor(self.progress * projects.length) + 1,
                );
                counterRef.current.textContent = ordinal(index - 1);
              },
            },
          });

          timeline
            .to(track, { x: () => -distance(), ease: "none" }, 0)
            .to(backdropRef.current, { xPercent: 26, ease: "none" }, 0)
            .fromTo(
              progressRef.current,
              { scaleX: 0 },
              { scaleX: 1, ease: "none" },
              0,
            );
        },
      );

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="scroll-mt-24 border-t border-line bg-void"
    >
      <div className="gutter py-28 md:py-40 lg:pb-16">
        <SectionHeading
          index="03"
          label="Work"
          title={["Selected", "engagements"]}
          note="Seven products across healthcare, commerce, telecom and subsea engineering."
        />
      </div>

      <div
        ref={pinRef}
        className="relative lg:h-svh lg:overflow-hidden"
      >
        {/* Counter-drifting backdrop word */}
        <span
          ref={backdropRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 select-none whitespace-nowrap font-display text-[26vw] font-extrabold uppercase leading-none tracking-tighter text-ink/[0.035] lg:block"
        >
          Work — Work — Work
        </span>

        <div
          ref={trackRef}
          className="gutter flex flex-col gap-20 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-[6vw] lg:pr-[12vw]"
        >
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="group relative lg:w-[min(80vw,1180px)] lg:shrink-0"
            >
              <Reveal delay={0} distance={30}>
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
                  {/* Text column */}
                  <div className="order-2 flex flex-col lg:order-1 lg:col-span-5">
                    <p className="label flex items-center gap-3 text-muted">
                      <span className="text-accent">{ordinal(index)}</span>
                      <span className="h-px w-8 bg-line" />
                      {project.discipline}
                    </p>

                    <h3 className="mt-5 font-display text-headline font-extrabold tracking-tight text-ink">
                      {project.title}
                    </h3>

                    <p className="mt-4 max-w-[46ch] text-lead text-ink/60">
                      {project.detail}
                    </p>

                    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6">
                      <div>
                        <dt className="label text-muted">Domain</dt>
                        <dd className="mt-1 text-sm text-ink">
                          {project.domain}
                        </dd>
                      </div>
                      <div>
                        <dt className="label text-muted">Role</dt>
                        <dd className="mt-1 text-sm text-ink">{project.role}</dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="label text-muted">Stack</dt>
                        <dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink/60">
                          {project.stack.map((item, itemIndex) => (
                            <span key={item}>
                              {item}
                              {itemIndex < project.stack.length - 1 ? (
                                <span aria-hidden className="pl-3 text-line">
                                  ·
                                </span>
                              ) : null}
                            </span>
                          ))}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-8">
                      {project.href ? (
                        <MagneticButton
                          href={project.href}
                          external
                          cursorLabel="Visit"
                          ariaLabel={`Visit ${project.title}`}
                          className="label items-center border border-line px-5 py-3.5 text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
                        >
                          Visit site
                          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </MagneticButton>
                      ) : (
                        <p className="label flex items-center gap-2 text-muted">
                          <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
                          Private engagement
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Plate */}
                  <div className="order-1 lg:order-2 lg:col-span-7">
                    <ProjectPlate
                      motif={project.motif}
                      mark={project.mark}
                      className="aspect-4/3 w-full lg:aspect-16/11"
                    />
                  </div>
                </div>
              </Reveal>
            </article>
          ))}
        </div>

        {/* Lateral progress read-out */}
        <div className="gutter pointer-events-none absolute inset-x-0 bottom-8 hidden items-center gap-4 lg:flex">
          <span className="label text-accent">
            <span ref={counterRef}>01</span>
            <span className="px-1 text-line">/</span>
            <span className="text-muted">{ordinal(projects.length - 1)}</span>
          </span>
          <span className="relative h-px flex-1 bg-line">
            <span
              ref={progressRef}
              className="absolute inset-0 origin-left scale-x-0 bg-accent"
            />
          </span>
        </div>
      </div>
    </section>
  );
}
