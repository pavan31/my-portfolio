import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, projectBySlug } from "@/lib/data/projects";
import { site } from "@/lib/data/site";
import { CaseStudy } from "@/components/sections/CaseStudy";

/*
 * Statically exported, so every slug has to be known at build time and an
 * unknown one must 404 rather than try to render.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.subtitle}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      type: "article",
      title,
      description: project.description,
      url: `${site.url}/projects/${project.slug}/`,
    },
    twitter: { title, description: project.description },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  return <CaseStudy project={project} />;
}
