
// nitrajsinh-solanki/app/components/Hero.tsx

"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const ROLES = [
  "MERN Stack Developer",
  "TypeScript + Next.js Developer",
  "Flutter App Developer",
  "Angular + .NET Developer",
] as const;

export default function Hero() {
  const [displayed,  setDisplayed]  = useState("");
  const [deleting,   setDeleting]   = useState(false);
  const [roleIndex,  setRoleIndex]  = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Typewriter engine ── */
  useEffect(() => {
    const current = ROLES[roleIndex];

    const tick = () => {
      if (!deleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
          timerRef.current = setTimeout(tick, 68);
        } else {
          timerRef.current = setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed((d) => d.slice(0, -1));
          timerRef.current = setTimeout(tick, 38);
        } else {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % ROLES.length);
        }
      }
    };

    timerRef.current = setTimeout(tick, deleting ? 38 : 68);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 md:px-10 pt-16 overflow-hidden dot-grid"
    >
      {/* Ambient glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[15%] left-[-8%] w-[420px] h-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(94,234,212,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] right-[-5%] w-[360px] h-[360px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(94,234,212,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-8 items-center py-24 md:py-0">

        {/* ── LEFT: Text ── */}
        <div className="flex flex-col order-2 md:order-1">

          {/* Status badge */}
          <div className="anim-1 inline-flex items-center gap-2.5 self-start bg-[#0B1623] border border-[#1A2B42] px-4 py-[7px] rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-300" />
            </span>
            <span className="font-mono text-[10.5px] text-teal-300/90 tracking-[0.07em]">
              Intern @ VeloxCore Private Limited
            </span>
          </div>

          {/* Name */}
          <h1
            className="anim-2 leading-[1.0] tracking-tight text-[#E2DDD5] mb-4"
            style={{
              fontFamily: "var(--syne-var)",
              fontWeight: 800,
              fontSize: "clamp(46px, 7.5vw, 82px)",
            }}
          >
            Nitrajsinh
            <br />
            <span className="text-[#C8C3BA]">Solanki</span>
          </h1>

          {/* Typing roles */}
          <div className="anim-3 mb-6 h-8 flex items-center">
            <span className="font-mono text-sm text-[#6A9BAF] tracking-wide">
              {displayed}
              <span className="cursor-blink" />
            </span>
          </div>

          {/* Bio */}
          <p className="anim-4 text-[15px] text-[#524E4A] leading-[1.8] max-w-[440px] mb-10">
            Final year at GEC Patan, interning at VeloxCore. I build full-stack
            products that work — clean APIs, sharp frontends, and the kind of
            code you&apos;re not ashamed to revisit six months later.
          </p>

          {/* CTAs */}
          <div className="anim-5 flex flex-wrap gap-3">
            <a
              href="#projects"
              style={{ fontFamily: "var(--syne-var)" }}
              className="bg-teal-300 text-[#070B14] font-bold text-sm px-7 py-3.5 rounded-lg hover:opacity-85 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200"
            >
              View Projects
            </a>
            <a
              href="mailto:nrsolanki2005@gmail.com"
              style={{ fontFamily: "var(--syne-var)" }}
              className="border border-[#1F2E42] text-[#9A9585] font-medium text-sm px-7 py-3.5 rounded-lg hover:border-teal-300/60 hover:text-teal-300 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="anim-6 hidden md:flex items-center gap-3 mt-14">
            <div className="flex flex-col items-center gap-1">
              <span
                className="block w-[1px] h-8"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, #2A3A4A)",
                }}
              />
              <span className="block w-[5px] h-[5px] rounded-full bg-[#2A3A4A]" />
            </div>
            <span className="font-mono text-[10px] text-[#3A3A3A] tracking-[0.1em] uppercase">
              Scroll to explore
            </span>
          </div>
        </div>

        {/* ── RIGHT: Photo ── */}
        <div className="anim-img flex justify-center md:justify-end order-1 md:order-2">
          <div className="relative flex items-center justify-center">

            {/* Outer slow-pulse ring */}
            <span
              className="absolute rounded-full border border-teal-300/15"
              style={{
                width: "calc(100% + 48px)",
                height: "calc(100% + 48px)",
                animation: "ringPulse 3.5s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            <span
              className="absolute rounded-full border border-teal-300/10"
              style={{
                width: "calc(100% + 80px)",
                height: "calc(100% + 80px)",
                animation: "ringPulse 3.5s 0.8s ease-in-out infinite",
              }}
              aria-hidden="true"
            />

            {/* Rotating conic ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "-4px",
                background:
                  "conic-gradient(from 0deg, transparent 0%, #5EEAD4 25%, transparent 50%, #5EEAD4 75%, transparent 100%)",
                animation: "ringRotate 5s linear infinite",
                opacity: 0.3,
                borderRadius: "9999px",
              }}
              aria-hidden="true"
            />
            {/* Mask to hide inner part of ring */}
            <div
              className="absolute rounded-full bg-[#070B14]"
              style={{ inset: "3px", zIndex: 1, borderRadius: "9999px" }}
              aria-hidden="true"
            />

            {/* Photo */}
            <div
              className="relative overflow-hidden border-2 border-[#1A2B42]"
              style={{
                width: "clamp(240px, 28vw, 310px)",
                height: "clamp(240px, 28vw, 310px)",
                borderRadius: "9999px",
                zIndex: 2,
              }}
            >
              <Image
                src="/profile.jpg"
                alt="Nitrajsinh Solanki"
                fill
                className="object-cover"
                style={{ objectPosition: "center 12%" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}