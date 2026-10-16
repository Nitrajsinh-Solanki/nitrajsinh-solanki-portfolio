// nitrajsinh-solanki/app/components/Hero.tsx
"use client";

import { STATS } from "../projects/stats";

import Image from "next/image";
import { useState, useEffect } from "react";

/* ────────────────────── scroll progress bar ─────────────────── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
      <div
        className="h-full transition-all duration-100"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(to right, #4F46E5, #4F46E5)",
        }}
      />
    </div>
  );
}

/* ─────────────────────── stat chip ─────────────────────────── */
function StatChip({
  value, label, color,
}: {
  value: string; label: string; color: string;
}) {
  return (
    <div className="flex flex-col items-center px-3 sm:px-5 py-3 rounded-2xl border border-[#E3E0D8] bg-white">
      <span
        className="text-[22px] font-extrabold leading-none mb-0.5"
        style={{ fontFamily: "var(--syne-var)", color }}
      >
        {value}
      </span>
      <span className="font-mono text-[11px] text-[#686D76] tracking-wide uppercase">{label}</span>
    </div>
  );
}

/* ─────────────────────── main component ─────────────────────── */
export default function Hero() {
  const displayed = "MERN Stack Developer";

  return (
    <>
      <ScrollProgress />

      <section
        id="hero"
        className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-10 pt-16 overflow-hidden"
        style={{ background: "#F8F7F3" }}
      >
        {/* ─────────────── Main grid ─────────────── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-24 lg:py-0">

          {/* ══════ LEFT: Text ══════ */}
          <div className="flex flex-col order-1">

            {/* Status badge */}
            <div className="anim-1 inline-flex items-center gap-2.5 self-start bg-[#FFFFFF] border border-[#E3E0D8] px-4 py-[7px] rounded-full mb-7">
              <span className="inline-flex rounded-full h-2 w-2 bg-indigo-600" aria-hidden="true" />
              <span className="font-mono text-[10px] sm:text-[10.5px] text-indigo-700 tracking-normal sm:tracking-[0.07em]">
                Intern @ VeloxCore Private Limited
              </span>
            </div>

            {/* Name */}
            <h1
              className="anim-2 leading-[0.98] tracking-tight mb-3"
              style={{
                fontFamily: "var(--syne-var)",
                fontWeight: 800,
                fontSize: "clamp(40px, 6vw, 76px)",
              }}
            >
              <span style={{ color: "#17191D" }}>
                Nitrajsinh
              </span>
              <br />
              <span style={{ color: "#4F46E5" }}>
                Solanki
              </span>
            </h1>

            {/* Separator line */}
            <div
              className="anim-3 mb-5 h-[1px] w-24"
              style={{ background: "linear-gradient(to right, #E3E0D8, transparent)" }}
            />

            {/* Role label */}
            <div className="mb-5 h-7 flex items-center">
              <span
                className="font-sans text-[15px] font-medium tracking-normal"
                style={{ color: "#4F46E5" }}
              >
                {displayed}
              </span>
            </div>

            {/* Bio */}
            <p className="anim-4 text-[16px] text-[#555963] leading-[1.75] max-w-[460px] mb-8">
              Full-stack developer in Gujarat, India. B.E. Computer Engineering at GEC
              Patan, interning at VeloxCore. I build full-stack products that work:
              clean APIs, sharp frontends, and the kind of code you&apos;re not ashamed
              to revisit six months later.
            </p>

            {/* CTAs */}
            <div className="anim-5 flex flex-wrap gap-2.5 sm:gap-3 mb-10">
              <a
                href="#projects"
                style={{ fontFamily: "var(--syne-var)" }}
                className="relative group inline-flex items-center gap-2 bg-indigo-600 text-white font-bold text-[13px] px-7 py-3.5 rounded-xl hover:opacity-90 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200 overflow-hidden"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 6h16M4 10h16M4 14h10" />
                </svg>
                View Projects
              </a>
              <a
                href="mailto:nrsolanki2005@gmail.com"
                style={{ fontFamily: "var(--syne-var)" }}
                className="inline-flex items-center gap-2 border border-[#E3E0D8] text-[#686D76] font-medium text-[13px] px-7 py-3.5 rounded-xl hover:border-indigo-600/50 hover:text-indigo-600 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Get in Touch
              </a>

              {/* GitHub link */}
              <a
                href="https://github.com/Nitrajsinh-Solanki"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex items-center justify-center w-[50px] h-[50px] border border-[#E3E0D8] rounded-xl text-[#555963] hover:border-indigo-600/40 hover:text-indigo-600 hover:-translate-y-[2px] transition-all duration-200"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>

            {/* ── Stats row ── */}
            <div className="anim-6 flex items-center gap-3 flex-wrap">
              <StatChip value={String(STATS.total)} label="Projects" color="#4F46E5" />
              <StatChip value="$250+" label="Prizes Won" color="#4F46E5" />
              <StatChip value={String(STATS.live)} label="Live Apps" color="#4F46E5" />

              {/* Scroll cue */}
              <div className="hidden lg:flex items-center gap-2 ml-auto">
                <div className="flex flex-col items-center gap-[3px]">
                  <span className="block w-[1px] h-6" style={{ background: "linear-gradient(to bottom, transparent, #D8D5CD)" }} />
                  <span className="block w-[4px] h-[4px] rounded-full bg-[#D8D5CD]" />
                </div>
                <span className="font-mono text-[9px] text-[#686D76] tracking-[0.12em] uppercase">scroll</span>
              </div>
            </div>
          </div>

          {/* ══════ RIGHT: Photo + floating code card ══════ */}
          <div className="anim-img flex justify-center lg:justify-end order-2 relative">

            {/* Portrait */}
            <div className="relative flex items-center justify-center hero-portrait-wrap">

              {/* Photo */}
              <div
                className="hero-portrait-frame relative overflow-hidden border border-[#E3E0D8]"
                style={{
                  width: "clamp(240px, 28vw, 300px)",
                  height: "clamp(240px, 28vw, 300px)",
                  borderRadius: "24px",
                  zIndex: 2,
                }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Nitrajsinh Solanki, full-stack developer from Gujarat, India"
                  fill
                  sizes="(max-width: 1024px) 240px, 300px"
                  className="object-cover"
                  style={{ objectPosition: "center 12%" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}