// app/projects/page.tsx
// Place this file at: nitrajsinh-solanki/app/projects/page.tsx

import { pageMetadata } from "@/lib/seo";
import { STATS } from "./data";
import ProjectsClient from "./ProjectsClient";

export const metadata = pageMetadata({
  title: "Projects — Full-Stack, AI & Blockchain",
  description:
    STATS.total + " projects by Nitrajsinh Solanki: StackUp hackathon prize winners, Aptos blockchain apps, AI tools and live client platforms built with Next.js, React, Flutter and Rust. $250+ in prizes.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsClient />;
}