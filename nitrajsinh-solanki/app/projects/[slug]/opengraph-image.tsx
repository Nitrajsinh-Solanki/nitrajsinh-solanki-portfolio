import { ImageResponse } from "next/og";
import { PROJECTS } from "../data";
import { SITE_NAME } from "@/lib/site";

export const alt = "Project by Nitrajsinh Solanki";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "space-between", padding: 72, color: "#17191D",
        background: "linear-gradient(135deg, " + (project?.gradientFrom ?? "#F0EEE8") + ", " + (project?.gradientTo ?? "#F8F7F3") + ")",
      }}>
        <div style={{ display: "flex", fontSize: 28, color: project?.accentColor ?? "#4F46E5" }}>
          {SITE_NAME} · Portfolio project
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
          {project?.title ?? "Project"}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#686D76" }}>
          {(project?.tech ?? []).slice(0, 6).join("  ·  ")}
        </div>
      </div>
    ),
    { ...size }
  );
}
