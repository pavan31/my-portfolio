import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { projects } from "@/lib/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      /* The flagship outranks the rest here too. */
      priority: project.featured ? 0.8 : 0.6,
    })),
  ];
}
