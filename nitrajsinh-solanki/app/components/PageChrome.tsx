import Link from "next/link";
import { SOCIAL, SITE_NAME } from "@/lib/site";
import { profile } from "@/lib/profile";

const linkCls = "text-[#A5B0C0] hover:text-teal-300 transition-colors";

export function PageNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#070B14]/92 backdrop-blur-xl border-b border-[#131C2E]">
      <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-6 md:px-10">
        <Link href="/" style={{ fontFamily: "var(--syne-var)" }} className="font-extrabold text-xl tracking-tight text-[#E2DDD5]">
          NS<span className="text-teal-300">.</span>
        </Link>
        <div className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.07em]">
          <Link href="/about" className={linkCls}>About</Link>
          <Link href="/projects" className={linkCls}>Projects</Link>
          <Link href="/resume" className={linkCls}>Resume</Link>
          <a href={"mailto:" + profile.email} className="hidden sm:inline-block text-teal-300 border border-teal-300/60 px-4 py-2 rounded hover:bg-teal-300 hover:text-[#070B14] transition-colors">Hire Me</a>
        </div>
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
    <footer className="border-t border-[#111A28] px-8 md:px-12 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
      <span className="font-mono text-[11px] text-[#94A3B8] tracking-widest">© {new Date().getFullYear()} {SITE_NAME}</span>
      <div className="flex items-center gap-6 flex-wrap">
        {links.map(({ label, href }) => (
          <a key={label} href={href}
            rel={href.startsWith("http") ? "me noopener noreferrer" : undefined}
            target={href.startsWith("http") ? "_blank" : undefined}
            className="font-mono text-[11.5px] text-[#A5B0C0] hover:text-teal-300 transition-colors tracking-wide">{label}</a>
        ))}
      </div>
    </footer>
  );
}
