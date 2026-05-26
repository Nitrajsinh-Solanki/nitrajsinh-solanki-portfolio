// nitrajsinh-solanki/app/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "About",        href: "#about",       isRoute: false },
  { label: "Tech Stack",   href: "#tech-stack",  isRoute: false },
  { label: "Projects",     href: "/projects",    isRoute: true  },
  { label: "Services",     href: "#services",    isRoute: false },
  { label: "Work History", href: "#work-history",isRoute: false },
  { label: "Contact",      href: "#contact",     isRoute: false },
] as const;

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

  // helper — is this link currently active?
  const isActive = (href: string, isRoute: boolean) => {
    if (isRoute) return pathname === href;
    return active === href;
  };

  const linkClass = (href: string, isRoute: boolean) =>
    `font-mono text-[11px] tracking-[0.07em] uppercase transition-colors duration-200 ${
      isActive(href, isRoute)
        ? "text-teal-300"
        : "text-[#6A6560] hover:text-[#C8C3BA]"
    }`;

  const mobileLinkClass = (href: string, isRoute: boolean) =>
    `font-mono text-[12px] tracking-widest uppercase py-2.5 border-b border-[#0F1620] transition-colors ${
      isActive(href, isRoute) ? "text-teal-300" : "text-[#7A7570] hover:text-teal-300"
    }`;

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070B14]/92 backdrop-blur-xl border-b border-[#131C2E]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-6 md:px-10">

        {/* Logo — always goes home */}
        <Link
          href="/"
          style={{ fontFamily: "var(--syne-var)" }}
          className="font-extrabold text-xl tracking-tight text-[#E2DDD5] select-none shrink-0"
        >
          NS<span className="text-teal-300">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href, isRoute }) =>
            isRoute ? (
              <Link
                key={label}
                href={href}
                className={linkClass(href, true)}
              >
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
        <div className="flex items-center gap-4">
          <a
            href="mailto:nrsolanki2005@gmail.com"
            className="hidden sm:inline-block font-mono text-[11px] text-teal-300 border border-teal-300/60 px-4 py-2 rounded hover:bg-teal-300 hover:text-[#070B14] transition-all duration-200 tracking-widest"
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-[#9A9585] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#9A9585] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-[#9A9585] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#070B14]/96 border-b border-[#131C2E] ${
          menuOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6">
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
          <a
            href="mailto:nrsolanki2005@gmail.com"
            className="mt-3 font-mono text-[11px] text-teal-300 border border-teal-300/60 px-4 py-2.5 rounded text-center tracking-widest"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}