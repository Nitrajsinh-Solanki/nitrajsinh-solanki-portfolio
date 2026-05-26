// app/projects/ProjectsClient.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

// ──────────────────────────────────────────────
//  TYPES
// ──────────────────────────────────────────────
export type ProjectCategory = "all" | "hackathon" | "client";

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: "hackathon" | "client";
  badge: string;
  badgeColor: "teal" | "amber" | "violet" | "orange" | "blue";
  description: string;
  tech: string[];
  github: string;
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
const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "library-inventory-system",
    title: "Library & Book Store Inventory System",
    shortTitle: "Library Inventory System",
    category: "hackathon",
    badge: "🏆 $90 · 3rd Place",
    badgeColor: "teal",
    description:
      "Full-featured library management system with three user roles — Admin, Librarian, User. Handles book lifecycle, borrowing, fines, AI-powered descriptions, and email notifications.",
    tech: ["Next.js", "MongoDB", "Supabase", "Gemini AI", "NextAuth", "TypeScript"],
    github: "https://github.com/Nitrajsinh-Solanki/library-inventory-system",
    demo: "https://youtu.be/_1GYteabksM?feature=shared",
    gradientFrom: "#0A2540",
    gradientTo: "#0F3D2E",
    accentColor: "#5EEAD4",
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    id: "2",
    slug: "biomap",
    title: "BioMap — Scientific Explorer Platform",
    shortTitle: "BioMap",
    category: "hackathon",
    badge: "🏆 $70 · 4th Place",
    badgeColor: "teal",
    description:
      "Scientific web app unifying biodiversity maps, chemistry data, NASA space media, environmental monitoring, and educational resources — powered by 6 major public APIs.",
    tech: ["Next.js 14", "TypeScript", "MongoDB", "Leaflet", "GBIF API", "NASA API"],
    github: "https://github.com/Nitrajsinh-Solanki/biomap",
    live: "https://biomap-nitrajsinh-solankis-projects.vercel.app",
    demo: "https://youtu.be/df_NNqL2DzA?feature=shared",
    gradientFrom: "#051A10",
    gradientTo: "#0A1A30",
    accentColor: "#34D399",
    iconPath:
      "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "3",
    slug: "nft-marketplace-aptos",
    title: "NFT Marketplace on Aptos Blockchain",
    shortTitle: "Aptos NFT Marketplace",
    category: "hackathon",
    badge: "💰 $60 Bounty",
    badgeColor: "violet",
    description:
      "Feature-rich NFT marketplace powered by Aptos Move smart contracts. Supports auctions, royalties, offers, batch transfers, APT token payments, and a creator tipping system.",
    tech: ["Aptos Blockchain", "Move", "React", "Petra Wallet", "Web3"],
    github: "https://github.com/Nitrajsinh-Solanki/aptos4-bounty-nft",
    demo: "https://youtu.be/ktyZZIuZpNY?feature=shared",
    gradientFrom: "#120A30",
    gradientTo: "#1A0A20",
    accentColor: "#A78BFA",
    iconPath:
      "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    id: "4",
    slug: "moodify",
    title: "Moodify — AI Music Streaming App",
    shortTitle: "Moodify",
    category: "hackathon",
    badge: "🎖 $20 Merit Prize",
    badgeColor: "amber",
    description:
      "AI-powered music platform that recommends and streams music based on location, weather, and behaviour. Streams from Jamendo, Deezer, and Audius via Gemini AI recommendations.",
    tech: ["Next.js 15", "Gemini AI", "Cloudinary", "MongoDB", "OpenWeather", "Jamendo API"],
    github: "https://github.com/nitrajsinh-solanki/hackathon_may_stackup",
    demo: "https://youtu.be/MAW5gd2lZxM?feature=shared",
    gradientFrom: "#1A0A20",
    gradientTo: "#200A0A",
    accentColor: "#F472B6",
    iconPath:
      "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
  },
  {
    id: "5",
    slug: "math-genius-ai",
    title: "Math Genius AI — Learning Platform",
    shortTitle: "Math Genius AI",
    category: "hackathon",
    badge: "🎖 $10 Merit Prize",
    badgeColor: "blue",
    description:
      "AI-powered math education platform with adaptive quizzes, handwriting recognition, conversational AI tutor, performance tracking, and PDF report generation.",
    tech: ["Next.js", "Gemini AI", "MongoDB", "Canvas API", "jsPDF", "TypeScript"],
    github: "https://github.com/Nitrajsinh-Solanki/hackathon-feb",
    demo: "https://youtu.be/_UfK5yp_wGk?feature=shared",
    gradientFrom: "#0A1530",
    gradientTo: "#051020",
    accentColor: "#60A5FA",
    iconPath:
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    id: "6",
    slug: "meeting-insights-generator",
    title: "Meeting Insights Generator",
    shortTitle: "Meeting Insights",
    category: "hackathon",
    badge: "🤖 Hackathon Submission",
    badgeColor: "amber",
    description:
      "Multimodal AI app that transcribes meeting audio, summarizes with AI, retrieves visual highlights from Pexels, and converts summaries back to speech — full end-to-end pipeline.",
    tech: ["React", "Node.js", "AssemblyAI", "HuggingFace", "Deepgram", "Cloudinary"],
    github: "https://github.com/Nitrajsinh-Solanki/Meeting-Genius",
    demo: "https://youtu.be/x_GMz0qJ9Zg",
    gradientFrom: "#1A1000",
    gradientTo: "#100A20",
    accentColor: "#FBBF24",
    iconPath:
      "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
  },
  {
    id: "7",
    slug: "rust-file-server",
    title: "Rust Simple File Server",
    shortTitle: "Rust File Server",
    category: "hackathon",
    badge: "⚡ Bounty Claimed",
    badgeColor: "orange",
    description:
      "A basic HTTP file server built from scratch in Rust with no web framework dependency. Custom HTTP request/response parser over raw TCP streams. First to complete all objectives.",
    tech: ["Rust", "Cargo", "TCP/HTTP", "Systems Programming"],
    github: "https://github.com/Nitrajsinh-Solanki/simple-file-server",
    gradientFrom: "#1A0A00",
    gradientTo: "#100800",
    accentColor: "#FB923C",
    iconPath:
      "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  },
  {
    id: "8",
    slug: "floris-restaurant",
    title: "Floris Restaurant & Banquet Website",
    shortTitle: "Floris Restaurant",
    category: "client",
    badge: "🌐 Live Client",
    badgeColor: "orange",
    description:
      "Production website for a premium dining & banquet venue in Patan. Dark fire-branded SPA with animated navbar, menu section, gallery, and booking CTA.",
    tech: ["React 19", "Vite", "Tailwind CSS", "Lucide React", "Vercel"],
    github: "https://github.com/Nitrajsinh-Solanki/floris-restaurant",
    live: "https://floris-restaurant.vercel.app",
    gradientFrom: "#1A0500",
    gradientTo: "#100800",
    accentColor: "#F97316",
    iconPath:
      "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z",
  },
  {
    id: "9",
    slug: "ice-saathi",
    title: "Aman Sales — Ice Saathi Platform",
    shortTitle: "Ice Saathi",
    category: "client",
    badge: "🌐 Live · icesaathi.co.in",
    badgeColor: "blue",
    description:
      "End-to-end business management platform for a wholesale ice distributor. Manages customers, subscriptions, billing, deliveries, and serves as the complete backend for the companion Flutter app.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Firebase FCM", "Tailwind CSS"],
    github: "https://github.com/Nitrajsinh-Solanki",
    live: "https://www.icesaathi.co.in",
    gradientFrom: "#040F20",
    gradientTo: "#051530",
    accentColor: "#38BDF8",
    iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    id: "10",
    slug: "ice-saathi-delivery-app",
    title: "Aman Sales Delivery Partner App",
    shortTitle: "Delivery Partner App",
    category: "client",
    badge: "📱 Production Flutter",
    badgeColor: "blue",
    description:
      "Flutter mobile app for Aman Sales delivery partners. Features OTP login, live GPS tracking, order management, sticky notes, and FCM push notifications for new order assignments.",
    tech: ["Flutter", "Dart", "Firebase FCM", "Provider", "Dio", "Background GPS"],
    github: "https://github.com/Nitrajsinh-Solanki",
    gradientFrom: "#041828",
    gradientTo: "#030E1E",
    accentColor: "#22D3EE",
    iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
];

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
          className="text-[12.5px] text-[#4A4640] leading-[1.75] flex-1 mb-4"
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
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub — ${project.title}`}
            className="flex items-center justify-center w-8 h-8 border border-[#131C2E] rounded-lg hover:border-[#1F3050] hover:bg-[#0D1520] transition-all duration-200 shrink-0"
          >
            <svg className="w-3.5 h-3.5 text-[#5A5450]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* Live link */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live — ${project.title}`}
              className="flex items-center justify-center w-8 h-8 border border-[#131C2E] rounded-lg hover:border-teal-400/30 hover:bg-[#0D1520] transition-all duration-200 shrink-0"
            >
              <svg className="w-3.5 h-3.5 text-[#5A5450]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
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

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Projects by Nitrajsinh Solanki",
            description: "Portfolio of full-stack, blockchain, AI, and client projects",
            numberOfItems: PROJECTS.length,
            itemListElement: PROJECTS.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.title,
              url: `https://nitrajsinh-solanki.vercel.app/projects/${p.slug}`,
            })),
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
                href="/"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#6A6560] hover:text-[#C8C3BA] tracking-[0.07em] uppercase transition-colors"
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
                  <p className="text-[13.5px] text-[#4A4640] leading-[1.8] max-w-[460px]">
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
                        : "border-[#1A2B42] text-[#6A6560] hover:border-[#2A3B52] hover:text-[#C8C3BA] bg-transparent"
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
                  <p className="text-[13px] text-[#4A4640] max-w-xs">
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
                  <svg className="w-4 h-4 text-[#5A5450] group-hover:text-teal-300 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
              { label: "GitHub",                  href: "https://github.com/Nitrajsinh-Solanki" },
              { label: "Twitter",                 href: "https://twitter.com/Nitrajsinh2005" },
              { label: "nrsolanki2005@gmail.com", href: "mailto:nrsolanki2005@gmail.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-mono text-[11px] text-[#3A3530] hover:text-teal-300 transition-colors duration-200 tracking-wide"
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