import type { MetadataRoute } from "next";
import { PROJECTS } from "./projects/data";
import { abs, LAST_UPDATED } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_UPDATED);
  return [
    { url: abs("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: abs("/about"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/projects"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/resume"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    ...PROJECTS.map((project) => ({
      url: abs("/projects/" + project.slug),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
