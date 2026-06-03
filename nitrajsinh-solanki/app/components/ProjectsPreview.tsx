// nitrajsinh-solanki/app/components/ProjectsPreview.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────── types ─────────────────────────── */

type BadgeColor = "teal" | "amber" | "violet" | "orange" | "blue";

interface PreviewProject {
  id: string;
  slug: string;
  shortTitle: string;
  badge: string;
  badgeColor: BadgeColor;
  description: string;
  tech: string[];
  accentColor: string;
  gradientFrom: string;
  iconPath: string;
  live?: string;
  highlight?: string; // what makes it special (shown as a stat/callout)
}

/* ─────────────────────────── data ──────────────────────────── */

// Only the top 3 featured projects
const FEATURED: PreviewProject[] = [
  {
    id: "1",
    slug: "library-inventory-system",
    shortTitle: "Library Inventory System",
    badge: "🏆 $90 · 3rd Place",
    badgeColor: "teal",
    description:
      "Full-featured library management with 3 user roles, AI-generated book descriptions, borrowing workflows & automated fine tracking.",
    tech: ["Next.js", "MongoDB", "Gemini AI", "NextAuth"],
    accentColor: "#5EEAD4",
    gradientFrom: "#0A2540",
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    highlight: "3 user roles · AI-powered",
  },
  {
    id: "2",
    slug: "biomap",
    shortTitle: "BioMap",
    badge: "🏆 $70 · 4th Place",
    badgeColor: "teal",
    description:
      "Scientific platform unifying biodiversity maps, NASA media, chemistry data & educational resources via 6 external APIs.",
    tech: ["Next.js 14", "Leaflet", "GBIF API", "MongoDB"],
    accentColor: "#34D399",
    gradientFrom: "#051A10",
    iconPath:
      "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    live: "https://biomap-nitrajsinh-solankis-projects.vercel.app",
    highlight: "6 APIs integrated",
  },
  {
    id: "3",
    slug: "nft-marketplace-aptos",
    shortTitle: "Aptos NFT Marketplace",
    badge: "💰 $60 Bounty",
    badgeColor: "violet",
    description:
      "On-chain NFT marketplace with auctions, royalties, batch transfers & APT payments via Move smart contracts on Aptos blockchain.",
    tech: ["Aptos Blockchain", "Move", "React", "Petra Wallet"],
    accentColor: "#A78BFA",
    gradientFrom: "#120A30",
    iconPath:
      "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    highlight: "Move smart contracts",
  },
];

/* ──────────────── badge colour map ────────────────────────── */

const BADGE: Record<BadgeColor, string> = {
  teal:   "text-teal-300   border-teal-300/25   bg-teal-300/5",
  amber:  "text-amber-300  border-amber-300/25  bg-amber-300/5",
  violet: "text-violet-300 border-violet-300/25 bg-violet-300/5",
  orange: "text-orange-300 border-orange-300/25 bg-orange-300/5",
  blue:   "text-blue-300   border-blue-300/25   bg-blue-300/5",
};

/* ──────────────── intersection hook ───────────────────────── */

function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────────── main component ───────────────────── */

