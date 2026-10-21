import type { MetadataRoute } from "next";
import { PROJECTS } from "./projects/data";
import { abs } from "@/lib/site";

// Keep each date aligned with the real content or structured-data change for that route.
// Never stagger dates just to make them differ.
const PAGE_UPDATED: Record<string, string> = {
  "/": "2026-10-19",
  "/about": "2026-10-19",
  "/projects": "2026-10-21",
  "/resume": "2026-10-19",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...Object.entries(PAGE_UPDATED).map(([path, date]) => ({
      url: abs(path),
      lastModified: new Date(date),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path === "/resume" ? 0.7 : 0.9,
    })),
    ...PROJECTS.map((project) => ({
      url: abs("/projects/" + project.slug),
      lastModified: new Date(project.updated),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
