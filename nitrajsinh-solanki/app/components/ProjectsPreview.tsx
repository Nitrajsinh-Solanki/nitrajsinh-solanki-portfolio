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
}

/* ─────────────────────────── data ──────────────────────────── */

const PROJECTS: PreviewProject[] = [
  {
    id: "1",
    slug: "library-inventory-system",
    shortTitle: "Library Inventory System",
    badge: "🏆 $90 · 3rd Place",
    badgeColor: "teal",
    description: "Full-featured library management with 3 user roles, AI book descriptions, borrowing & fine system.",
    tech: ["Next.js", "MongoDB", "Gemini AI", "NextAuth"],
    accentColor: "#5EEAD4",
    gradientFrom: "#0A2540",
    iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    id: "2",
    slug: "biomap",
    shortTitle: "BioMap",
    badge: "🏆 $70 · 4th Place",
    badgeColor: "teal",
    description: "Scientific platform unifying biodiversity maps, NASA media, chemistry data & educational resources via 6 APIs.",
    tech: ["Next.js 14", "Leaflet", "GBIF API", "MongoDB"],
    accentColor: "#34D399",
    gradientFrom: "#051A10",
    iconPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    live: "https://biomap-nitrajsinh-solankis-projects.vercel.app",
  },
  {
    id: "3",
    slug: "nft-marketplace-aptos",
    shortTitle: "Aptos NFT Marketplace",
    badge: "💰 $60 Bounty",
    badgeColor: "violet",
    description: "On-chain NFT marketplace with auctions, royalties, batch transfers & APT payments via Move smart contracts.",
    tech: ["Aptos Blockchain", "Move", "React", "Petra Wallet"],
    accentColor: "#A78BFA",
    gradientFrom: "#120A30",
    iconPath: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    id: "4",
    slug: "moodify",
    shortTitle: "Moodify",
    badge: "🎖 $20 Merit Prize",
    badgeColor: "amber",
    description: "AI music platform streaming from Jamendo, Deezer & Audius based on your weather, location & listening behaviour.",
    tech: ["Next.js 15", "Gemini AI", "Cloudinary", "OpenWeather"],
    accentColor: "#F472B6",
    gradientFrom: "#1A0A20",
    iconPath: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
  },
  {
    id: "5",
    slug: "math-genius-ai",
    shortTitle: "Math Genius AI",
    badge: "🎖 $10 Merit Prize",
    badgeColor: "blue",
    description: "Adaptive math tutoring platform with Gemini AI quizzes, handwriting recognition & PDF report generation.",
    tech: ["Next.js", "Gemini AI", "Canvas API", "jsPDF"],
    accentColor: "#60A5FA",
    gradientFrom: "#0A1530",
    iconPath: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    id: "6",
    slug: "meeting-insights-generator",
    shortTitle: "Meeting Insights Generator",
    badge: "🤖 Multimodal GenAI",
    badgeColor: "amber",
    description: "Transcribes meetings with AssemblyAI, summarizes with HuggingFace, adds visual highlights, outputs audio.",
    tech: ["React", "AssemblyAI", "HuggingFace", "Deepgram"],
    accentColor: "#FBBF24",
    gradientFrom: "#1A1000",
    iconPath: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
  },
  {
    id: "7",
    slug: "rust-file-server",
    shortTitle: "Rust File Server",
    badge: "⚡ Bounty Claimed",
    badgeColor: "orange",
    description: "HTTP file server from scratch in Rust — raw TCP listener, custom HTTP parser, MIME detection. No frameworks.",
    tech: ["Rust", "Cargo", "TCP/HTTP", "Systems Programming"],
    accentColor: "#FB923C",
    gradientFrom: "#1A0A00",
    iconPath: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  },
  {
    id: "8",
    slug: "floris-restaurant",
    shortTitle: "Floris Restaurant",
    badge: "🌐 Live Client",
    badgeColor: "orange",
    description: "Production website for a premium dining & banquet venue in Patan. Fire-branded SPA with booking CTA.",
    tech: ["React 19", "Vite", "Tailwind CSS", "Vercel"],
    accentColor: "#F97316",
    gradientFrom: "#1A0500",
    iconPath: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z",
    live: "https://floris-restaurant.vercel.app",
  },
  {
    id: "9",
    slug: "ice-saathi",
    shortTitle: "Ice Saathi Platform",
    badge: "🌐 Live · icesaathi.co.in",
    badgeColor: "blue",
    description: "End-to-end business OS for a wholesale ice distributor — subscriptions, deliveries, billing & Flutter app backend.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Firebase FCM"],
    accentColor: "#38BDF8",
    gradientFrom: "#040F20",
    iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    live: "https://www.icesaathi.co.in",
  },
  {
    id: "10",
    slug: "ice-saathi-delivery-app",
    shortTitle: "Delivery Partner App",
    badge: "📱 Production Flutter",
    badgeColor: "blue",
    description: "Flutter app for delivery partners — OTP login, live GPS tracking, order management & FCM push notifications.",
    tech: ["Flutter", "Dart", "Firebase FCM", "Provider"],
    accentColor: "#22D3EE",
    gradientFrom: "#041828",
    iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
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

  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 px-6 md:px-10 overflow-hidden"
    >
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[8%] left-[-6%] w-[420px] h-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(94,234,212,0.05) 0%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] right-[-4%] w-[360px] h-[360px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(94,234,212,0.04) 0%, transparent 70%)",
          filter: "blur(55px)",
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

          {/* Heading + sub + CTA in one flex row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
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
                10 projects — hackathons, bounties &amp; live client products.{" "}
                <span className="text-teal-300/70">$250+ won.</span>
              </p>
            </div>

            {/* Desktop "View all" */}
            <Link
              href="/projects"
              style={{ fontFamily: "var(--syne-var)" }}
              className="hidden sm:inline-flex items-center gap-2 shrink-0 border border-[#1F2E42] text-[#9A9585] font-medium text-sm px-5 py-2.5 rounded-lg hover:border-teal-300/60 hover:text-teal-300 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200"
            >
              View all projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* ── Mobile "View all" ── */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/projects"
            style={{ fontFamily: "var(--syne-var)" }}
            className="inline-flex items-center gap-2 border border-[#1F2E42] text-[#9A9585] font-medium text-sm px-6 py-3 rounded-lg hover:border-teal-300/60 hover:text-teal-300 transition-all duration-200"
          >
            View all 10 projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── project card ─────────────────────── */

