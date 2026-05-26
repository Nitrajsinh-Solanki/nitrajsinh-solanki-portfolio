// app/projects/[slug]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "../data";

// ─────────────────────────────────────────────
//  STATIC PARAMS — pre-render all 10 pages
// ─────────────────────────────────────────────
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

// ─────────────────────────────────────────────
//  PER-PROJECT SEO METADATA
// ─────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Nitrajsinh Solanki`,
    description: project.description,
    keywords: [
      project.title,
      "Nitrajsinh Solanki",
      ...project.tech,
      "portfolio project",
      "full-stack developer India",
    ],
    openGraph: {
      title: `${project.title} — Nitrajsinh Solanki`,
      description: project.description,
      url: `https://nitrajsinh-solanki.vercel.app/projects/${project.slug}`,
      siteName: "Nitrajsinh Solanki Portfolio",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Nitrajsinh Solanki`,
      description: project.description,
      creator: "@Nitrajsinh2005",
    },
    alternates: {
      canonical: `https://nitrajsinh-solanki.vercel.app/projects/${project.slug}`,
    },
  };
}

// ─────────────────────────────────────────────
//  BADGE COLOR MAP
// ─────────────────────────────────────────────
const BADGE_STYLES: Record<string, string> = {
  teal:   "bg-teal-400/10 text-teal-300 border border-teal-400/20",
  amber:  "bg-amber-400/10 text-amber-300 border border-amber-400/20",
  violet: "bg-violet-400/10 text-violet-300 border border-violet-400/20",
  orange: "bg-orange-400/10 text-orange-300 border border-orange-400/20",
  blue:   "bg-blue-400/10 text-blue-300 border border-blue-400/20",
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

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: project.title,
            description: project.description,
            author: {
              "@type": "Person",
              name: "Nitrajsinh Solanki",
              url: "https://nitrajsinh-solanki.vercel.app",
            },
            applicationCategory: project.category === "client" ? "BusinessApplication" : "WebApplication",
            url: project.links.find((l) => l.icon === "live")?.href,
            codeRepository: project.links.find((l) => l.icon === "github")?.href,
          }),
        }}
      />

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
                href="/projects"
                className="inline-flex items-center gap-2 font-mono text-[11px] text-[#6A6560] hover:text-teal-300 tracking-[0.07em] uppercase transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                All Projects
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

        <main className="flex-1 pt-16">

          {/* ── HERO ── */}
          <section className="relative overflow-hidden">
            {/* Visual banner */}
            <div
              className="relative h-64 md:h-80 w-full flex items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`,
              }}
            >
              {/* Dot grid */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: "radial-gradient(circle, #1A2B42 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Glow */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at center, ${project.accentColor}20 0%, transparent 65%)`,
                }}
              />
              {/* Screenshot placeholder frame */}
              <div
                className="relative z-10 w-[min(680px,88vw)] rounded-xl border overflow-hidden shadow-2xl"
                style={{ borderColor: `${project.accentColor}20` }}
              >
                {/* Browser bar */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5 border-b"
                  style={{
                    background: `${project.gradientFrom}EE`,
                    borderColor: `${project.accentColor}18`,
                  }}
                >
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E] opacity-80" />
                  <span className="w-3 h-3 rounded-full bg-[#27C840] opacity-80" />
                  <div
                    className="ml-3 flex-1 h-5 rounded-md flex items-center px-2"
                    style={{ background: `${project.accentColor}10` }}
                  >
                    <span className="font-mono text-[9px] opacity-30" style={{ color: project.accentColor }}>
                      {project.links.find((l) => l.icon === "live")?.href ?? `localhost:3000`}
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
                  <span
                    className="font-mono text-[10px] tracking-[0.15em] uppercase opacity-40"
                    style={{ color: project.accentColor }}
                  >
                    Screenshot coming soon
                  </span>
                </div>
              </div>
            </div>

            {/* Project number badge */}
            <div className="absolute top-4 left-6 font-mono text-[10px] text-[#2A3A4A] tracking-widest">
              {String(project.id).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </div>
          </section>

          {/* ── CONTENT ── */}
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* ── LEFT: Main content ── */}
              <div className="lg:col-span-2 flex flex-col gap-10">

                {/* Title block */}
                <div>
                  <span
                    className={`inline-block font-mono text-[10px] tracking-wide px-2.5 py-1 rounded-full mb-4 ${BADGE_STYLES[project.badgeColor]}`}
                  >
                    {project.badge}
                  </span>
                  <h1
                    className="text-[#E2DDD5] leading-tight mb-4"
                    style={{
                      fontFamily: "var(--syne-var)",
                      fontWeight: 800,
                      fontSize: "clamp(26px, 4vw, 40px)",
                    }}
                  >
                    {project.title}
                  </h1>
                  <p className="text-[15px] text-[#7A7570] leading-[1.8]">
                    {project.longDescription}
                  </p>

                  {/* Team note */}
                  {project.teamNote && (
                    <div className="mt-5 flex items-start gap-3 bg-[#080D18] border border-[#131C2E] rounded-lg px-4 py-3">
                      <span className="text-teal-300 mt-0.5 shrink-0" aria-hidden="true">👥</span>
                      <p className="font-mono text-[11px] text-[#5A5A60] leading-[1.7]">
                        {project.teamNote}
                      </p>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div>
                  <h2
                    className="text-[13px] font-bold text-[#E2DDD5] tracking-[0.08em] uppercase mb-5"
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
                        <span className="text-[14px] text-[#6A6560] leading-[1.7]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h2
                    className="text-[13px] font-bold text-[#E2DDD5] tracking-[0.08em] uppercase mb-5"
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
              <div className="flex flex-col gap-6">

                {/* Links */}
                <div className="bg-[#080D18] border border-[#131C2E] rounded-xl p-5">
                  <h2
                    className="text-[11px] font-bold text-[#E2DDD5] tracking-[0.1em] uppercase mb-4"
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
                        className="flex items-center gap-3 text-[13px] text-[#6A6560] hover:text-teal-300 transition-colors group py-1"
                      >
                        <span className="text-[#3A3A40] group-hover:text-teal-300 transition-colors">
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
                  <div className="bg-[#080D18] border border-[#131C2E] rounded-xl p-5">
                    <h2
                      className="text-[11px] font-bold text-[#E2DDD5] tracking-[0.1em] uppercase mb-4"
                      style={{ fontFamily: "var(--syne-var)" }}
                    >
                      Award
                    </h2>
                    <div className="flex flex-col gap-3">
                      <div>
                        <span className="font-mono text-[10px] text-[#4A4540] uppercase tracking-wide">Prize</span>
                        <p className="text-[13px] text-teal-300 font-bold mt-0.5" style={{ fontFamily: "var(--syne-var)" }}>
                          {project.award.prize}
                        </p>
                      </div>
                      {project.award.place && (
                        <div>
                          <span className="font-mono text-[10px] text-[#4A4540] uppercase tracking-wide">Placement</span>
                          <p className="text-[13px] text-[#C8C3BA] mt-0.5">{project.award.place}</p>
                        </div>
                      )}
                      <div>
                        <span className="font-mono text-[10px] text-[#4A4540] uppercase tracking-wide">Event</span>
                        <p className="text-[13px] text-[#C8C3BA] mt-0.5">{project.award.event}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Client info */}
                {project.client && (
                  <div className="bg-[#080D18] border border-[#131C2E] rounded-xl p-5">
                    <h2
                      className="text-[11px] font-bold text-[#E2DDD5] tracking-[0.1em] uppercase mb-4"
                      style={{ fontFamily: "var(--syne-var)" }}
                    >
                      Client
                    </h2>
                    <div className="flex flex-col gap-3">
                      <div>
                        <span className="font-mono text-[10px] text-[#4A4540] uppercase tracking-wide">Business</span>
                        <p className="text-[13px] text-[#C8C3BA] mt-0.5">{project.client.name}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-[#4A4540] uppercase tracking-wide">Location</span>
                        <p className="text-[13px] text-[#C8C3BA] mt-0.5">{project.client.location}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Category tag */}
                <div className="bg-[#080D18] border border-[#131C2E] rounded-xl p-5">
                  <h2
                    className="text-[11px] font-bold text-[#E2DDD5] tracking-[0.1em] uppercase mb-3"
                    style={{ fontFamily: "var(--syne-var)" }}
                  >
                    Type
                  </h2>
                  <span
                    className={`font-mono text-[11px] px-2.5 py-1 rounded-full ${BADGE_STYLES[project.badgeColor]}`}
                  >
                    {project.category === "hackathon" ? "Hackathon / Bounty" : "Client Project"}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Prev / Next navigation ── */}
            <div className="mt-16 pt-8 border-t border-[#0F1620] grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group flex items-center gap-4 bg-[#080D18] border border-[#131C2E] rounded-xl p-5 hover:border-[#1F3050] transition-all duration-200"
                >
                  <svg className="w-4 h-4 text-[#3A3A40] group-hover:text-teal-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[9px] text-[#3A3A40] uppercase tracking-widest mb-0.5">Previous</span>
                    <span className="text-[13px] text-[#9A9585] group-hover:text-[#E2DDD5] transition-colors truncate" style={{ fontFamily: "var(--syne-var)" }}>
                      {prevProject.shortTitle}
                    </span>
                  </div>
                </Link>
              ) : <div />}

              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group flex items-center justify-end gap-4 bg-[#080D18] border border-[#131C2E] rounded-xl p-5 hover:border-[#1F3050] transition-all duration-200 text-right"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[9px] text-[#3A3A40] uppercase tracking-widest mb-0.5">Next</span>
                    <span className="text-[13px] text-[#9A9585] group-hover:text-[#E2DDD5] transition-colors truncate" style={{ fontFamily: "var(--syne-var)" }}>
                      {nextProject.shortTitle}
                    </span>
                  </div>
                  <svg className="w-4 h-4 text-[#3A3A40] group-hover:text-teal-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : <div />}
            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="border-t border-[#111A28] px-8 md:px-12 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
          <span className="font-mono text-[11px] text-[#3A3530] tracking-widest">
            © {new Date().getFullYear()} Nitrajsinh Solanki
          </span>
          <div className="flex items-center gap-6 flex-wrap">
            {[
              { label: "GitHub",  href: "https://github.com/Nitrajsinh-Solanki" },
              { label: "Twitter", href: "https://twitter.com/Nitrajsinh2005" },
              { label: "nrsolanki2005@gmail.com", href: "mailto:nrsolanki2005@gmail.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-mono text-[11.5px] text-[#5A5450] hover:text-teal-300 transition-colors duration-200 tracking-wide"
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