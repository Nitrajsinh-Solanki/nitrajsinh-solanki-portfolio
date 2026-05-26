// nitrajsinh-solanki/app/components/Hero.tsx
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ─────────────────────── typewriter roles ───────────────────── */
const ROLES = [
  "MERN Stack Developer",
  "TypeScript + Next.js Developer",
  "Flutter App Developer",
  "Angular + .NET Developer",
] as const;

/* ── Short labels shown inside the const dev card ── */
const CARD_ROLES = [
  "MERN",
  "Next.js",
  "Flutter",
  ".NET",
] as const;

/* ──────────────── floating particle canvas ─────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; pulse: number;
    }[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.pulse += 0.018;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94,234,212,${a})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(94,234,212,${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

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
          background: "linear-gradient(to right, #5EEAD4, #A78BFA)",
        }}
      />
    </div>
  );
}

/* ─────────────────────── stat chip ─────────────────────────── */
function StatChip({
  value, label, color, delay,
}: {
  value: string; label: string; color: string; delay: number;
}) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      className="flex flex-col items-center px-5 py-3 rounded-2xl border border-[#131C2E] bg-[#0A1020]/60 backdrop-blur-sm"
    >
      <span
        className="text-[22px] font-extrabold leading-none mb-0.5"
        style={{ fontFamily: "var(--syne-var)", color }}
      >
        {value}
      </span>
      <span className="font-mono text-[9px] text-[#3A5060] tracking-widest uppercase">{label}</span>
    </div>
  );
}

/* ─── Cycling role label for the const dev card ─── */
function CyclingCardRole() {
  const [index, setIndex] = useState(0);
  const [fade, setFade]   = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out → swap → fade in
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % CARD_ROLES.length);
        setFade(true);
      }, 280);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="text-[#F472B6]"
      style={{
        display: "inline-block",
        opacity: fade ? 1 : 0,
        transform: fade ? "translateY(0)" : "translateY(-4px)",
        transition: "opacity 0.28s ease, transform 0.28s ease",
      }}
    >
      &quot;{CARD_ROLES[index]}&quot;
    </span>
  );
}

