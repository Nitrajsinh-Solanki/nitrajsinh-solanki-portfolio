// nitrajsinh-solanki/app/components/Services.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    id: "fullstack",
    number: "01",
    title: "Full-Stack Web Development",
    description:
      "End-to-end web applications from database schema to pixel-perfect UI. Clean REST APIs, server-side rendering, auth systems, and scalable architecture built with modern TypeScript stacks.",
    techs: ["Next.js", "React", "TypeScript", "MongoDB", "Tailwind CSS", "NextAuth"],
    projects: [
      { name: "Library Inventory System", award: "$90 · 3rd Place" },
      { name: "BioMap", award: "$70 · 4th Place" },
      { name: "Moodify", award: "$20 Merit" },
      { name: "Floris Restaurant Website", award: "Client" },
      { name: "Ice Saathi Platform", award: "Client · Live" },
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "mobile",
    number: "02",
    title: "Flutter Mobile Development",
    description:
      "Cross-platform mobile apps for Android and iOS. Real-time GPS tracking, Firebase push notifications, OTP auth flows, and smooth provider-pattern state management with a polished UX.",
    techs: ["Flutter", "Dart", "Firebase FCM", "Provider", "Dio", "SharedPreferences"],
    projects: [
      { name: "Aman Sales Delivery App", award: "Client · Production" },
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    id: "blockchain",
    number: "03",
    title: "Blockchain & Web3",
    description:
      "On-chain smart contracts and decentralised marketplace UIs on the Aptos blockchain. Move language contracts, wallet integration, NFT minting, and listing flows.",
    techs: ["Move Language", "Aptos Blockchain", "React", "Web3 Wallet"],
    projects: [
      { name: "NFT Marketplace (Aptos)", award: "$60 Bounty" },
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    id: "ai",
    number: "04",
    title: "AI & Intelligent Features",
    description:
      "Integrating large language models and multimodal AI into real products. From AI-generated content and intelligent tutoring to meeting transcription analysis and mood-based recommendation engines.",
    techs: ["Google Gemini AI", "AssemblyAI", "HuggingFace", "Cloudinary", "Node.js"],
    projects: [
      { name: "Math Genius AI", award: "$10 Merit" },
      { name: "Library Inventory System", award: "Gemini AI" },
      { name: "Moodify", award: "Multi-API" },
      { name: "Meeting Insights Generator", award: "Multimodal GenAI" },
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: "backend",
    number: "05",
    title: "API & Backend Engineering",
    description:
      "Robust REST APIs with JWT authentication, role-based access control, OTP email verification, real-time data endpoints, and third-party API integration at scale across 6+ external services.",
    techs: ["Next.js API Routes", "MongoDB", "Mongoose", "JWT", "Nodemailer", "Supabase"],
    projects: [
      { name: "Ice Saathi Platform", award: "20+ endpoints" },
      { name: "BioMap", award: "6 scientific APIs" },
      { name: "Library Inventory System", award: "3-role RBAC" },
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: "systems",
    number: "06",
    title: "Systems & Infrastructure",
    description:
      "Low-level systems programming in Rust for performant, memory-safe infrastructure tools. File servers, CLI utilities, and system-level software where correctness and speed are non-negotiable.",
    techs: ["Rust", "Cargo", "Systems Programming"],
    projects: [
      { name: "Rust Simple File Server", award: "Bounty Claimed" },
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
] as const;

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function Services() {
  const header = useInView(0.1);

  return (
    <section
      id="services"
      className="relative py-28 px-6 md:px-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(94,234,212,0.04) 0%, transparent 70%)",
      }}
    >
      {/* Dot grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dot-grid opacity-40"
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-[-6%] w-[380px] h-[380px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(94,234,212,0.06) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div
          ref={header.ref}
          className="mb-16"
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
          }}
        >
          <p
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-teal-300/80 mb-4"
          >
            What I Build
          </p>
          <div className="flex items-end gap-6 flex-wrap">
            <h2
              style={{
                fontFamily: "var(--syne-var)",
                fontWeight: 800,
                fontSize: "clamp(34px, 5vw, 52px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#E2DDD5",
              }}
            >
              Services &amp;
              <br />
              <span style={{ color: "#6A9BAF" }}>Expertise</span>
            </h2>
            <p
              className="text-[15px] leading-[1.8] max-w-[380px] mb-1"
              style={{ color: "#524E4A" }}
            >
              Six specialisations backed by{" "}
              <span style={{ color: "#9A9585" }}>10 shipped projects</span> and
              over <span style={{ color: "#9A9585" }}>$250 in prize money</span>{" "}
              won on competitive hackathon platforms.
            </p>
          </div>

          {/* Divider */}
          <div
            className="mt-8 h-[1px] w-full"
            style={{
              background:
                "linear-gradient(to right, #1A2B42, #5EEAD4 30%, #1A2B42 70%, transparent)",
            }}
          />
        </div>

        {/* ── Service cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <CtaBanner />
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const { ref, visible } = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ${index * 0.08}s ease, transform 0.55s ${index * 0.08}s ease`,
        background: hovered ? "#0D1A2A" : "#0B1623",
        border: `1px solid ${hovered ? "rgba(94,234,212,0.22)" : "#1A2B42"}`,
        borderRadius: "14px",
        padding: "28px",
        cursor: "default",
        boxShadow: hovered
          ? "0 0 40px rgba(94,234,212,0.05), inset 0 0 0 1px rgba(94,234,212,0.08)"
          : "none",
        transition2: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
      } as React.CSSProperties}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-5">
        {/* Icon circle */}
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "10px",
            background: hovered ? "rgba(94,234,212,0.12)" : "rgba(94,234,212,0.06)",
            border: "1px solid rgba(94,234,212,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#5EEAD4",
            flexShrink: 0,
            transition: "background 0.25s",
          }}
        >
          {service.icon}
        </div>

        {/* Number badge */}
        <span
          className="font-mono text-[11px] tracking-[0.12em]"
          style={{ color: "#2A3A4A" }}
        >
          {service.number}
        </span>
      </div>

      {/* Title */}
      <h3
        className="mb-3 leading-[1.25]"
        style={{
          fontFamily: "var(--syne-var)",
          fontWeight: 700,
          fontSize: "17px",
          color: "#E2DDD5",
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="text-[13.5px] leading-[1.75] mb-5"
        style={{ color: "#524E4A" }}
      >
        {service.description}
      </p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {service.techs.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10.5px] tracking-wide px-2.5 py-[4px] rounded-md"
            style={{
              background: "rgba(26,43,66,0.8)",
              border: "1px solid #1A2B42",
              color: "#6A9BAF",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div
        className="mb-4"
        style={{ height: "1px", background: "#111C2A" }}
      />

      {/* Projects */}
      <div>
        <p
          className="font-mono text-[10px] tracking-[0.14em] uppercase mb-3"
          style={{ color: "#2A3A4A" }}
        >
          Delivered In
        </p>
        <div className="flex flex-col gap-2">
          {service.projects.map((project) => (
            <div key={project.name} className="flex items-center justify-between gap-2">
              <span className="text-[12.5px] leading-none" style={{ color: "#7A7570" }}>
                {project.name}
              </span>
              <span
                className="font-mono text-[10px] px-2 py-[3px] rounded whitespace-nowrap"
                style={{
                  background: "rgba(94,234,212,0.06)",
                  border: "1px solid rgba(94,234,212,0.12)",
                  color: "#5EEAD4",
                  opacity: 0.85,
                }}
              >
                {project.award}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CtaBanner() {
  const { ref, visible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className="mt-14 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.55s 0.2s ease, transform 0.55s 0.2s ease",
        background: "linear-gradient(135deg, #0B1623 0%, #0D1E30 100%)",
        border: "1px solid #1A2B42",
      }}
    >
      <div>
        <p
          className="font-mono text-[10.5px] tracking-[0.16em] uppercase mb-2"
          style={{ color: "rgba(94,234,212,0.6)" }}
        >
          Open to Work
        </p>
        <h3
          style={{
            fontFamily: "var(--syne-var)",
            fontWeight: 700,
            fontSize: "clamp(20px, 3vw, 26px)",
            color: "#E2DDD5",
            lineHeight: 1.2,
          }}
        >
          Got a project in mind?
          <br />
          <span style={{ color: "#6A9BAF" }}>Let&apos;s build it together.</span>
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
        <a
          href="mailto:nrsolanki2005@gmail.com"
          style={{ fontFamily: "var(--syne-var)" }}
          className="bg-teal-300 text-[#070B14] font-bold text-sm px-7 py-3.5 rounded-lg hover:opacity-85 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200 text-center"
        >
          Email Me
        </a>
        <a
          href="https://github.com/Nitrajsinh-Solanki"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "var(--syne-var)" }}
          className="border border-[#1F2E42] text-[#9A9585] font-medium text-sm px-7 py-3.5 rounded-lg hover:border-teal-300/60 hover:text-teal-300 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200 text-center"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}