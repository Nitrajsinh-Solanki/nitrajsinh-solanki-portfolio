// app/projects/ProjectsClient.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { PROJECTS as SOURCE } from "./data";
import JsonLd from "../components/JsonLd";
import { abs, SOCIAL } from "@/lib/site";
import { breadcrumb } from "@/lib/schema";
import { profile } from "@/lib/profile";

// ──────────────────────────────────────────────
//  TYPES
// ──────────────────────────────────────────────
export type ProjectCategory = "all" | "hackathon" | "client" | "personal";

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: "hackathon" | "client" | "personal";
  badge: string;
  badgeColor: "teal" | "amber" | "violet" | "orange" | "blue";
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  demo?: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  iconPath: string;
}

// ──────────────────────────────────────────────
//  PROJECT DATA
// ──────────────────────────────────────────────
const PROJECTS: Project[] = SOURCE.map((project) => ({
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

// ──────────────────────────────────────────────
//  BADGE STYLES
// ──────────────────────────────────────────────
const BADGE_STYLES: Record<string, string> = {
  teal:   "bg-teal-400/10 text-teal-300 border border-teal-400/20",
  amber:  "bg-amber-400/10 text-amber-300 border border-amber-400/20",
  violet: "bg-violet-400/10 text-violet-300 border border-violet-400/20",
  orange: "bg-orange-400/10 text-orange-300 border border-orange-400/20",
  blue:   "bg-blue-400/10 text-blue-300 border border-blue-400/20",
};

// ──────────────────────────────────────────────
//  PROJECT CARD
// ──────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="group relative flex flex-col rounded-xl border border-[#131C2E] bg-[#080D18] overflow-hidden transition-all duration-300 hover:border-[#1F3050] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(94,234,212,0.05)]"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      {/* ── Visual Area ── */}
      <div
        className="relative h-40 w-full overflow-hidden flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`,
        }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, #1A2B42 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${project.accentColor}18 0%, transparent 70%)`,
          }}
        />
        {/* Browser chrome */}
        <div className="absolute top-3 left-4 flex items-center gap-[5px] z-10">
          <span className="w-2 h-2 rounded-full bg-[#FF5F56] opacity-70" />
          <span className="w-2 h-2 rounded-full bg-[#FEBC2E] opacity-70" />
          <span className="w-2 h-2 rounded-full bg-[#27C840] opacity-70" />
        </div>

        {/* Accent top border */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}60, transparent)` }}
        />

        {/* Icon */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border"
            style={{
              background: `${project.accentColor}12`,
              borderColor: `${project.accentColor}30`,
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke={project.accentColor}
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={project.iconPath} />
            </svg>
          </div>
          <span
            className="font-mono text-[9px] tracking-[0.12em] uppercase opacity-50"
            style={{ color: project.accentColor }}
          >
            {project.category === "client" ? "Client Project" : "Hackathon"}
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Badge */}
        <span
          className={`self-start font-mono text-[10px] tracking-wide px-2.5 py-[3px] rounded-full mb-3 ${BADGE_STYLES[project.badgeColor]}`}
          itemProp="applicationCategory"
        >
          {project.badge}
        </span>

        {/* Title */}
        <h2
          className="text-[14px] font-bold leading-snug text-[#D8D3CB] group-hover:text-[#E2DDD5] transition-colors mb-2"
          style={{ fontFamily: "var(--syne-var)" }}
          itemProp="name"
        >
          {project.title}
        </h2>

        {/* Description */}
        <p
          className="text-[12.5px] text-[#A5B0C0] leading-[1.75] flex-1 mb-4"
          itemProp="description"
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] text-[#4A5568] border border-[#131C2E] bg-[#0A1020] px-2 py-[3px] rounded"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="font-mono text-[10px] text-[#3A4555] px-2 py-[3px]">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-[#0F1620]">
          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 text-center font-mono text-[11px] tracking-wide bg-teal-300/10 text-teal-300 border border-teal-300/20 px-3 py-2 rounded-lg hover:bg-teal-300 hover:text-[#070B14] transition-all duration-200"
          >
            View Details
          </Link>

          {/* GitHub */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub — ${project.title}`}
              className="flex items-center justify-center w-8 h-8 border border-[#131C2E] rounded-lg hover:border-[#1F3050] hover:bg-[#0D1520] transition-all duration-200 shrink-0"
            >
              <svg className="w-3.5 h-3.5 text-[#A5B0C0]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}

          {/* Live link */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live — ${project.title}`}
              className="flex items-center justify-center w-8 h-8 border border-[#131C2E] rounded-lg hover:border-teal-400/30 hover:bg-[#0D1520] transition-all duration-200 shrink-0"
            >
              <svg className="w-3.5 h-3.5 text-[#A5B0C0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ──────────────────────────────────────────────
//  MAIN CLIENT COMPONENT
// ──────────────────────────────────────────────
export default function ProjectsClient() {
  const [filter, setFilter] = useState<ProjectCategory>("all");

  const filtered = PROJECTS.filter((p) =>
    filter === "all" ? true : p.category === filter
  );

  const hackathonCount = PROJECTS.filter((p) => p.category === "hackathon").length;
  const clientCount    = PROJECTS.filter((p) => p.category === "client").length;
  const personalCount  = PROJECTS.filter((p) => p.category === "personal").length;

  return (
    <>
      {/* JSON-LD */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Projects by Nitrajsinh Solanki",
        url: abs("/projects"),
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: PROJECTS.length,
          itemListElement: PROJECTS.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.title,
            url: abs("/projects/" + project.slug),
          })),
        },
      }} />
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }])} />

      <div className="flex flex-col min-h-screen bg-[#070B14]">

        {/* ── Navbar ── */}
        <nav className="fixed top-0 inset-x-0 z-50 bg-[#070B14]/92 backdrop-blur-xl border-b border-[#131C2E]">
          <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-6 md:px-10">
            <Link
              href="/"
              style={{ fontFamily: "var(--syne-var)" }}
              className="font-extrabold text-xl tracking-tight text-[#E2DDD5] select-none"
            >
              NS<span className="text-teal-300">.</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#A5B0C0] hover:text-[#C8C3BA] tracking-[0.07em] uppercase transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back Home
              </Link>
              <a
                href="mailto:nrsolanki2005@gmail.com"
                className="hidden sm:inline-block font-mono text-[11px] text-teal-300 border border-teal-300/60 px-4 py-2 rounded hover:bg-teal-300 hover:text-[#070B14] transition-all duration-200 tracking-widest"
              >
                Hire Me
              </a>
            </div>
          </div>
        </nav>

        <main className="flex-1 pt-16" id="main-content">

          {/* ── Page Header ── */}
          <section
            className="relative px-6 md:px-10 pt-14 pb-10 overflow-hidden"
            aria-labelledby="projects-heading"
          >
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(94,234,212,0.055) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />
            {/* Dot grid overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage: "radial-gradient(circle, #1A2B42 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative z-10 max-w-6xl mx-auto">

              {/* ── Top label ── */}
              <div className="flex items-center gap-3 mb-5">
                <div className="inline-flex items-center gap-2 bg-[#0B1623] border border-[#1A2B42] px-3.5 py-[5px] rounded-full">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-300" />
                  </span>
                  <span className="font-mono text-[10px] text-teal-300/80 tracking-[0.1em]">
                    {PROJECTS.length} Projects · $250+ in Prizes
                  </span>
                </div>
              </div>

              {/* ── Heading + description side by side on desktop ── */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
                <div>
                  <h1
                    id="projects-heading"
                    className="leading-[1.02] tracking-tight text-[#E2DDD5] mb-3"
                    style={{
                      fontFamily: "var(--syne-var)",
                      fontWeight: 800,
                      fontSize: "clamp(36px, 5.5vw, 60px)",
                    }}
                  >
                    My Work &amp;{" "}
                    <span
                      className="block"
                      style={{
                        background: "linear-gradient(135deg, #E2DDD5 0%, #8A857F 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Projects
                    </span>
                  </h1>
                  <p className="text-[13.5px] text-[#A5B0C0] leading-[1.8] max-w-[460px]">
                    Hackathon winners, blockchain apps, AI tools, and live client platforms.
                    Every project is shipped with clean code and a sharp purpose.
                  </p>
                </div>

                {/* ── Stats panel ── */}
                <div className="flex items-stretch gap-3 shrink-0">
                  {[
                    { value: `${PROJECTS.length}`, label: "Total",     color: "#5EEAD4" },
                    { value: `${hackathonCount}`,  label: "Hackathon", color: "#A78BFA" },
                    { value: `${clientCount}`,     label: "Client",    color: "#F472B6" },
                    { value: "$250+",              label: "Prizes",    color: "#FBBF24" },
                  ].map(({ value, label, color }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center justify-center px-4 py-3 rounded-xl border border-[#131C2E] bg-[#0B1623] min-w-[60px]"
                      style={{ borderTop: `2px solid ${color}25` }}
                    >
                      <span
                        className="text-[18px] font-extrabold leading-none mb-1"
                        style={{ fontFamily: "var(--syne-var)", color }}
                      >
                        {value}
                      </span>
                      <span className="font-mono text-[9px] text-[#3A4A5A] tracking-widest uppercase">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Filter tabs ── */}
              <div
                role="tablist"
                aria-label="Filter projects by category"
                className="flex items-center gap-2 flex-wrap"
              >
                {(
                  [
                    { key: "all",       label: "All Projects",       count: PROJECTS.length },
                    { key: "hackathon", label: "Hackathon & Bounty", count: hackathonCount },
                    { key: "client",    label: "Client Work",        count: clientCount },
                    { key: "personal",  label: "Personal",            count: personalCount },
                  ] as const
                ).map(({ key, label, count }) => (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={filter === key}
                    onClick={() => setFilter(key)}
                    className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-wide px-4 py-2 rounded-lg border transition-all duration-200 ${
                      filter === key
                        ? "bg-teal-300 text-[#070B14] border-teal-300 font-bold"
                        : "border-[#1A2B42] text-[#A5B0C0] hover:border-[#2A3B52] hover:text-[#C8C3BA] bg-transparent"
                    }`}
                  >
                    {label}
                    <span
                      className={`font-mono text-[9px] px-1.5 py-[2px] rounded-full leading-none ${
                        filter === key
                          ? "bg-[#070B14]/25 text-[#070B14]"
                          : "bg-[#0F1A28] text-[#4A5560]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── Divider ── */}
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="h-px bg-gradient-to-r from-transparent via-[#1A2B42] to-transparent" />
          </div>

          {/* ── Projects Grid ── */}
          <section
            className="px-6 md:px-10 pt-8 pb-20 max-w-6xl mx-auto"
            aria-label="Projects list"
          >
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              role="tabpanel"
            >
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* ── GitHub CTA ── */}
            <div className="mt-14 rounded-2xl border border-[#131C2E] bg-[#080D18] overflow-hidden">
              <div
                className="h-[2px]"
                style={{ background: "linear-gradient(to right, transparent, #5EEAD430, transparent)" }}
              />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6">
                <div>
                  <p className="font-mono text-[10px] text-[#3A4A5A] tracking-widest uppercase mb-1">
                    That&apos;s not everything
                  </p>
                  <h2
                    className="text-[18px] font-bold text-[#C8C3BA] mb-1"
                    style={{ fontFamily: "var(--syne-var)" }}
                  >
                    More experiments on GitHub
                  </h2>
                  <p className="text-[13px] text-[#A5B0C0] max-w-xs">
                    Explore all repositories, experiments, and open-source contributions.
                  </p>
                </div>
                <a
                  href="https://github.com/Nitrajsinh-Solanki"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--syne-var)" }}
                  className="inline-flex items-center gap-3 shrink-0 bg-[#0D1420] border border-[#1A2B42] text-[#C8C3BA] font-bold text-[13px] px-6 py-3 rounded-xl hover:border-teal-300/50 hover:text-teal-300 hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 group"
                >
                  <svg className="w-4 h-4 text-[#A5B0C0] group-hover:text-teal-300 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  Find More on GitHub
                  <svg className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer className="border-t border-[#0F1520] px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">
          <span className="font-mono text-[11px] text-[#2A2A28] tracking-widest">
            © {new Date().getFullYear()} Nitrajsinh Solanki
          </span>
          <div className="flex items-center gap-5 flex-wrap">
            {[
              { label: "GitHub", href: SOCIAL.github },
              { label: "LinkedIn", href: SOCIAL.linkedin },
              { label: "X", href: SOCIAL.x },
              { label: "Medium", href: SOCIAL.medium },
              { label: profile.email, href: "mailto:" + profile.email },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-mono text-[11px] text-[#94A3B8] hover:text-teal-300 transition-colors duration-200 tracking-wide"
              >
                {label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}