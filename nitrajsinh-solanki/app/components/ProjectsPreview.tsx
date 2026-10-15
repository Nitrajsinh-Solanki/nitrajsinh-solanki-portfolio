// nitrajsinh-solanki/app/components/ProjectsPreview.tsx
"use client";

import { STATS } from "../projects/stats";

import Link from "next/link";
import { useState } from "react";

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
    accentColor: "#4F46E5",
    gradientFrom: "#F0EEE8",
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
    accentColor: "#4F46E5",
    gradientFrom: "#F0EEE8",
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
    accentColor: "#4F46E5",
    gradientFrom: "#F0EEE8",
    iconPath:
      "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    highlight: "Move smart contracts",
  },
];

/* ──────────────── badge colour map ────────────────────────── */

const BADGE: Record<BadgeColor, string> = {
  teal:   "text-indigo-700 border-indigo-700/25 bg-indigo-700/5",
  amber:  "text-indigo-700  border-indigo-700/25  bg-indigo-700/5",
  violet: "text-indigo-700 border-indigo-700/25 bg-indigo-700/5",
  orange: "text-indigo-700 border-indigo-700/25 bg-indigo-700/5",
  blue:   "text-indigo-700   border-indigo-700/25   bg-indigo-700/5",
};

/* ─────────────────────── main component ───────────────────── */

export default function ProjectsPreview() {
  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 px-6 md:px-10 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div>
          {/* Label row */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-sans text-[11px] font-semibold text-indigo-700 tracking-[0.14em] uppercase select-none">
              Selected work
            </span>
            <span
              className="flex-1 h-[1px]"
              style={{ background: "linear-gradient(to right, #E3E0D8, transparent)" }}
            />
          </div>

          {/* Heading + sub + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-6">
            <div>
              <h2
                className="leading-[1.05] tracking-tight text-[#17191D]"
                style={{
                  fontFamily: "var(--syne-var)",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 4.8vw, 48px)",
                }}
              >
                Things I&apos;ve{" "}
                <span className="text-indigo-600">shipped.</span>
              </h2>
              <p className="font-mono text-[11.5px] text-[#686D76] tracking-wide mt-2">
                {STATS.total} projects — hackathons, bounties &amp; live client products.{" "}
                <span className="text-indigo-700">$250+ won.</span>
              </p>
            </div>

            {/* Desktop "View all" */}
            <Link
              href="/projects"
              style={{ fontFamily: "var(--syne-var)" }}
              className="hidden sm:inline-flex items-center gap-2 shrink-0 border border-[#E3E0D8] text-[#686D76] font-medium text-sm px-5 py-2.5 rounded-lg hover:border-indigo-600/60 hover:text-indigo-600 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200"
            >
              View all {STATS.total} projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-3 mb-12">
            {[
              { value: String(STATS.total), label: "Projects Built", color: "#4F46E5" },
              { value: "$250+", label: "Hackathon Prizes",  color: "#4F46E5" },
              { value: String(STATS.live), label: "Live Apps", color: "#4F46E5" },
            ].map(({ value, label, color }) => (
              <div
                key={label}
                className="rounded-xl border border-[#E3E0D8] bg-[#FFFFFF] px-4 py-3 text-center"
                style={{ borderTop: `2px solid ${color}30` }}
              >
                <div
                  className="text-xl font-extrabold tracking-tight mb-0.5"
                  style={{ fontFamily: "var(--syne-var)", color }}
                >
                  {value}
                </div>
                <div className="font-mono text-[10px] text-[#686D76] tracking-wide">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Featured cards — horizontal on desktop ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURED.map((project) => (
            <FeaturedCard key={project.id} project={project} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <MoreProjectsCTA />
      </div>
    </section>
  );
}

/* ─────────────────────── featured card ─────────────────────── */

function FeaturedCard({ project }: { project: PreviewProject }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/projects/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-[#E3E0D8] bg-[#FFFFFF] transition-all duration-300"
      style={{
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.3s ease",
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
          className="text-[#17191D] text-[15px] leading-snug mb-2.5 transition-colors duration-200"
          style={{
            fontFamily: "var(--syne-var)",
            fontWeight: 700,
            color: hovered ? project.accentColor : undefined,
          }}
        >
          {project.shortTitle}
        </h3>

        {/* Description */}
        <p className="text-[14px] text-[#555963] leading-[1.7] mb-5 flex-1">
          {project.description}
        </p>

        {/* Highlight callout */}
        {project.highlight && (
          <div
            className="flex items-center gap-1.5 mb-4 font-mono text-[10px] tracking-wide"
            style={{ color: project.accentColor }}
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
                background: "rgba(79,70,229,0.06)",
                border: "1px solid #E3E0D8",
                color: "#4F46E5",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E3E0D8]">
          {project.live ? (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); window.open(project.live, "_blank", "noopener,noreferrer"); }}
              className="font-mono text-[9.5px] tracking-wide flex items-center gap-1.5 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: project.accentColor }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full "
                style={{ background: project.accentColor }}
              />
              Live
            </button>
          ) : (
            <span className="font-mono text-[9.5px] text-[#686D76] tracking-wide">
              View details
            </span>
          )}

          <span
            className="transition-all duration-200 group-hover:translate-x-1"
            style={{ color: hovered ? project.accentColor : "#686D76" }}
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
  return (
    <div className="mt-10 rounded-2xl border border-[#E3E0D8] bg-[#FFFFFF] overflow-hidden">
      {/* Top gradient bar */}
      <div
        className="h-[2px] w-full"
        style={{
          background: "linear-gradient(to right, transparent, #4F46E530, #4F46E530, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-7 py-6">

        {/* Left — text */}
        <div>
          <p
            className="text-[#17191D] text-[15px] font-semibold mb-1"
            style={{ fontFamily: "var(--syne-var)" }}
          >
            Showing 3 of {STATS.total} projects
          </p>
          <p className="font-mono text-[11px] text-[#686D76] tracking-wide">
            {STATS.total - 3} more — including HourBit productivity suite, Flutter app, Rust server &amp; live client sites.
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
                  background: "rgba(79,70,229,0.06)",
                  border: "1px solid #E3E0D8",
                  color: "#686D76",
                }}
              >
                {tag}
              </span>
            ))}
            <span className="font-mono text-[10px] text-[#686D76]">+{STATS.total - 6} more</span>
          </div>

          <Link
            href="/projects"
            style={{ fontFamily: "var(--syne-var)" }}
            className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-600/30 text-indigo-600 font-semibold text-[13px] px-5 py-2.5 rounded-lg hover:bg-indigo-600/20 hover:border-indigo-600/60 hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 tracking-wide"
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