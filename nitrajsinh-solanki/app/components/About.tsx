// nitrajsinh-solanki/app/components/About.tsx
"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────── data ──────────────────────────── */

const EDUCATION = [
  {
    degree: "B.E. — Computer Engineering",
    institute: "Government Engineering College, Patan",
    board: "GTU",
    period: "2022 – May 2026",
    score: "7.43 CGPA",
    current: true,
  },
  {
    degree: "HSC — Science",
    institute: "Sheth C.M. Higher Secondary School, Gandhinagar",
    board: "GSEB",
    period: "March 2022",
    score: "77.53%",
    current: false,
  },
  {
    degree: "SSC",
    institute: "Smt. Purbai Kanji Rajgor High School, Bhadreshwar",
    board: "GSEB",
    period: "March 2020",
    score: "86.67%",
    current: false,
  },
] as const;

const INTERESTS = [
  "Playing Carrom",
  "Reading Books",
  "Exploring New Tech",
  "Open Source",
  "AI / ML Experiments",
] as const;

/* ─────────────────────── intersection hook ─────────────────── */

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ───────────────────────── component ───────────────────────── */

export default function About() {
  const { ref, visible } = useReveal(0.05);

  const fade = (delay: number, extra = "") =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.55s ${delay}s ease, transform 0.55s ${delay}s ease ${extra}`,
    }) as React.CSSProperties;

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 md:py-28 px-6 md:px-10 overflow-hidden"
    >
      {/* ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[8%] right-[-5%] w-[420px] h-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(94,234,212,0.055) 0%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[5%] left-[-6%] w-[340px] h-[340px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(94,234,212,0.04) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* section label */}
        <div className="flex items-center gap-4 mb-4" style={fade(0.04)}>
          <span className="font-mono text-[11px] text-teal-300 tracking-[0.18em] uppercase">
            // about me
          </span>
          <span
            className="flex-1 h-[1px]"
            style={{ background: "linear-gradient(to right, #1A2B42, transparent)" }}
          />
        </div>

        {/* heading */}
        <h2
          className="leading-[1.05] tracking-tight text-[#E2DDD5] mb-3"
          style={{
            fontFamily: "var(--syne-var)",
            fontWeight: 800,
            fontSize: "clamp(28px, 4.8vw, 48px)",
            ...fade(0.12),
          }}
        >
          The mind behind{" "}
          <span className="text-teal-300">the code.</span>
        </h2>

        {/* sub-tagline */}
        <p
          className="font-mono text-[11.5px] text-[#4A6070] tracking-wide mb-10"
          style={fade(0.2)}
        >
          Final-year engineer · Full Stack Intern @ VeloxCore · Builder of things that actually work.
        </p>

        {/* ── TWO-COL GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-12">

          {/* ── LEFT ── */}
          <div style={fade(0.28)}>

            {/* current role badge */}
            <div className="flex items-start gap-3 bg-[#0B1623] border border-teal-300/20 rounded-xl px-4 py-3.5 mb-7">
              <span className="relative flex h-2.5 w-2.5 mt-[4px] shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-50" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-300" />
              </span>
              <div>
                <p
                  className="text-teal-300 text-[13px] font-semibold"
                  style={{ fontFamily: "var(--syne-var)" }}
                >
                  Currently @ VeloxCore Private Limited
                </p>
                <p className="font-mono text-[10.5px] text-[#4A6070] tracking-wide mt-0.5">
                  Full Stack Developer Intern · .NET + Angular
                </p>
              </div>
            </div>

            {/* bio */}
            <div className="space-y-4 text-[14.5px] text-[#6A6560] leading-[1.82] mb-8">
              <p>
                I&apos;m a full-stack developer who moves comfortably across the entire stack.
                At <span className="text-[#9A9585]">VeloxCore</span>, I work with{" "}
                <span className="text-teal-300/80">.NET</span> and{" "}
                <span className="text-teal-300/80">Angular</span> — architecting REST APIs and
                building component-driven frontends that handle real enterprise workloads. I own
                the full delivery: schema design, business logic, UI components, and everything
                wired together cleanly in between.
              </p>
              <p>
                My broader stack spans{" "}
                <span className="text-[#9A9585]">React, Next.js, Node.js, TypeScript,</span> and{" "}
                <span className="text-[#9A9585]">Flutter</span>. I pick the right tool for the
                job, not the trendy one. I care about code that&apos;s readable six months later,
                systems that don&apos;t fall over under pressure, and software that genuinely
                solves something worth solving.
              </p>
            </div>

            {/* interests */}
            <div>
              <p className="font-mono text-[10px] text-[#3D3730] tracking-[0.15em] uppercase mb-3">
                Outside the editor
              </p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10.5px] text-[#4A5A60] border border-[#131C2E] bg-[#0B1623] px-3 py-1.5 rounded-md hover:border-teal-300/30 hover:text-teal-300/70 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Education ── */}
          <div style={fade(0.38)}>
            <p className="font-mono text-[10px] text-[#3D3730] tracking-[0.15em] uppercase mb-5">
              Education
            </p>

            <div className="relative flex flex-col">
              {/* vertical line */}
              <div
                className="absolute left-[9px] top-3 bottom-3 w-[1px]"
                style={{ background: "linear-gradient(to bottom, #1A2B42 60%, transparent)" }}
              />

              {EDUCATION.map(({ degree, institute, board, period, score, current }) => (
                <div key={degree} className="flex gap-4 pb-5 last:pb-0">
                  {/* dot */}
                  <div className="relative z-10 shrink-0 mt-[6px]">
                    <span
                      className={`flex w-[18px] h-[18px] rounded-full border-2 items-center justify-center ${
                        current
                          ? "border-teal-300 bg-[#070B14]"
                          : "border-[#1A2B42] bg-[#0B1623]"
                      }`}
                    >
                      {current && (
                        <span className="w-[6px] h-[6px] rounded-full bg-teal-300 animate-pulse" />
                      )}
                    </span>
                  </div>

                  {/* card */}
                  <div
                    className={`flex-1 bg-[#0B1623] border rounded-xl px-4 py-3.5 hover:border-teal-300/20 transition-colors duration-300 ${
                      current ? "border-teal-300/25" : "border-[#131C2E]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <p
                        className="text-[#C8C3BA] text-[12.5px] font-semibold leading-snug"
                        style={{ fontFamily: "var(--syne-var)" }}
                      >
                        {degree}
                      </p>
                      {current && (
                        <span className="shrink-0 font-mono text-[9px] text-teal-300 border border-teal-300/30 bg-teal-300/5 px-2 py-0.5 rounded-full">
                          Now
                        </span>
                      )}
                    </div>
                    <p className="text-[#3A4A50] text-[11.5px] leading-snug mb-2">
                      {institute}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[9.5px] text-[#2D4050] tracking-wide">
                        {board} · {period}
                      </span>
                      <span className="font-mono text-[10px] text-teal-300/65">
                        {score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}