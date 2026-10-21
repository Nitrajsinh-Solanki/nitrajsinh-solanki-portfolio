// app/projects/page.tsx
// Place this file at: nitrajsinh-solanki/app/projects/page.tsx

import { pageMetadata } from "@/lib/seo";
import { PROJECTS, STATS } from "./data";
import ProjectsClient, { type Project } from "./ProjectsClient";

export const metadata = pageMetadata({
  title: "Projects — Full-Stack, AI & Blockchain",
  description:
    STATS.total + " projects by Nitrajsinh Solanki: StackUp hackathon winners, Aptos blockchain apps, AI tools and live client platforms. $250+ in prizes.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects: Project[] = PROJECTS.map((project) => ({
    id: project.id,
    slug: project.slug,
    title: project.title,
    shortTitle: project.shortTitle,
    category: project.category,
    badge: project.badge,
    badgeColor: project.badgeColor,
    description: project.description,
    tech: project.tech,
    github: project.links.find((link) => link.icon === "github")?.href,
    live: project.links.find((link) => link.icon === "live")?.href,
    demo: project.links.find((link) => link.icon === "demo")?.href,
    gradientFrom: project.gradientFrom,
    gradientTo: project.gradientTo,
    accentColor: project.accentColor,
    iconPath: project.iconPath,
  }));
  return <ProjectsClient projects={projects} />;
}