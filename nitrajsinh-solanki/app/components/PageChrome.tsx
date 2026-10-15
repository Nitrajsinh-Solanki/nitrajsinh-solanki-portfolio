import Link from "next/link";
import { SOCIAL, SITE_NAME } from "@/lib/site";
import { profile } from "@/lib/profile";

const linkCls = "text-[#555963] hover:text-indigo-600 transition-colors";

export function PageNav() {
  const links = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Resume", href: "/resume" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#F8F7F3] border-b border-[#E3E0D8]">
      <div className="relative max-w-6xl mx-auto min-h-16 flex items-center justify-between gap-4 px-4 sm:px-6 md:px-10 py-3">
        <Link
          href="/"
          style={{ fontFamily: "var(--syne-var)" }}
          className="font-extrabold text-xl tracking-tight text-[#17191D] shrink-0"
        >
          NS<span className="text-indigo-600">.</span>
        </Link>

        <div className="hidden sm:flex items-center justify-end gap-4 md:gap-5 font-sans text-[14px] font-medium min-w-0">
          {links.map(({ label, href }) => (
            <Link key={href} href={href} className={linkCls}>
              {label}
            </Link>
          ))}
          <a
            href={"mailto:" + profile.email}
            className="hidden md:inline-flex font-sans text-[13px] font-medium text-indigo-600 border border-indigo-600/60 px-3 md:px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors whitespace-nowrap"
          >
            Hire Me
          </a>
        </div>

        <details className="sm:hidden relative shrink-0">
          <summary className="list-none cursor-pointer inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#E3E0D8] bg-white px-3 text-[13px] font-medium text-[#555963] [&::-webkit-details-marker]:hidden">
            Menu
            <span aria-hidden="true" className="text-indigo-600">☰</span>
          </summary>
          <div className="absolute right-0 top-full mt-2 z-50 w-[min(16rem,calc(100vw-2rem))] rounded-xl border border-[#E3E0D8] bg-[#F8F7F3] p-3 shadow-xl">
            <div className="flex flex-col">
              {links.map(({ label, href }) => (
                <Link key={href} href={href} className="rounded-lg px-3 py-3 text-sm text-[#555963] hover:bg-[#F0EEE8] hover:text-indigo-600">
                  {label}
                </Link>
              ))}
              <a href={"mailto:" + profile.email} className="mt-2 rounded-lg bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white">
                Hire Me
              </a>
            </div>
          </div>
        </details>
      </div>
    </nav>
  );
}

export function PageFooter() {
  const links = [
    { label: "GitHub", href: SOCIAL.github },
    { label: "LinkedIn", href: SOCIAL.linkedin },
    { label: "X", href: SOCIAL.x },
    { label: "Medium", href: SOCIAL.medium },
    { label: profile.email, href: "mailto:" + profile.email },
  ];
  return (
    <footer className="border-t border-[#E3E0D8] px-8 md:px-12 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
      <span className="font-mono text-[11px] text-[#686D76] tracking-widest">© {new Date().getFullYear()} {SITE_NAME}</span>
      <div className="flex items-center gap-6 flex-wrap">
        {links.map(({ label, href }) => (
          <a key={label} href={href}
            rel={href.startsWith("http") ? "me noopener noreferrer" : undefined}
            target={href.startsWith("http") ? "_blank" : undefined}
            className="font-sans text-[13px] text-[#555963] hover:text-indigo-600 transition-colors">{label}</a>
        ))}
      </div>
    </footer>
  );
}
