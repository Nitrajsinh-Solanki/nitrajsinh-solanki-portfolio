// nitrajsinh-solanki/app/components/WorkHistory.tsx
"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────── types ──────────────────────────── */

interface TechTag {
  name: string;
  color: string;
  border: string;
  bg: string;
}

interface Achievement {
  label: string;
  value: string;
}

interface WorkEntry {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  type: "internship" | "freelance" | "hackathon";
  period: string;
  duration: string;
  location: string;
  current: boolean;
  accentColor: string;
  badgeText: string;
  description: string[];
  tech: TechTag[];
  achievements: Achievement[];
}

/* ──────────────────────────── data ───────────────────────────── */

const WORK: WorkEntry[] = [
  {
    id: "veloxcore",
    role: "Full Stack Engineer Intern",
    company: "VeloxCore Private Limited",
    type: "internship",
    period: "1st January,2026 – Present",
    duration: "Ongoing",
    location: "Gujarat, India",
    current: true,
    accentColor: "#5EEAD4",
    badgeText: "Active",
    description: [
      "Building and maintaining enterprise-grade web applications using .NET (ASP.NET Core) on the backend and Angular on the frontend — owning the full delivery cycle from schema design and REST API architecture to component-driven UI.",
      "Designing and implementing clean, efficient RESTful APIs that power real production workloads. Writing reusable Angular components, services, and modules with a focus on maintainability and scalability.",
      "Collaborating closely with the engineering team on code reviews, technical architecture decisions, and best practices — shipping features that are readable six months later.",
    ],
    tech: [
      { name: ".NET / ASP.NET Core", color: "#A78BFA", border: "border-violet-400/25", bg: "bg-violet-400/5" },
      { name: "Angular",             color: "#F87171", border: "border-red-400/25",    bg: "bg-red-400/5"    },
      { name: "TypeScript",          color: "#60A5FA", border: "border-blue-400/25",   bg: "bg-blue-400/5"   },
      { name: "REST APIs",           color: "#34D399", border: "border-emerald-400/25",bg: "bg-emerald-400/5"},
      { name: "C#",                  color: "#A78BFA", border: "border-violet-400/25", bg: "bg-violet-400/5" },
      { name: "SQL Server",          color: "#FCD34D", border: "border-amber-400/25",  bg: "bg-amber-400/5"  },
      { name: "Git & GitHub",        color: "#5EEAD4", border: "border-teal-400/25",   bg: "bg-teal-400/5"   },
    ],
    achievements: [
      { label: "Stack",    value: ".NET + Angular" },
      { label: "Role",     value: "Full Stack Intern" },
      { label: "Status",   value: "Active" },
    ],
  },
  {
    id: "stackup",
    role: "Hackathon & Bounty Participant",
    company: "StackUp",
    companyUrl: "https://stackup.dev",
    type: "hackathon",
    period: "2024 – 2025",
    duration: "Multiple Rounds",
    location: "Remote (Global)",
    current: false,
    accentColor: "#FCD34D",
    badgeText: "$250+ Won",
    description: [
      "Competed across 5 global hackathons and bounty challenges on the StackUp platform, consistently placing in the top rankings. Built and shipped 7 full-stack projects end-to-end — often solo — under tight deadlines.",
      "Won prizes including $90 (3rd Place), $70 (4th Place), $60 Bounty, $20 Merit, and $10 Merit — totalling $250+ across blockchain, AI, and full-stack categories.",
      "Explored cutting-edge tech stacks in each challenge: Move language on Aptos Blockchain, Rust systems programming, Google Gemini AI, and multimodal GenAI — shipping production-ready code each time.",
    ],
    tech: [
      { name: "Next.js",          color: "#E2DDD5", border: "border-[#E2DDD5]/20",     bg: "bg-[#E2DDD5]/5"  },
      { name: "React.js",         color: "#60A5FA", border: "border-blue-400/25",      bg: "bg-blue-400/5"   },
      { name: "Node.js",          color: "#34D399", border: "border-emerald-400/25",   bg: "bg-emerald-400/5"},
      { name: "MongoDB",          color: "#FCD34D", border: "border-amber-400/25",     bg: "bg-amber-400/5"  },
      { name: "TypeScript",       color: "#60A5FA", border: "border-blue-400/25",      bg: "bg-blue-400/5"   },
      { name: "Google Gemini AI", color: "#C4B5FD", border: "border-violet-400/25",    bg: "bg-violet-400/5" },
      { name: "Rust",             color: "#FB923C", border: "border-orange-400/25",    bg: "bg-orange-400/5" },
      { name: "Move (Aptos)",     color: "#A5B4FC", border: "border-indigo-400/25",    bg: "bg-indigo-400/5" },
      { name: "Aptos Blockchain", color: "#A5B4FC", border: "border-indigo-400/25",    bg: "bg-indigo-400/5" },
    ],
    achievements: [
      { label: "Total Won",   value: "$250+" },
      { label: "Projects",    value: "7 Shipped" },
      { label: "Best Finish", value: "3rd Place" },
    ],
  },
  {
    id: "freelance",
    role: "Freelance Full-Stack Developer",
    company: "Independent / Client Work",
    type: "freelance",
    period: "2024 – 2025",
    duration: "2 Clients",
    location: "Gujarat, India",
    current: false,
    accentColor: "#67E8F9",
    badgeText: "2 Live Products",
    description: [
      "Delivered two full production systems for real businesses in Gujarat — a restaurant & banquet website for Floris (Patan) and a complete wholesale ice-inventory + delivery management platform for Aman Sales (Gandhidham).",
      "Aman Sales — Ice Saathi (icesaathi.co.in): end-to-end Next.js platform handling inventory management, customer subscriptions, admin dashboards, OTP auth, and a companion Flutter delivery-partner app with live GPS tracking and FCM push notifications.",
      "Floris Restaurant: public-facing marketing site built with React 19 + Vite, optimised for speed and SEO — live and handling real customer traffic.",
    ],
    tech: [
      { name: "Next.js",     color: "#E2DDD5", border: "border-[#E2DDD5]/20",     bg: "bg-[#E2DDD5]/5"  },
      { name: "TypeScript",  color: "#60A5FA", border: "border-blue-400/25",      bg: "bg-blue-400/5"   },
      { name: "MongoDB",     color: "#FCD34D", border: "border-amber-400/25",     bg: "bg-amber-400/5"  },
      { name: "Flutter",     color: "#67E8F9", border: "border-cyan-400/25",      bg: "bg-cyan-400/5"   },
      { name: "Firebase FCM",color: "#FB923C", border: "border-orange-400/25",    bg: "bg-orange-400/5" },
      { name: "React 19",    color: "#60A5FA", border: "border-blue-400/25",      bg: "bg-blue-400/5"   },
      { name: "JWT + OTP",   color: "#F9A8D4", border: "border-pink-400/25",      bg: "bg-pink-400/5"   },
      { name: "Tailwind CSS",color: "#38BDF8", border: "border-sky-400/25",       bg: "bg-sky-400/5"    },
    ],
    achievements: [
      { label: "Clients",    value: "2 Businesses" },
      { label: "Products",   value: "3 Delivered" },
      { label: "Live",       value: "icesaathi.co.in" },
    ],
  },
];

