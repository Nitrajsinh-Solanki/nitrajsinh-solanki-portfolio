import { PROJECTS } from "../projects/data";
import { profile } from "@/lib/profile";
import { SITE_NAME, LOCATION_LABEL, abs } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const out: string[] = [
    "# " + SITE_NAME + ": full profile",
    "",
    "Location: " + LOCATION_LABEL,
    "Email: " + profile.email,
    "Role: " + profile.role.title + ", " + profile.role.org + " (since " + profile.role.since + ")",
    "",
    "## Education",
    ...profile.education.map((item) => "- " + item.level + ", " + item.school + " (" + item.board + "), " + item.period + ", " + item.score),
    "",
    "## Awards",
    ...profile.awards.map((item) => "- " + item.text),
    "",
    "## Experience",
    ...profile.experience.flatMap((item) => [
      "### " + item.title + ", " + item.org + " (" + item.period + ")",
      ...item.bullets.map((bullet) => "- " + bullet),
      "",
    ]),
    "## Skills",
    ...Object.entries(profile.skills).map(([label, values]) => "- " + label + ": " + values.join(", ")),
    "",
    "## Projects",
    ...PROJECTS.flatMap((project) => [
      "### " + project.title,
      "URL: " + abs("/projects/" + project.slug),
      "Badge: " + project.badge.replace(/^[^\w$]+/, ""),
      project.longDescription,
      "Tech: " + project.tech.join(", "),
      "Features:",
      ...project.features.map((feature) => "- " + feature),
      "",
    ]),
  ];
  return new Response(out.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
