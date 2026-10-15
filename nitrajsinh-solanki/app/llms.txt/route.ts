import { PROJECTS } from "../projects/data";
import { profile } from "@/lib/profile";
import { SITE_NAME, SOCIAL, LOCATION_LABEL, ALTERNATE_NAMES, abs } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const alt = ALTERNATE_NAMES.length ? " (also written " + ALTERNATE_NAMES.join(", ") + ")" : "";
  const lines = [
    "# " + SITE_NAME,
    "",
    "> " + profile.tagline + " Based in " + LOCATION_LABEL + ".",
    "",
    SITE_NAME + alt + " is a " + profile.headline.toLowerCase() +
      ". Currently " + profile.role.title + " at " + profile.role.org +
      " (since " + profile.role.since + "), working with " + profile.role.stack + ".",
    "",
    "## Pages",
    "- [Home](" + abs("/") + "): overview, tech stack, services, work history, contact",
    "- [About](" + abs("/about") + "): biography, education, awards",
    "- [Resume](" + abs("/resume") + "): experience, skills, education (PDF: " + abs("/Nitrajsinh_Solanki_Resume.pdf") + ")",
    "- [Projects](" + abs("/projects") + "): " + PROJECTS.length + " projects",
    "",
    "## Projects",
    ...PROJECTS.map((project) => "- [" + project.title + "](" + abs("/projects/" + project.slug) + "): " + project.description),
    "",
    "## Profiles",
    "- [GitHub](" + SOCIAL.github + ")",
    "- [LinkedIn](" + SOCIAL.linkedin + ")",
    "- [X](" + SOCIAL.x + ")",
    "- [Medium](" + SOCIAL.medium + ")",
    "",
    "## Optional",
    "- [Full text](" + abs("/llms-full.txt") + "): all profile and project details in one file",
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