export default function ProjectsPreview() {
  const header = useReveal(0.05);
  const stats  = useReveal(0.1);

  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 px-6 md:px-10 overflow-hidden"
    >
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[8%] left-[-6%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(94,234,212,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[5%] right-[-4%] w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div
          ref={header.ref}
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
          }}
        >
          {/* Label row */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[11px] text-teal-300 tracking-[0.18em] uppercase select-none">
              // projects
            </span>
            <span
              className="flex-1 h-[1px]"
              style={{ background: "linear-gradient(to right, #1A2B42, transparent)" }}
            />
          </div>

          {/* Heading + sub + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-6">
            <div>
              <h2
                className="leading-[1.05] tracking-tight text-[#E2DDD5]"
                style={{
                  fontFamily: "var(--syne-var)",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 4.8vw, 48px)",
                }}
              >
                Things I&apos;ve{" "}
                <span className="text-teal-300">shipped.</span>
              </h2>
              <p className="font-mono text-[11.5px] text-[#4A6070] tracking-wide mt-2">
                11 projects — hackathons, bounties &amp; live client products.{" "}
                <span className="text-teal-300/70">$250+ won.</span>
              </p>
            </div>

            {/* Desktop "View all" */}
            <Link
              href="/projects"
              style={{ fontFamily: "var(--syne-var)" }}
              className="hidden sm:inline-flex items-center gap-2 shrink-0 border border-[#1F2E42] text-[#9A9585] font-medium text-sm px-5 py-2.5 rounded-lg hover:border-teal-300/60 hover:text-teal-300 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200"
            >
              View all 11 projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Stats strip */}
          <div
            ref={stats.ref}
            className="grid grid-cols-3 gap-3 mb-12"
            style={{
              opacity: stats.visible ? 1 : 0,
              transform: stats.visible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s 0.15s ease, transform 0.5s 0.15s ease",
            }}
          >
            {[
              { value: "11",   label: "Projects Built",    color: "#5EEAD4" },
              { value: "$250+", label: "Hackathon Prizes",  color: "#F472B6" },
              { value: "7",    label: "Live in Production", color: "#A78BFA" },
            ].map(({ value, label, color }) => (
              <div
                key={label}
                className="rounded-xl border border-[#131C2E] bg-[#0B1623] px-4 py-3 text-center"
                style={{ borderTop: `2px solid ${color}30` }}
              >
                <div
                  className="text-xl font-extrabold tracking-tight mb-0.5"
                  style={{ fontFamily: "var(--syne-var)", color }}
                >
                  {value}
                </div>
                <div className="font-mono text-[10px] text-[#3A5060] tracking-wide">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Featured cards — horizontal on desktop ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURED.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <MoreProjectsCTA />
      </div>
    </section>
  );
}

/* ─────────────────────── featured card ─────────────────────── */

function FeaturedCard({ project, index }: { project: PreviewProject; index: number }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>(0.08);
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      ref={ref}
      href={`/projects/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-[#131C2E] bg-[#0B1623] transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : "translateY(28px)",
        transition: `opacity 0.5s ${index * 0.1}s ease, transform 0.4s ease, border-color 0.25s ease, box-shadow 0.3s ease`,
        borderColor: hovered ? `${project.accentColor}30` : undefined,
        boxShadow: hovered ? `0 16px 40px -12px ${project.accentColor}18` : undefined,
      }}
    >
      {/* Top gradient strip */}
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(to right, ${project.gradientFrom}, ${project.accentColor}80, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle background glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-400"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${project.accentColor}07 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col flex-1 p-6">

        {/* Top row: icon + badge */}
        <div className="flex items-start justify-between gap-3 mb-5">
          {/* Icon */}
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `${project.accentColor}12`,
              border: `1px solid ${project.accentColor}30`,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={project.accentColor}
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={project.iconPath} />
            </svg>
          </div>

          {/* Badge */}
          <span
            className={`font-mono text-[9.5px] tracking-wide px-2 py-1 rounded-full border whitespace-nowrap ${BADGE[project.badgeColor]}`}
          >
            {project.badge}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-[#E2DDD5] text-[15px] leading-snug mb-2.5 transition-colors duration-200"
          style={{
            fontFamily: "var(--syne-var)",
            fontWeight: 700,
            color: hovered ? project.accentColor : undefined,
          }}
        >
          {project.shortTitle}
        </h3>

        {/* Description */}
        <p className="text-[12.5px] text-[#524E4A] leading-[1.75] mb-5 flex-1">
          {project.description}
        </p>

        {/* Highlight callout */}
        {project.highlight && (
          <div
            className="flex items-center gap-1.5 mb-4 font-mono text-[10px] tracking-wide"
            style={{ color: `${project.accentColor}90` }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: project.accentColor, opacity: 0.6 }}
            />
            {project.highlight}
          </div>
        )}

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-[3px] rounded"
              style={{
                background: "rgba(26,43,66,0.7)",
                border: "1px solid #1A2B42",
                color: "#6A9BAF",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#0F1820]">
          {project.live ? (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); window.open(project.live, "_blank", "noopener,noreferrer"); }}
              className="font-mono text-[9.5px] tracking-wide flex items-center gap-1.5 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: project.accentColor, opacity: 0.75 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: project.accentColor }}
              />
              Live
            </button>
          ) : (
            <span className="font-mono text-[9.5px] text-[#2A3A4A] tracking-wide">
              View details
            </span>
          )}

          <span
            className="transition-all duration-200 group-hover:translate-x-1"
            style={{ color: hovered ? project.accentColor : "#2A3A4A" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────── "more projects" CTA strip ────────────────── */

function MoreProjectsCTA() {
  const { ref, visible } = useReveal(0.1);

  return (
    <div
      ref={ref}
      className="mt-10 rounded-2xl border border-[#131C2E] bg-[#0B1623] overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.55s 0.2s ease, transform 0.55s 0.2s ease",
      }}
    >
      {/* Top gradient bar */}
      <div
        className="h-[2px] w-full"
        style={{
          background: "linear-gradient(to right, transparent, #5EEAD430, #A78BFA30, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-7 py-6">

        {/* Left — text */}
        <div>
          <p
            className="text-[#E2DDD5] text-[15px] font-semibold mb-1"
            style={{ fontFamily: "var(--syne-var)" }}
          >
            Showing 3 of 11 projects
          </p>
          <p className="font-mono text-[11px] text-[#3A5060] tracking-wide">
            8 more — including HourBit productivity suite, Flutter app, Rust server &amp; live client sites.
          </p>
        </div>

        {/* Right — CTA buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Ghost pills showing what's coming */}
          <div className="hidden md:flex items-center gap-2">
            {["HourBit", "Flutter", "Rust"].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9.5px] px-2.5 py-1 rounded-full border tracking-wide"
                style={{
                  background: "rgba(26,43,66,0.5)",
                  border: "1px solid #1A2B42",
                  color: "#4A6070",
                }}
              >
                {tag}
              </span>
            ))}
            <span className="font-mono text-[10px] text-[#2A3A4A]">+5 more</span>
          </div>

          <Link
            href="/projects"
            style={{ fontFamily: "var(--syne-var)" }}
            className="inline-flex items-center gap-2 bg-teal-300/10 border border-teal-300/30 text-teal-300 font-semibold text-[13px] px-5 py-2.5 rounded-lg hover:bg-teal-300/20 hover:border-teal-300/60 hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 tracking-wide"
          >
            All Projects
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}