// nitrajsinh-solanki/app/components/Contact.tsx
"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────── data ──────────────────────────── */

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Nitrajsinh-Solanki",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: "#E2DDD5",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nitrajsinh-solanki-647b11293",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#60A5FA",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/Nitrajsinh_S",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "#E2DDD5",
  },
  {
    label: "Medium",
    href: "https://medium.com/@nrsolanki2005",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
    color: "#34D399",
  },
] as const;

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

/* ────────────────────────── component ───────────────────────── */

export default function Contact() {
  const { ref, visible } = useReveal(0.04);

  const [name,    setName]    = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const fade = (delay: number): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.55s ${delay}s ease, transform 0.55s ${delay}s ease`,
  });

  /* Opens the user's mail client with pre-filled fields */
  const handleOpenMail = () => {
    const to   = "nrsolanki2005@gmail.com";
    const sub  = encodeURIComponent(subject.trim() || "Hey Nitrajsinh — Let's Connect");
    const body = encodeURIComponent(
      `Hi Nitrajsinh,\n\n${message.trim()}\n\n— ${name.trim() || "A visitor from your portfolio"}`
    );
    const mailtoHref = `mailto:${to}?subject=${sub}&body=${body}`;

    /* Most reliable cross-browser approach: create a hidden <a> and click it */
    const a = document.createElement("a");
    a.href = mailtoHref;
    a.rel  = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const isReady = message.trim().length > 0;

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-20 md:py-28 px-6 md:px-10 overflow-hidden"
    >
      {/* ── ambient glows ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[5%] left-[-6%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(94,234,212,0.06) 0%, transparent 70%)",
          filter: "blur(65px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[0%] right-[-4%] w-[360px] h-[360px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── section label ── */}
        <div className="flex items-center gap-4 mb-4" style={fade(0.04)}>
          <span className="font-mono text-[11px] text-teal-300 tracking-[0.18em] uppercase select-none">
            // contact
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
          Let&apos;s build something{" "}
          <span className="text-teal-300">together.</span>
        </h2>

        {/* ── sub-tagline ── */}
        <p
          className="font-mono text-[11.5px] text-[#4A6070] tracking-wide mb-12"
          style={fade(0.2)}
        >
          Open for internships, freelance projects, and hackathon collabs — drop a line.
        </p>

        {/* ── TWO-COL GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-10">

          {/* ── LEFT: Contact form ── */}
          <div style={fade(0.28)}>
            <div className="bg-[#0B1623] border border-[#131C2E] rounded-2xl p-6 md:p-8 hover:border-teal-300/15 transition-colors duration-300">

              <p
                className="font-mono text-[9.5px] text-[#3D3730] tracking-[0.18em] uppercase mb-6"
              >
                Send a message
              </p>

              <div className="flex flex-col gap-4">

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="font-mono text-[10px] text-[#4A5060] tracking-[0.12em] uppercase"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full bg-[#080D18] border border-[#131C2E] rounded-xl px-4 py-3 font-mono text-[13px] text-[#C8C3BA] placeholder-[#2D3540] outline-none focus:border-teal-300/40 focus:bg-[#090E1A] transition-all duration-200 caret-teal-300"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="font-mono text-[10px] text-[#4A5060] tracking-[0.12em] uppercase"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Freelance project inquiry"
                    className="w-full bg-[#080D18] border border-[#131C2E] rounded-xl px-4 py-3 font-mono text-[13px] text-[#C8C3BA] placeholder-[#2D3540] outline-none focus:border-teal-300/40 focus:bg-[#090E1A] transition-all duration-200 caret-teal-300"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[10px] text-[#4A5060] tracking-[0.12em] uppercase"
                  >
                    Message <span className="text-teal-300/50">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me what you're building, what you need, or just say hi..."
                    className="w-full bg-[#080D18] border border-[#131C2E] rounded-xl px-4 py-3 font-mono text-[13px] text-[#C8C3BA] placeholder-[#2D3540] outline-none focus:border-teal-300/40 focus:bg-[#090E1A] transition-all duration-200 caret-teal-300 resize-none leading-relaxed"
                  />
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <p className="font-mono text-[10px] text-[#2D3540] tracking-wide leading-relaxed max-w-[200px]">
                    Opens your mail client with the message pre-filled.
                  </p>
                  <button
                    onClick={handleOpenMail}
                    disabled={!isReady}
                    className={`group flex items-center gap-2.5 font-mono text-[11px] tracking-widest px-5 py-3 rounded-xl border transition-all duration-200 ${
                      isReady
                        ? "text-[#070B14] bg-teal-300 border-teal-300 hover:bg-teal-200 hover:border-teal-200 cursor-pointer"
                        : "text-[#3A4050] bg-[#080D18] border-[#131C2E] cursor-not-allowed"
                    }`}
                  >
                    Open in Mail
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${isReady ? "group-hover:translate-x-0.5" : ""}`}
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Info + Socials ── */}
          <div className="flex flex-col gap-5" style={fade(0.36)}>

            {/* Direct email card */}
            <div className="bg-[#0B1623] border border-[#131C2E] rounded-2xl p-5 hover:border-teal-300/20 transition-colors duration-300">
              <p className="font-mono text-[9.5px] text-[#3D3730] tracking-[0.18em] uppercase mb-4">
                Direct Email
              </p>
              <a
                href="mailto:nrsolanki2005@gmail.com"
                className="group flex items-center gap-3 text-teal-300 hover:text-teal-200 transition-colors duration-200"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-300/10 border border-teal-300/20 group-hover:bg-teal-300/15 transition-colors duration-200 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span
                  className="font-mono text-[11.5px] tracking-wide break-all"
                  style={{ fontFamily: "var(--dm-mono-var)" }}
                >
                  nrsolanki2005@gmail.com
                </span>
              </a>

              {/* availability badge */}
              <div className="mt-4 flex items-center gap-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-300" />
                </span>
                <span className="font-mono text-[10px] text-[#4A6070] tracking-wide">
                  Open to opportunities
                </span>
              </div>
            </div>

            {/* Social links card */}
            <div className="bg-[#0B1623] border border-[#131C2E] rounded-2xl p-5 hover:border-teal-300/20 transition-colors duration-300">
              <p className="font-mono text-[9.5px] text-[#3D3730] tracking-[0.18em] uppercase mb-4">
                Find me on
              </p>
              <div className="flex flex-col gap-2">
                {SOCIAL_LINKS.map(({ label, href, icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 py-2 px-3 rounded-xl border border-transparent hover:border-[#1A2B42] hover:bg-[#080D18] transition-all duration-200"
                  >
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-lg border border-[#131C2E] bg-[#080D18] group-hover:border-[#1A2B42] transition-colors duration-200 shrink-0"
                      style={{ color }}
                    >
                      {icon}
                    </span>
                    <span className="font-mono text-[11.5px] text-[#5A5450] group-hover:text-[#C8C3BA] transition-colors duration-200 tracking-wide">
                      {label}
                    </span>
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-auto text-[#2D3540] group-hover:text-[#4A5060] transition-colors duration-200"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick response note */}
            <div className="bg-[#080D18] border border-[#0F1620] rounded-2xl px-5 py-4">
              <p className="font-mono text-[10px] text-[#2D3540] leading-[1.8] tracking-wide">
                <span className="text-teal-300/50">$</span>{" "}
                I typically respond within{" "}
                <span className="text-[#4A5060]">24 hours.</span>{" "}
                Best for internship inquiries, freelance scoping, or hackathon team-ups.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}