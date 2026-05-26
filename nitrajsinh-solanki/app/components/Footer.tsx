// nitrajsinh-solanki/app/components/Footer.tsx

const SOCIAL_LINKS = [
  { label: "GitHub",                  href: "https://github.com/Nitrajsinh-Solanki" },
  { label: "LinkedIn",                href: "https://www.linkedin.com/in/nitrajsinh-solanki-647b11293" },
  { label: "X",                       href: "https://x.com/Nitrajsinh_S" },
  { label: "Medium",                  href: "https://medium.com/@nrsolanki2005" },
  { label: "nrsolanki2005@gmail.com", href: "mailto:nrsolanki2005@gmail.com" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-[#111A28] px-8 md:px-12 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
      {/* Copyright */}
      <span className="font-mono text-[11px] text-[#3A3530] tracking-widest">
        © {new Date().getFullYear()} Nitrajsinh Solanki
      </span>

      {/* Links */}
      <div className="flex items-center gap-6 flex-wrap">
        {SOCIAL_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="font-mono text-[11.5px] text-[#5A5450] hover:text-teal-300 transition-colors duration-200 tracking-wide"
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}