/* ─────────────────────── type badge styles ──────────────────── */

const TYPE_BADGE: Record<WorkEntry["type"], string> = {
  internship: "text-teal-300 border-teal-300/30 bg-teal-300/5",
  freelance:  "text-cyan-300 border-cyan-300/30 bg-cyan-300/5",
  hackathon:  "text-amber-300 border-amber-300/30 bg-amber-300/5",
};

const TYPE_LABEL: Record<WorkEntry["type"], string> = {
  internship: "Internship",
  freelance:  "Freelance",
  hackathon:  "Hackathon / Bounty",
};

/* ─────────────────────── intersection hook ──────────────────── */

function useReveal(threshold = 0.06) {
  const ref = useRef<HTMLElement>(null);
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

/* ───────────────────────────── component ─────────────────────── */

export default function WorkHistory() {
  const { ref, visible } = useReveal(0.04);

  const fade = (delay: number): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.55s ${delay}s ease, transform 0.55s ${delay}s ease`,
  });

  return (
    <section
      id="work-history"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-20 md:py-28 px-6 md:px-10 overflow-hidden"
    >
      {/* ── ambient glows ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[6%] right-[-6%] w-[460px] h-[460px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(94,234,212,0.055) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] left-[-5%] w-[380px] h-[380px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(250,204,21,0.03) 0%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── section label ── */}
        <div className="flex items-center gap-4 mb-4" style={fade(0.04)}>
          <span className="font-mono text-[11px] text-teal-300 tracking-[0.18em] uppercase select-none">
            // work history
          </span>
          <span
            className="flex-1 h-[1px]"
            style={{ background: "linear-gradient(to right, #1A2B42, transparent)" }}
          />
        </div>

        {/* ── heading ── */}
        <h2
          className="leading-[1.05] tracking-tight text-[#E2DDD5] mb-3"
          style={{
            fontFamily: "var(--syne-var)",
            fontWeight: 800,
            fontSize: "clamp(28px, 4.8vw, 48px)",
            ...fade(0.12),
          }}
        >
          Where I&apos;ve{" "}
          <span className="text-teal-300">shipped things.</span>
        </h2>

        {/* ── sub-tagline ── */}
        <p
          className="font-mono text-[11.5px] text-[#4A6070] tracking-wide mb-12"
          style={fade(0.2)}
        >
          Internship · Freelance clients · Hackathon wins — real products, real deadlines.
        </p>

        {/* ── Timeline ── */}
        <div className="relative flex flex-col gap-0" style={fade(0.28)}>

          {/* Vertical spine */}
          <div
            className="absolute left-[11px] top-4 bottom-4 w-[1px] hidden md:block"
            style={{ background: "linear-gradient(to bottom, #1A2B42 70%, transparent)" }}
          />

          {WORK.map((entry, idx) => (
            <div key={entry.id} className="flex gap-0 md:gap-6 pb-8 last:pb-0">

              {/* ── Dot (desktop only) ── */}
              <div className="hidden md:flex shrink-0 flex-col items-center pt-[18px]">
                <span
                  className={`relative z-10 flex w-[22px] h-[22px] rounded-full border-2 items-center justify-center ${
                    entry.current
                      ? "border-teal-300 bg-[#070B14]"
                      : "border-[#1A2B42] bg-[#0B1623]"
                  }`}
                >
                  {entry.current && (
                    <span className="w-[7px] h-[7px] rounded-full bg-teal-300 animate-pulse" />
                  )}
                </span>
              </div>

              {/* ── Card ── */}
              <div
                className="flex-1 bg-[#0B1623] border rounded-2xl p-5 md:p-6 hover:border-teal-300/20 transition-all duration-300 group"
                style={{
                  borderColor: entry.current ? `${entry.accentColor}25` : "#131C2E",
                  transitionDelay: `${idx * 60}ms`,
                }}
              >
                {/* ── Card header ── */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                  <div className="flex flex-col gap-1.5">

                    {/* Role */}
                    <h3
                      className="text-[#E2DDD5] text-[15px] font-bold leading-snug"
                      style={{ fontFamily: "var(--syne-var)" }}
                    >
                      {entry.role}
                    </h3>

                    {/* Company + current badge */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {entry.companyUrl ? (
                        <a
                          href={entry.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] tracking-wide hover:text-teal-300 transition-colors"
                          style={{ color: entry.accentColor }}
                        >
                          {entry.company} ↗
                        </a>
                      ) : (
                        <span
                          className="font-mono text-[11px] tracking-wide"
                          style={{ color: entry.accentColor }}
                        >
                          {entry.company}
                        </span>
                      )}
                      {entry.current && (
                        <span className="font-mono text-[9px] text-teal-300 border border-teal-300/30 bg-teal-300/5 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse inline-block" />
                          Now
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Meta pills */}
                  <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 shrink-0">
                    <span
                      className={`font-mono text-[9.5px] px-2.5 py-1 rounded-full border ${TYPE_BADGE[entry.type]}`}
                    >
                      {TYPE_LABEL[entry.type]}
                    </span>
                    <span className="font-mono text-[9.5px] text-[#4A5060] border border-[#131C2E] bg-[#080D18] px-2.5 py-1 rounded-full">
                      {entry.period}
                    </span>
                  </div>
                </div>

                {/* ── Location + duration row ── */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-mono text-[10px] text-[#3A4A50] tracking-wide flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {entry.location}
                  </span>
                  <span className="font-mono text-[10px] text-[#3A4A50] tracking-wide flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {entry.duration}
                  </span>
                </div>

                {/* ── TWO-COL: Description + Achievements ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-6">

                  {/* Description */}
                  <div className="space-y-3">
                    {entry.description.map((para, i) => (
                      <p key={i} className="text-[13.5px] text-[#6A6560] leading-[1.8] flex gap-3">
                        <span
                          className="mt-[9px] w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: entry.accentColor, opacity: 0.6 }}
                          aria-hidden="true"
                        />
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Achievements sidebar */}
                  <div
                    className="flex flex-row lg:flex-col gap-3 lg:gap-4 bg-[#080D18] border border-[#131C2E] rounded-xl p-4 self-start"
                  >
                    {entry.achievements.map((a) => (
                      <div key={a.label} className="flex flex-col gap-0.5">
                        <span className="font-mono text-[9px] text-[#3A4050] uppercase tracking-wider">
                          {a.label}
                        </span>
                        <span
                          className="font-mono text-[11px] font-medium"
                          style={{ color: entry.accentColor }}
                        >
                          {a.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Tech Stack pills ── */}
                <div className="mt-5 pt-5 border-t border-[#0F1620]">
                  <p className="font-mono text-[9px] text-[#3D3730] tracking-[0.15em] uppercase mb-3">
                    Stack Used
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tech.map((t) => (
                      <span
                        key={t.name}
                        className={`font-mono text-[10.5px] border px-2.5 py-1 rounded-lg transition-colors duration-200 ${t.border} ${t.bg}`}
                        style={{ color: t.color }}
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom summary strip ── */}
        <div
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3"
          style={fade(0.44)}
        >
          {[
            { label: "Experience Type",  value: "Intern + Freelance" },
            { label: "Total Earnings",   value: "$250+ Hackathons"   },
            { label: "Live Products",    value: "3 Shipped"          },
            { label: "Current Stack",    value: ".NET + Angular"     },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-[#0B1623] border border-[#131C2E] rounded-xl px-4 py-3.5 hover:border-teal-300/20 transition-colors duration-300"
            >
              <p className="font-mono text-[9px] text-[#3A4050] uppercase tracking-wider mb-1">{label}</p>
              <p
                className="font-mono text-[11.5px] text-teal-300 font-medium leading-snug"
                style={{ fontFamily: "var(--syne-var)" }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}