function ProjectCard({ project, index }: { project: PreviewProject; index: number }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>(0.08);

  return (
    <Link
      ref={ref}
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-[#131C2E] bg-[#0B1623] hover:border-teal-300/20 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ${Math.min(index, 5) * 0.07}s ease, transform 0.5s ${Math.min(index, 5) * 0.07}s ease, border-color 0.25s ease`,
      }}
    >
      {/* Gradient header strip */}
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(to right, ${project.gradientFrom}, ${project.accentColor}60, transparent)`,
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col flex-1 p-5">

        {/* Top row: icon + badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Icon */}
          <div
            className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
            style={{
              background: `${project.accentColor}12`,
              border: `1px solid ${project.accentColor}28`,
            }}
          >
            <svg
              width="17"
              height="17"
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
          className="text-[#E2DDD5] text-[14px] leading-snug mb-2 group-hover:text-teal-300 transition-colors duration-200"
          style={{ fontFamily: "var(--syne-var)", fontWeight: 700 }}
        >
          {project.shortTitle}
        </h3>

        {/* Description */}
        <p className="text-[12.5px] text-[#524E4A] leading-[1.7] mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
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

        {/* Footer: live badge + arrow */}
        <div className="flex items-center justify-between pt-3 border-t border-[#0F1820]">
          {project.live ? (
            <span
              className="font-mono text-[9.5px] tracking-wide flex items-center gap-1.5"
              style={{ color: project.accentColor, opacity: 0.8 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: project.accentColor }}
              />
              Live
            </span>
          ) : (
            <span className="font-mono text-[9.5px] text-[#2A3A4A] tracking-wide">
              View details
            </span>
          )}

          <span className="text-[#2A3A4A] group-hover:text-teal-300 group-hover:translate-x-1 transition-all duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}