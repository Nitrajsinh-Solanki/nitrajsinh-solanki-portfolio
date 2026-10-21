// app/projects/[slug]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "../../components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { abs, SITE_URL, SITE_NAME, SOCIAL } from "@/lib/site";
import { PERSON_ID, breadcrumb } from "@/lib/schema";
import { notFound } from "next/navigation";
import { PROJECTS } from "../data";

// ─────────────────────────────────────────────
//  STATIC PARAMS — pre-render all project pages
// ─────────────────────────────────────────────
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

type ProjectRecord = (typeof PROJECTS)[number];
type RelatedCandidate = { project: ProjectRecord; score: number };

// Prefer underlinked projects among similarly relevant candidates so discovery
// does not leave a project such as HourBit without contextual inbound links.
const RELATED_PROJECTS_BY_SLUG = (() => {
  const related = new Map<string, ProjectRecord[]>(
    PROJECTS.map((project) => [project.slug, [] as ProjectRecord[]] as [string, ProjectRecord[]])
  );
  const inbound = new Map<string, number>(
    PROJECTS.map((project) => [project.slug, 0] as [string, number])
  );
  const candidates = new Map<string, RelatedCandidate[]>(
    PROJECTS.map((source) => [
      source.slug,
      PROJECTS
        .filter((candidate) => candidate.slug !== source.slug)
        .map((candidate) => ({
          project: candidate,
          score: (candidate.category === source.category ? 2 : 0)
            + candidate.tech.filter((technology) => source.tech.includes(technology)).length,
        })),
    ] as [string, RelatedCandidate[]])
  );

  for (let slot = 0; slot < 3; slot += 1) {
    for (const source of PROJECTS) {
      const selected = related.get(source.slug)!;
      const remaining = (candidates.get(source.slug) ?? [])
        .filter(({ project: candidate }) => !selected.some((item) => item.slug === candidate.slug))
        .sort((a, b) =>
          (inbound.get(a.project.slug) ?? 0) - (inbound.get(b.project.slug) ?? 0)
          || b.score - a.score
          || Number(a.project.id) - Number(b.project.id)
        );
      const next = remaining[0]?.project;
      if (next) {
        selected.push(next);
        inbound.set(next.slug, (inbound.get(next.slug) ?? 0) + 1);
      }
    }
  }

  return related;
})();

// ─────────────────────────────────────────────
//  PER-PROJECT SEO METADATA
// ─────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return { title: "Project Not Found", robots: { index: false } };
  const path = "/projects/" + project.slug;
  return pageMetadata({
    title: project.title,
    description: project.seoDescription,
    path,
    image: path + "/opengraph-image",
  });
}

// ─────────────────────────────────────────────
//  BADGE COLOR MAP
// ─────────────────────────────────────────────
const BADGE_STYLES: Record<string, string> = {
  teal: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  amber: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  violet: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  orange: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  blue: "bg-indigo-50 text-indigo-700 border border-indigo-200",
};

