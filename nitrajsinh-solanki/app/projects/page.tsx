// app/projects/page.tsx
// Place this file at: nitrajsinh-solanki/app/projects/page.tsx

import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects — Nitrajsinh Solanki | Full-Stack Developer",
  description:
    "Explore 10 projects by Nitrajsinh Solanki — hackathon winners, blockchain apps, AI tools, live client platforms, and more. $250+ in prizes won across StackUp hackathons.",
  keywords: [
    "Nitrajsinh Solanki projects",
    "full-stack developer portfolio",
    "Next.js projects",
    "React developer India",
    "hackathon winner",
    "Aptos blockchain NFT",
    "Flutter app developer",
    "StackUp hackathon",
    "MERN stack projects",
    "AI web applications",
  ],
  openGraph: {
    title: "Projects — Nitrajsinh Solanki",
    description:
      "10 projects including hackathon winners, blockchain apps, AI tools, and live client platforms.",
    url: "https://nitrajsinh-solanki.vercel.app/projects",
    siteName: "Nitrajsinh Solanki Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Nitrajsinh Solanki",
    description:
      "10 projects including hackathon winners, blockchain apps, AI tools, and live client platforms.",
    creator: "@Nitrajsinh2005",
  },
  alternates: {
    canonical: "https://nitrajsinh-solanki.vercel.app/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}