// nitrajsinh-solanki/app/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RESUME_URL = "/Nitrajsinh_Solanki_Resume.pdf";

const NAV_LINKS = [
  { label: "About",        href: "#about",        isRoute: false },
  { label: "Tech Stack",   href: "#tech-stack",   isRoute: false },
  { label: "Projects",     href: "/projects",     isRoute: true  },
  { label: "Resume",       href: "/resume",       isRoute: true  },
  { label: "Services",     href: "#services",     isRoute: false },
  { label: "Work History", href: "#work-history", isRoute: false },
  { label: "Contact",      href: "#contact",      isRoute: false },
] as const;

// ── Download icon ──────────────────────────────────────────────
function DownloadIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

// ── Resume button (desktop) ────────────────────────────────────
function ResumeActions() {
  return (
    <div className="hidden sm:flex items-center gap-1 bg-[#FFFFFF] border border-[#E3E0D8] rounded-lg overflow-hidden">
      {/* View */}
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View resume (PDF)"
        className="font-sans text-[13px] font-medium text-indigo-600 px-3 py-[7px] hover:bg-indigo-600 hover:text-white transition-colors duration-200"
      >
        Resume
      </a>

      {/* Divider */}
      <span className="w-px h-5 bg-[#E3E0D8]" aria-hidden="true" />

      {/* Download */}
      <a
        href={RESUME_URL}
        download="Nitrajsinh_Solanki_Resume.pdf"
        className="flex items-center justify-center px-2.5 py-[7px] text-[#555963] hover:text-indigo-600 hover:bg-indigo-600/10 transition-all duration-200"
        aria-label="Download resume (PDF)"
        title="Download Resume"
      >
        <DownloadIcon />
      </a>
    </div>
  );
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string, isRoute: boolean) => {
    if (isRoute) return pathname === href;
    return active === href;
  };

  const linkClass = (href: string, isRoute: boolean) =>
    `font-sans text-[14px] font-medium tracking-normal transition-colors duration-200 ${
      isActive(href, isRoute)
        ? "text-indigo-600"
        : "text-[#555963] hover:text-indigo-600"
    }`;

  const mobileLinkClass = (href: string, isRoute: boolean) =>
    `font-sans text-[14px] font-medium tracking-normal py-3 border-b border-[#E3E0D8] transition-colors ${
      isActive(href, isRoute) ? "text-indigo-600" : "text-[#555963] hover:text-indigo-600"
    }`;

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F8F7F3] border-b border-[#E3E0D8]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto h-16 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-10">

        {/* Logo */}
        <Link
          href="/"
          style={{ fontFamily: "var(--syne-var)" }}
          className="font-extrabold text-xl tracking-tight text-[#17191D] select-none shrink-0"
        >
          NS<span className="text-indigo-600">.</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href, isRoute }) =>
            isRoute ? (
              <Link key={label} href={href} className={linkClass(href, true)}>
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                onClick={() => setActive(href)}
                className={linkClass(href, false)}
              >
                {label}
              </a>
            )
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Resume — view + download split button */}
          <ResumeActions />

          {/* Hire Me */}
          <a
            href="mailto:nrsolanki2005@gmail.com"
            className="hidden lg:inline-block font-sans text-[13px] font-medium text-[#17191D] hover:text-indigo-600 border border-[#E3E0D8] px-4 py-[7px] rounded-lg transition-colors duration-200"
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="primary-mobile-menu"
          >
            <span className={`block w-5 h-[1.5px] bg-[#686D76] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#686D76] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#686D76] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="primary-mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#F8F7F3] border-b border-[#E3E0D8] ${
          menuOpen ? "max-h-[32rem] py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 sm:px-6">
          {NAV_LINKS.map(({ label, href, isRoute }) =>
            isRoute ? (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass(href, true)}
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                onClick={() => { setActive(href); setMenuOpen(false); }}
                className={mobileLinkClass(href, false)}
              >
                {label}
              </a>
            )
          )}

          {/* Resume row in mobile menu */}
          <div className="mt-3 flex gap-2">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume (PDF)"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center font-sans text-[13px] font-medium text-indigo-600 border border-indigo-600/60 px-4 py-2.5 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200"
            >
              View Resume
            </a>
            <a
              href={RESUME_URL}
              download="Nitrajsinh_Solanki_Resume.pdf"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-10 h-10 border border-[#E3E0D8] rounded-lg text-[#555963] hover:text-indigo-600 hover:border-indigo-600/40 transition-all duration-200"
              aria-label="Download resume (PDF)"
            >
              <DownloadIcon />
            </a>
          </div>

          <a
            href="mailto:nrsolanki2005@gmail.com"
            className="mt-2 font-mono text-[11px] text-[#555963] border border-[#E3E0D8] px-4 py-2.5 rounded-lg text-center tracking-widest"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}