// ─────────────────────────────────────────────
//  LINK ICONS
// ─────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
function ExternalIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// ─────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prevProject  = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null;
  const nextProject  = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : null;
  const path = "/projects/" + project.slug;
  const live = project.links.find((link) => link.icon === "live")?.href;
  const GITHUB_REPO = /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/;
  const repoUrl = project.links.find(
    (link) => link.icon === "github" && GITHUB_REPO.test(link.href)
  )?.href;
  const displayUrl = (live ?? repoUrl ?? abs(path)).replace("https://", "").replace("http://", "");
  const related = RELATED_PROJECTS_BY_SLUG.get(project.slug) ?? [];
  const author = { "@type": "Person", "@id": PERSON_ID, name: SITE_NAME, url: SITE_URL };

  return (
    <>
      {/* JSON-LD */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            "@id": abs(path + "#app"),
            name: project.title,
            description: project.description,
            url: live ?? abs(path),
            mainEntityOfPage: abs(path),
            image: project.image ? abs(project.image) : undefined,
            applicationCategory: project.category === "client" ? "BusinessApplication" : "WebApplication",
            author,
            keywords: project.tech.join(", "),
            award: project.award
              ? project.award.prize + (project.award.place ? " " + project.award.place : "") + ", " + project.award.event
              : undefined,
          },
          repoUrl ? {
            "@type": "SoftwareSourceCode",
            name: project.title + " (source code)",
            codeRepository: repoUrl,
            programmingLanguage: project.languages,
            author,
          } : undefined,
        ].filter(Boolean),
      }} />
      <JsonLd data={breadcrumb([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: project.title, path },
      ])} />

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
                href="/projects"
                className="inline-flex items-center gap-2 font-mono text-[11px] text-[#555963] hover:text-indigo-600 tracking-[0.07em] uppercase transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                All Projects
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

        <main className="flex-1 pt-16">

          {/* ── HERO ── */}
          <section className="relative overflow-hidden">
            {/* Visual banner */}
            <div
              className="relative flex h-56 w-full items-center justify-center overflow-hidden sm:h-64 md:h-80"
              style={{
                background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`,
              }}
            >
              {/* Glow */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at center, ${project.accentColor}20 0%, transparent 65%)`,
                }}
              />
              {/* Screenshot placeholder frame */}
              <div
                className="relative z-10 w-[calc(100%-2rem)] min-w-0 max-w-[680px] overflow-hidden rounded-xl border shadow-2xl"
                style={{ borderColor: `${project.accentColor}20` }}
              >
                {/* Browser bar */}
                <div
                  className="flex min-w-0 items-center gap-2 px-3 sm:px-4 py-2.5 border-b"
                  style={{
                    background: `${project.gradientFrom}EE`,
                    borderColor: `${project.accentColor}18`,
                  }}
                >
                  <span className="w-3 h-3 rounded-full bg-[#C8C3BA] opacity-80" />
                  <span className="w-3 h-3 rounded-full bg-[#C8C3BA] opacity-80" />
                  <span className="w-3 h-3 rounded-full bg-[#C8C3BA] opacity-80" />
                  <div
                    className="ml-1 sm:ml-3 min-w-0 flex-1 h-5 rounded-md flex items-center px-2"
                    style={{ background: `${project.accentColor}10` }}
                  >
                    <span className="block min-w-0 max-w-full truncate font-mono text-[9px] opacity-70" style={{ color: project.accentColor }} title={displayUrl}>
                      {displayUrl}
                    </span>
                  </div>
                </div>
                {/* Screen area */}
                <div
                  className="h-40 md:h-52 flex flex-col items-center justify-center gap-3"
                  style={{ background: `${project.gradientFrom}CC` }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center border"
                    style={{
                      background: `${project.accentColor}12`,
                      borderColor: `${project.accentColor}30`,
                    }}
                  >
                    <svg
                      className="w-8 h-8"
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
                </div>
              </div>
            </div>

            {/* Project number badge */}
            <div className="absolute left-4 top-4 z-20 rounded-md border border-white/70 bg-[#F8F7F3]/90 px-2 py-1 font-mono text-[9px] tracking-widest text-[#555963] sm:left-6 sm:text-[10px]">
              {String(project.id).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </div>
          </section>

          {project.image && (
            <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 sm:pt-8 md:px-10">
              <Image src={project.image} alt={project.title + " screenshot"} width={1200} height={630}
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="rounded-xl border border-[#E3E0D8] w-full h-auto" priority />
            </div>
          )}

          {/* ── CONTENT ── */}
          <div className="mx-auto min-w-0 max-w-5xl px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:py-12">
            <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">

              {/* ── LEFT: Main content ── */}
              <div className="flex min-w-0 flex-col gap-8 sm:gap-10 lg:col-span-2">

                {/* Title block */}
                <div>
                  <span
                    className={`inline-block font-mono text-[10px] tracking-wide px-2.5 py-1 rounded-full mb-4 ${BADGE_STYLES[project.badgeColor]}`}
                  >
                    {project.badge}
                  </span>
                  <h1
                    className="text-[#17191D] leading-tight mb-4"
                    style={{
                      fontFamily: "var(--syne-var)",
                      fontWeight: 800,
                      fontSize: "clamp(26px, 4vw, 40px)",
                    }}
                  >
                    {project.title}
                  </h1>
                  <p className="text-[15px] text-[#555963] leading-[1.8]">
                    {project.longDescription}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {live && (
                      <a
                        href={live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-mono text-[11px] font-semibold tracking-wide text-white transition-colors hover:bg-indigo-700 sm:w-auto"
                      >
                        View Live Project
                        <ExternalIcon />
                      </a>
                    )}
                    {repoUrl && (
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#E3E0D8] bg-white px-4 py-3 font-mono text-[11px] font-semibold tracking-wide text-[#17191D] transition-colors hover:border-indigo-600 hover:text-indigo-600 sm:w-auto"
                      >
                        <GithubIcon />
                        View Source Code
                      </a>
                    )}
                  </div>

                  {/* Team note */}
                  {project.teamNote && (
                    <div className="mt-5 flex items-start gap-3 bg-[#FFFFFF] border border-[#E3E0D8] rounded-lg px-4 py-3">
                      <span className="text-indigo-600 mt-0.5 shrink-0" aria-hidden="true">👥</span>
                      <p className="font-mono text-[11px] text-[#555963] leading-[1.7]">
                        {project.teamNote}
                      </p>
                    </div>
                  )}
                </div>

                {/* Structured case study */}
                <section aria-labelledby="case-study-heading">
                  <h2
                    id="case-study-heading"
                    className="text-[13px] font-bold text-[#17191D] tracking-[0.08em] uppercase mb-5"
                    style={{ fontFamily: "var(--syne-var)" }}
                  >
                    Engineering Case Study
                  </h2>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {([
                      { label: "Challenge", value: project.caseStudy.challenge },
                      { label: "Approach", value: project.caseStudy.approach },
                      { label: "Contribution", value: project.caseStudy.contribution },
                      { label: "Outcome", value: project.caseStudy.outcome },
                    ]).map(({ label, value }) => (
                      <div
                        key={label}
                        className="rounded-xl border border-[#E3E0D8] bg-[#FFFFFF] p-4"
                      >
                        <dt className="font-mono text-[10px] text-indigo-600 uppercase tracking-[0.12em] mb-2">
                          {label}
                        </dt>
                        <dd className="text-[13px] text-[#555963] leading-[1.75]">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>

                {/* Features */}
                <div>
                  <h2
                    className="text-[13px] font-bold text-[#17191D] tracking-[0.08em] uppercase mb-5"
                    style={{ fontFamily: "var(--syne-var)" }}
                  >
                    Key Features
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: project.accentColor }}
                          aria-hidden="true"
                        />
                        <span className="text-[14px] text-[#555963] leading-[1.7]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h2
                    className="text-[13px] font-bold text-[#17191D] tracking-[0.08em] uppercase mb-5"
                    style={{ fontFamily: "var(--syne-var)" }}
                  >
                    Tech Stack
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] border px-3 py-1.5 rounded-lg transition-colors"
                        style={{
                          color: project.accentColor,
                          borderColor: `${project.accentColor}25`,
                          background: `${project.accentColor}08`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Sidebar ── */}
              <div className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-24 lg:self-start">

                {/* Links */}
                <div className="bg-[#FFFFFF] border border-[#E3E0D8] rounded-xl p-5">
                  <h2
                    className="text-[11px] font-bold text-[#17191D] tracking-[0.1em] uppercase mb-4"
                    style={{ fontFamily: "var(--syne-var)" }}
                  >
                    Links
                  </h2>
                  <div className="flex flex-col gap-2">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-h-10 min-w-0 items-center gap-3 rounded-lg px-2 py-2 text-[13px] text-[#555963] transition-colors hover:bg-[#F0EEE8] hover:text-indigo-600"
                      >
                        <span className="text-[#686D76] group-hover:text-indigo-600 transition-colors">
                          {link.icon === "github"   && <GithubIcon />}
                          {link.icon === "live"     && <ExternalIcon />}
                          {link.icon === "demo"     && <PlayIcon />}
                          {link.icon === "explorer" && <ExternalIcon />}
                        </span>
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Award info */}
                {project.award && (
                  <div className="bg-[#FFFFFF] border border-[#E3E0D8] rounded-xl p-5">
                    <h2
                      className="text-[11px] font-bold text-[#17191D] tracking-[0.1em] uppercase mb-4"
                      style={{ fontFamily: "var(--syne-var)" }}
                    >
                      Award
                    </h2>
                    <div className="flex flex-col gap-3">
                      <div>
                        <span className="font-mono text-[10px] text-[#686D76] uppercase tracking-wide">Prize</span>
                        <p className="text-[13px] text-indigo-600 font-bold mt-0.5" style={{ fontFamily: "var(--syne-var)" }}>
                          {project.award.prize}
                        </p>
                      </div>
                      {project.award.place && (
                        <div>
                          <span className="font-mono text-[10px] text-[#686D76] uppercase tracking-wide">Placement</span>
                          <p className="text-[13px] text-[#555963] mt-0.5">{project.award.place}</p>
                        </div>
                      )}
                      <div>
                        <span className="font-mono text-[10px] text-[#686D76] uppercase tracking-wide">Event</span>
                        <p className="text-[13px] text-[#555963] mt-0.5">{project.award.event}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Client info */}
                {project.client && (
                  <div className="bg-[#FFFFFF] border border-[#E3E0D8] rounded-xl p-5">
                    <h2
                      className="text-[11px] font-bold text-[#17191D] tracking-[0.1em] uppercase mb-4"
                      style={{ fontFamily: "var(--syne-var)" }}
                    >
                      Client
                    </h2>
                    <div className="flex flex-col gap-3">
                      <div>
                        <span className="font-mono text-[10px] text-[#686D76] uppercase tracking-wide">Business</span>
                        <p className="text-[13px] text-[#555963] mt-0.5">{project.client.name}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-[#686D76] uppercase tracking-wide">Location</span>
                        <p className="text-[13px] text-[#555963] mt-0.5">{project.client.location}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Category tag */}
                <div className="bg-[#FFFFFF] border border-[#E3E0D8] rounded-xl p-5">
                  <h2
                    className="text-[11px] font-bold text-[#17191D] tracking-[0.1em] uppercase mb-3"
                    style={{ fontFamily: "var(--syne-var)" }}
                  >
                    Type
                  </h2>
                  <span
                    className={`font-mono text-[11px] px-2.5 py-1 rounded-full ${BADGE_STYLES[project.badgeColor]}`}
                  >
                    {project.category === "hackathon" ? "Hackathon / Bounty" : project.category === "personal" ? "Personal Project" : "Client Project"}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Related projects ── */}
            {related.length > 0 && (
              <section aria-labelledby="related-projects" className="mt-10 border-t border-[#E3E0D8] pt-6 sm:mt-16 sm:pt-8">
                <h2 id="related-projects" className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#686D76]">
                  Related projects
                </h2>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {related.map((relatedProject) => (
                    <li key={relatedProject.slug}>
                      <Link href={`/projects/${relatedProject.slug}`} className="block h-full rounded-lg border border-[#E3E0D8] bg-white p-4 transition-colors hover:border-[#4F46E5]">
                        <span className="block text-sm font-semibold text-[#17191D]">{relatedProject.shortTitle}</span>
                        <span className="mt-1 block text-[12.5px] leading-snug text-[#555963]">{relatedProject.badge}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* ── Prev / Next navigation ── */}
            <div className="mt-10 grid grid-cols-1 gap-4 border-t border-[#E3E0D8] pt-6 sm:mt-16 sm:grid-cols-2 sm:pt-8">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#E3E0D8] bg-[#FFFFFF] p-4 transition-all duration-200 hover:border-[#4F46E5] sm:gap-4 sm:p-5"
                >
                  <svg className="w-4 h-4 text-[#686D76] group-hover:text-indigo-600 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[9px] text-[#686D76] uppercase tracking-widest mb-0.5">Previous</span>
                    <span className="text-[13px] text-[#686D76] group-hover:text-[#17191D] transition-colors truncate" style={{ fontFamily: "var(--syne-var)" }}>
                      {prevProject.shortTitle}
                    </span>
                  </div>
                </Link>
              ) : <div />}

              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group flex min-w-0 items-center justify-end gap-3 rounded-xl border border-[#E3E0D8] bg-[#FFFFFF] p-4 text-right transition-all duration-200 hover:border-[#4F46E5] sm:gap-4 sm:p-5"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[9px] text-[#686D76] uppercase tracking-widest mb-0.5">Next</span>
                    <span className="text-[13px] text-[#686D76] group-hover:text-[#17191D] transition-colors truncate" style={{ fontFamily: "var(--syne-var)" }}>
                      {nextProject.shortTitle}
                    </span>
                  </div>
                  <svg className="w-4 h-4 text-[#686D76] group-hover:text-indigo-600 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : <div />}
            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="flex flex-col flex-wrap items-center justify-between gap-4 border-t border-[#E3E0D8] px-4 py-7 sm:flex-row sm:px-8 md:px-12">
          <span className="font-mono text-[11px] text-[#686D76] tracking-widest">
            © {new Date().getFullYear()} Nitrajsinh Solanki
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:justify-end sm:gap-6">
            {[
              { label: "About", href: "/about" },
              { label: "Resume", href: "/resume" },
              { label: "All Projects", href: "/projects" },
              { label: "GitHub", href: SOCIAL.github },
              { label: "LinkedIn", href: SOCIAL.linkedin },
              { label: "X", href: SOCIAL.x },
              { label: "Medium", href: SOCIAL.medium },
              { label: "nrsolanki2005@gmail.com", href: "mailto:nrsolanki2005@gmail.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-mono text-[11.5px] text-[#555963] hover:text-indigo-600 transition-colors duration-200 tracking-wide"
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