import Link from "next/link";
import { SOCIAL } from "@/lib/site";
import { profile } from "@/lib/profile";

const INTERNAL_LINKS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
];
const SOCIAL_LINKS = [
  { label: "GitHub", href: SOCIAL.github },
  { label: "LinkedIn", href: SOCIAL.linkedin },
  { label: "X", href: SOCIAL.x },
  { label: "Medium", href: SOCIAL.medium },
  { label: profile.email, href: "mailto:" + profile.email },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#111A28] px-8 md:px-12 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
      <span className="font-mono text-[11px] text-[#3A3530] tracking-widest">© {new Date().getFullYear()} Nitrajsinh Solanki</span>
      <div className="flex items-center gap-6 flex-wrap">
        {INTERNAL_LINKS.map(({ label, href }) => (
          <Link key={href} href={href} className="font-mono text-[11.5px] text-[#5A5450] hover:text-teal-300 transition-colors duration-200 tracking-wide">{label}</Link>
        ))}
        {SOCIAL_LINKS.map(({ label, href }) => (
          <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "me noopener noreferrer" : undefined}
            className="font-mono text-[11.5px] text-[#5A5450] hover:text-teal-300 transition-colors duration-200 tracking-wide">{label}</a>
        ))}
      </div>
    </footer>
  );
}
