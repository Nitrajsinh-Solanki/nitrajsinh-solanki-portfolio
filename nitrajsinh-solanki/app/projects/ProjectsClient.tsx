// app/projects/ProjectsClient.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
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
// ──────────────────────────────────────────────
//  BADGE STYLES
// ──────────────────────────────────────────────
const BADGE_STYLES: Record<string, string> = {
  teal: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  amber: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  violet: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  orange: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  blue: "bg-indigo-50 text-indigo-700 border border-indigo-200",
};

// ──────────────────────────────────────────────
//  PROJECT CARD
// ──────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E3E0D8] bg-[#FFFFFF] transition-all duration-300 hover:-translate-y-1 hover:border-[#4F46E5] hover:shadow-[0_8px_40px_rgba(79,70,229,0.05)]"
    >
      {/* ── Visual Area ── */}
      <div
        className="relative flex h-36 w-full min-w-0 items-center justify-center overflow-hidden sm:h-40"
        style={{
          background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`,
        }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${project.accentColor}18 0%, transparent 70%)`,
          }}
        />
        {/* Browser chrome */}
        <div className="absolute top-3 left-4 flex items-center gap-[5px] z-10">
          <span className="w-2 h-2 rounded-full bg-[#C8C3BA] opacity-70" />
          <span className="w-2 h-2 rounded-full bg-[#C8C3BA] opacity-70" />
          <span className="w-2 h-2 rounded-full bg-[#C8C3BA] opacity-70" />
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
            {project.category === "client" ? "Client Project" : project.category === "personal" ? "Personal Project" : "Hackathon / Bounty"}
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        {/* Badge */}
        <span
          className={`self-start font-mono text-[10px] tracking-wide px-2.5 py-[3px] rounded-full mb-3 ${BADGE_STYLES[project.badgeColor]}`}
        >
          {project.badge}
        </span>

        {/* Title */}
        <h2
          className="mb-2 text-base font-bold leading-snug text-[#17191D] transition-colors group-hover:text-[#17191D] sm:text-[15px]"
          style={{ fontFamily: "var(--syne-var)" }}
        >
          {project.title}
        </h2>

        {/* Description */}
        <p
          className="mb-4 min-w-0 flex-1 text-sm leading-[1.75] text-[#555963]"
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] text-[#555963] border border-[#E3E0D8] bg-[#FFFFFF] px-2 py-[3px] rounded"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="font-mono text-[10px] text-[#686D76] px-2 py-[3px]">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex min-w-0 items-center gap-2 border-t border-[#E3E0D8] pt-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-10 min-w-0 flex-1 items-center justify-center rounded-lg border border-indigo-600/20 bg-indigo-600/10 px-3 py-2.5 text-center font-mono text-[11px] tracking-wide text-indigo-600 transition-all duration-200 hover:bg-indigo-600 hover:text-white"
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
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E3E0D8] transition-all duration-200 hover:border-[#4F46E5] hover:bg-[#F0EEE8]"
            >
              <svg className="w-3.5 h-3.5 text-[#555963]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E3E0D8] transition-all duration-200 hover:border-indigo-600/30 hover:bg-[#F0EEE8]"
            >
              <svg className="w-3.5 h-3.5 text-[#555963]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
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
export default function ProjectsClient({ projects: PROJECTS }: { projects: Project[] }) {
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

      <div className="flex flex-col min-h-screen bg-[#F8F7F3]">

        {/* ── Navbar ── */}
        <nav className="fixed top-0 inset-x-0 z-50 bg-[#F8F7F3]/92 backdrop-blur-xl border-b border-[#E3E0D8]">
          <div className="max-w-6xl mx-auto h-16 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-10">
            <Link
              href="/"
              style={{ fontFamily: "var(--syne-var)" }}
              className="font-extrabold text-xl tracking-tight text-[#17191D] select-none"
            >
              NS<span className="text-indigo-600">.</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#555963] hover:text-[#555963] tracking-[0.07em] uppercase transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back Home
              </Link>
              <a
                href="mailto:nrsolanki2005@gmail.com"
                className="hidden sm:inline-block font-mono text-[11px] text-indigo-600 border border-indigo-600/60 px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition-all duration-200 tracking-widest"
              >
                Hire Me
              </a>
            </div>
          </div>
        </nav>

        <main className="flex-1 pt-16" id="main-content">

          {/* ── Page Header ── */}
          <section
            className="relative overflow-hidden px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-12 md:px-10 lg:pt-14"
            aria-labelledby="projects-heading"
          >
            <div className="relative z-10 max-w-6xl mx-auto">

              {/* ── Top label ── */}
              <div className="flex items-center gap-3 mb-5">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#E3E0D8] bg-[#FFFFFF] px-2.5 py-1.5 sm:px-3.5 sm:py-[5px]">
                  <span className="inline-flex rounded-full h-1.5 w-1.5 bg-indigo-600" aria-hidden="true" />
                  <span className="font-mono text-[9px] tracking-[0.06em] text-indigo-700 sm:text-[10px] sm:tracking-[0.1em]">
                    {PROJECTS.length} Projects · $250+ in Prizes
                  </span>
                </div>
              </div>

              {/* ── Heading + description side by side on desktop ── */}
              <div className="mb-7 flex min-w-0 flex-col gap-6 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h1
                    id="projects-heading"
                    className="leading-[1.02] tracking-tight text-[#17191D] mb-3"
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
                        background: "linear-gradient(135deg, #17191D 0%, #555963 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Projects
                    </span>
                  </h1>
                  <p className="text-[14.5px] text-[#555963] leading-[1.75] max-w-[460px]">
                    Hackathon winners, blockchain apps, AI tools, and live client platforms.
                    Every project is shipped with clean code and a sharp purpose.
                  </p>
                </div>

                {/* ── Stats panel ── */}
                <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 lg:flex lg:w-auto lg:shrink-0">
                  {[
                    { value: `${PROJECTS.length}`, label: "Total",     color: "#4F46E5" },
                    { value: `${hackathonCount}`,  label: "Hackathon", color: "#4F46E5" },
                    { value: `${clientCount}`,     label: "Client",    color: "#4F46E5" },
                    { value: "$250+",              label: "Prizes",    color: "#4F46E5" },
                  ].map(({ value, label, color }) => (
                    <div
                      key={label}
                      className="flex min-w-0 flex-col items-center justify-center px-2 sm:px-4 py-3 rounded-xl border border-[#E3E0D8] bg-[#FFFFFF] lg:min-w-[60px]"
                      style={{ borderTop: `2px solid ${color}25` }}
                    >
                      <span
                        className="text-[18px] font-extrabold leading-none mb-1"
                        style={{ fontFamily: "var(--syne-var)", color }}
                      >
                        {value}
                      </span>
                      <span className="font-mono text-[9px] text-[#686D76] tracking-widest uppercase">
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
                className="flex flex-wrap items-center gap-2"
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
                    aria-controls="projects-panel"
                    id={`filter-${key}`}
                    onClick={() => setFilter(key)}
                    className={`inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2.5 font-mono text-[10px] tracking-wide transition-all duration-200 sm:px-4 sm:text-[11px] ${
                      filter === key
                        ? "bg-indigo-600 text-white border-indigo-600 font-bold"
                        : "border-[#E3E0D8] text-[#555963] hover:border-[#E3E0D8] hover:text-[#555963] bg-transparent"
                    }`}
                  >
                    {label}
                    <span
                      className={`font-mono text-[9px] px-1.5 py-[2px] rounded-full leading-none ${
                        filter === key
                          ? "bg-[#F8F7F3]/25 text-white"
                          : "bg-[#F0EEE8] text-[#555963]"
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="h-px bg-gradient-to-r from-transparent via-[#E3E0D8] to-transparent" />
          </div>

          {/* ── Projects Grid ── */}
          <section
            className="mx-auto max-w-6xl px-4 pb-14 pt-7 sm:px-6 sm:pb-20 sm:pt-8 md:px-10"
            aria-label="Projects list"
          >
            <div
              className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
              id="projects-panel"
              role="tabpanel"
              tabIndex={0}
              aria-live="polite"
            >
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* ── GitHub CTA ── */}
            <div className="mt-14 rounded-2xl border border-[#E3E0D8] bg-[#FFFFFF] overflow-hidden">
              <div
                className="h-[2px]"
                style={{ background: "linear-gradient(to right, transparent, #4F46E530, transparent)" }}
              />
              <div className="flex flex-col items-stretch justify-between gap-5 px-4 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-6">
                <div>
                  <p className="font-mono text-[10px] text-[#686D76] tracking-widest uppercase mb-1">
                    That&apos;s not everything
                  </p>
                  <h2
                    className="text-[18px] font-bold text-[#555963] mb-1"
                    style={{ fontFamily: "var(--syne-var)" }}
                  >
                    More experiments on GitHub
                  </h2>
                  <p className="text-[13px] text-[#555963] max-w-xs">
                    Explore all repositories, experiments, and open-source contributions.
                  </p>
                </div>
                <a
                  href="https://github.com/Nitrajsinh-Solanki"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--syne-var)" }}
                  className="inline-flex w-full items-center justify-center gap-3 bg-[#F0EEE8] sm:w-auto sm:shrink-0 border border-[#E3E0D8] text-[#555963] font-bold text-[13px] px-6 py-3 rounded-xl hover:border-indigo-600/50 hover:text-indigo-600 hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 group"
                >
                  <svg className="w-4 h-4 text-[#555963] group-hover:text-indigo-600 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
        <footer className="flex flex-col flex-wrap items-center justify-between gap-3 border-t border-[#E3E0D8] px-4 py-6 sm:flex-row sm:px-6 md:px-10">
          <span className="font-mono text-[11px] text-[#686D76] tracking-widest">
            © {new Date().getFullYear()} Nitrajsinh Solanki
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:justify-end sm:gap-5">
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
                className="font-mono text-[11px] text-[#686D76] hover:text-indigo-600 transition-colors duration-200 tracking-wide"
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