/* ─────────────────────── main component ─────────────────────── */
export default function Hero() {
  const [displayed,  setDisplayed]  = useState("");
  const [deleting,   setDeleting]   = useState(false);
  const [roleIndex,  setRoleIndex]  = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIndex];
    const tick = () => {
      if (!deleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
          timerRef.current = setTimeout(tick, 65);
        } else {
          timerRef.current = setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed((d) => d.slice(0, -1));
          timerRef.current = setTimeout(tick, 36);
        } else {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % ROLES.length);
        }
      }
    };
    timerRef.current = setTimeout(tick, deleting ? 36 : 65);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed, deleting, roleIndex]);

  return (
    <>
      <ScrollProgress />

      <section
        id="hero"
        className="relative min-h-screen flex items-center px-6 md:px-10 pt-16 overflow-hidden"
        style={{ background: "#070B14" }}
      >
        {/* ── Canvas particle field ── */}
        <ParticleCanvas />

        {/* ── Dot grid ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: "radial-gradient(circle, #162030 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* ── Large background text watermark ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-2%] left-[-1%] select-none"
          style={{
            fontFamily: "var(--syne-var)",
            fontWeight: 900,
            fontSize: "clamp(90px, 16vw, 200px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(94,234,212,0.04)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          NS.
        </div>

        {/* ── Glowing orbs ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[12%] left-[-6%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(94,234,212,0.07) 0%, transparent 68%)",
            filter: "blur(50px)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[8%] right-[-4%] w-[420px] h-[420px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 68%)",
            filter: "blur(50px)",
          }}
        />

        {/* ── Vertical accent line (desktop) ── */}
        <div
          aria-hidden="true"
          className="hidden lg:block pointer-events-none absolute left-[50%] top-[15%] bottom-[15%] w-[1px]"
          style={{ background: "linear-gradient(to bottom, transparent, #1A2B42 30%, #1A2B42 70%, transparent)" }}
        />

        {/* ─────────────── Main grid ─────────────── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-24 lg:py-0">

          {/* ══════ LEFT: Text ══════ */}
          <div className="flex flex-col order-2 lg:order-1">

            {/* Status badge */}
            <div className="anim-1 inline-flex items-center gap-2.5 self-start bg-[#0B1623] border border-[#1A2B42] px-4 py-[7px] rounded-full mb-7">
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
              className="anim-2 leading-[0.98] tracking-tight mb-3"
              style={{
                fontFamily: "var(--syne-var)",
                fontWeight: 800,
                fontSize: "clamp(50px, 7.8vw, 90px)",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #E2DDD5 0%, #C8C3BA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Nitrajsinh
              </span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #5EEAD4 0%, #38BDF8 60%, #A78BFA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Solanki
              </span>
            </h1>

            {/* Separator line */}
            <div
              className="anim-3 mb-5 h-[1px] w-24"
              style={{ background: "linear-gradient(to right, #5EEAD4, transparent)" }}
            />

            {/* Typing roles */}
            <div className="anim-3 mb-5 h-7 flex items-center">
              <span
                className="font-mono text-[13px] tracking-wide"
                style={{ color: "#6A9BAF" }}
              >
                &gt;_{" "}{displayed}
                <span className="cursor-blink" />
              </span>
            </div>

            {/* Bio */}
            <p className="anim-4 text-[14.5px] text-[#524E4A] leading-[1.85] max-w-[430px] mb-8">
              Final year at GEC Patan, interning at VeloxCore. I build full-stack
              products that work — clean APIs, sharp frontends, and the kind of
              code you&apos;re not ashamed to revisit six months later.
            </p>

            {/* CTAs */}
            <div className="anim-5 flex flex-wrap gap-3 mb-10">
              <a
                href="#projects"
                style={{ fontFamily: "var(--syne-var)" }}
                className="relative group inline-flex items-center gap-2 bg-teal-300 text-[#070B14] font-bold text-[13px] px-7 py-3.5 rounded-xl hover:opacity-90 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200 overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
                />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 6h16M4 10h16M4 14h10" />
                </svg>
                View Projects
              </a>
              <a
                href="mailto:nrsolanki2005@gmail.com"
                style={{ fontFamily: "var(--syne-var)" }}
                className="inline-flex items-center gap-2 border border-[#1F2E42] text-[#9A9585] font-medium text-[13px] px-7 py-3.5 rounded-xl hover:border-teal-300/50 hover:text-teal-300 hover:-translate-y-[2px] active:translate-y-0 transition-all duration-200"
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
                className="flex items-center justify-center w-[50px] h-[50px] border border-[#1F2E42] rounded-xl text-[#5A5450] hover:border-teal-300/40 hover:text-teal-300 hover:-translate-y-[2px] transition-all duration-200"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>

            {/* ── Stats row ── */}
            <div className="anim-6 flex items-center gap-3 flex-wrap">
              <StatChip value="10"    label="Projects"   color="#5EEAD4" delay={700} />
              <StatChip value="$250+" label="Prizes Won" color="#F472B6" delay={820} />
              <StatChip value="3"     label="Live Apps"  color="#A78BFA" delay={940} />

              {/* Scroll cue */}
              <div className="hidden lg:flex items-center gap-2 ml-auto">
                <div className="flex flex-col items-center gap-[3px]">
                  <span className="block w-[1px] h-6" style={{ background: "linear-gradient(to bottom, transparent, #2A3A4A)" }} />
                  <span className="block w-[4px] h-[4px] rounded-full bg-[#2A3A4A]" />
                </div>
                <span className="font-mono text-[9px] text-[#2A3A4A] tracking-[0.12em] uppercase">scroll</span>
              </div>
            </div>
          </div>

          {/* ══════ RIGHT: Photo + floating code card ══════ */}
          <div className="anim-img flex justify-center lg:justify-end order-1 lg:order-2 relative">

            {/* ── Floating "const dev" card — top left, with cycling roles ── */}
            <div
              className="absolute top-0 left-0 lg:-left-8 z-20 hidden sm:block"
              style={{ animation: "floatA 5s ease-in-out infinite" }}
            >
              <div className="bg-[#0B1623]/90 backdrop-blur border border-[#1A2B42] rounded-xl px-4 py-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F56]/70" />
                  <span className="w-2 h-2 rounded-full bg-[#FEBC2E]/70" />
                  <span className="w-2 h-2 rounded-full bg-[#27C840]/70" />
                </div>
                <p className="font-mono text-[10px] text-[#3A5A70] leading-[1.8]">
                  <span className="text-teal-300">const</span>{" "}
                  <span className="text-[#60A5FA]">dev</span>{" "}
                  <span className="text-[#E2DDD5]">= {"{"}</span>
                  <br />
                  <span className="pl-3 text-[#E2DDD5]">stack:</span>{" "}
                  {/* ↓ Cycling role label */}
                  <CyclingCardRole />
                  <span className="text-[#E2DDD5]">,</span>
                  <br />
                  <span className="pl-3 text-[#E2DDD5]">ready:</span>{" "}
                  <span className="text-[#5EEAD4]">true</span>
                  <br />
                  <span className="text-[#E2DDD5]">{"}"}</span>
                </p>
              </div>
            </div>

            {/* ── Photo ring system (clean — no overlapping badges) ── */}
            <div className="relative flex items-center justify-center">

              {/* Outer rings — pulse */}
              <span
                className="absolute rounded-full border border-teal-300/10"
                style={{
                  width: "calc(100% + 56px)", height: "calc(100% + 56px)",
                  animation: "ringPulse 3.5s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
              <span
                className="absolute rounded-full border border-teal-300/06"
                style={{
                  width: "calc(100% + 96px)", height: "calc(100% + 96px)",
                  animation: "ringPulse 3.5s 1s ease-in-out infinite",
                }}
                aria-hidden="true"
              />

              {/* Rotating conic gradient ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: "-5px",
                  background: "conic-gradient(from 0deg, transparent 0%, #5EEAD4 20%, transparent 40%, #A78BFA 60%, transparent 80%, #5EEAD4 100%)",
                  animation: "ringRotate 6s linear infinite",
                  opacity: 0.35,
                  borderRadius: "9999px",
                }}
                aria-hidden="true"
              />
              {/* Inner mask */}
              <div
                className="absolute bg-[#070B14]"
                style={{ inset: "4px", zIndex: 1, borderRadius: "9999px" }}
                aria-hidden="true"
              />

              {/* Decorative dots around the ring */}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <span
                  key={deg}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: deg % 120 === 0 ? "#5EEAD4" : "#1A2B42",
                    zIndex: 3,
                    transform: `rotate(${deg}deg) translateY(calc(-50% - clamp(120px, 14vw, 155px)))`,
                    opacity: deg % 120 === 0 ? 0.8 : 0.4,
                  }}
                  aria-hidden="true"
                />
              ))}

              {/* Photo */}
              <div
                className="relative overflow-hidden border-2 border-[#1A2B42]"
                style={{
                  width: "clamp(240px, 28vw, 300px)",
                  height: "clamp(240px, 28vw, 300px)",
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
                {/* Overlay gradient at bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3"
                  style={{ background: "linear-gradient(to top, rgba(7,11,20,0.4), transparent)" }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom gradient fade ── */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to top, #070B14, transparent)" }}
        />

        {/* ── Float / ring animation keyframes ── */}
        <style>{`
          @keyframes floatA {
            0%, 100% { transform: translateY(0px) rotate(-1deg); }
            50%       { transform: translateY(-10px) rotate(1deg); }
          }
          @keyframes ringPulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50%       { opacity: 1;   transform: scale(1.03); }
          }
          @keyframes ringRotate {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    </>
  );
}