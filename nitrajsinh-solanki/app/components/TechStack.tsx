// nitrajsinh-solanki/app/components/TechStack.tsx
"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────── types ──────────────────────────── */

type Category =
  | "All"
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Auth & Security"
  | "AI & APIs"
  | "Mobile"
  | "Blockchain"
  | "Infra & Cloud"
  | "Tools";

interface Skill {
  name: string;
  cat: Exclude<Category, "All">;
  projects: number;
  note?: string;
  core?: boolean;
  /** Full URL to a devicon / simple-icons logo */
  icon?: string;
  /** Optional CSS filter applied to the <img> — use "invert(1)" for black logos on dark bg */
  iconFilter?: string;
}

/* ──────────────── icon CDN helpers ───────────────────────────── */

const DI = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

/** simple-icons with an explicit hex colour (no #) */
const SI = (slug: string, hex = "ffffff") =>
  `https://cdn.simpleicons.org/${slug}/${hex}`;

/* ──────────────────────────── data ───────────────────────────── */

const SKILLS: Skill[] = [
  // ── Languages ──────────────────────────────────────────────────
  { name: "JavaScript",   cat: "Languages", projects: 8, core: true,  icon: DI("javascript")              },
  { name: "TypeScript",   cat: "Languages", projects: 6, core: true,  icon: DI("typescript")              },
  { name: "Dart",         cat: "Languages", projects: 2,              icon: DI("dart")                    },
  { name: "Rust",         cat: "Languages", projects: 1,              icon: SI("rust","F74C00")            },
  { name: "Move (Aptos)", cat: "Languages", projects: 1                                                    },
  { name: "Java",         cat: "Languages", projects: 0, note: "Academic", icon: DI("java")               },
  { name: "C",            cat: "Languages", projects: 0, note: "Academic", icon: DI("c")                  },

  // ── Frontend ───────────────────────────────────────────────────
  { name: "React.js",          cat: "Frontend", projects: 6, core: true, icon: DI("react")               },
  { name: "Next.js",           cat: "Frontend", projects: 5, core: true, icon: SI("nextdotjs","E2DDD5")   },
  { name: "Angular",           cat: "Frontend", projects: 0, core: true, note: "Internship", icon: DI("angularjs") },
  { name: "Tailwind CSS",      cat: "Frontend", projects: 6, core: true, icon: SI("tailwindcss","38BDF8") },
  { name: "Vite",              cat: "Frontend", projects: 2,             icon: DI("vitejs")               },
  { name: "Leaflet.js",        cat: "Frontend", projects: 1,             icon: SI("leaflet","199900")     },
  { name: "Canvas API",        cat: "Frontend", projects: 1                                               },
  { name: "jsPDF",             cat: "Frontend", projects: 1                                               },
  { name: "Lucide React",      cat: "Frontend", projects: 2,             icon: SI("lucide","F56565")      },
  { name: "react-router-dom",  cat: "Frontend", projects: 2,             icon: SI("reactrouter","CA4245") },

  // ── Backend ────────────────────────────────────────────────────
  { name: "Node.js",             cat: "Backend", projects: 5, core: true, icon: DI("nodejs")               },
  { name: "Express.js",          cat: "Backend", projects: 3, core: true, icon: SI("express","ffffff")      },
  { name: "Next.js API Routes",  cat: "Backend", projects: 5, core: true, icon: SI("nextdotjs","E2DDD5")   },
  { name: ".NET / ASP.NET Core", cat: "Backend", projects: 0, core: true, note: "Internship", icon: DI("dotnetcore") },
  { name: "REST API Design",     cat: "Backend", projects: 7, core: true                                   },
  { name: "TcpListener (Rust)",  cat: "Backend", projects: 1,             icon: SI("rust","F74C00")         },
  { name: "Custom HTTP Parser",  cat: "Backend", projects: 1                                               },

  // ── Database ───────────────────────────────────────────────────
  { name: "MongoDB",      cat: "Database", projects: 6, core: true, icon: DI("mongodb")                  },
  { name: "Mongoose ODM", cat: "Database", projects: 3,             icon: SI("mongoose","880000")         },
  { name: "MySQL",        cat: "Database", projects: 0, note: "Academic", icon: DI("mysql")              },

  // ── Auth & Security ────────────────────────────────────────────
  { name: "JWT",                cat: "Auth & Security", projects: 7, core: true, icon: SI("jsonwebtokens","ffffff") },
  { name: "OTP Email Auth",     cat: "Auth & Security", projects: 5, core: true                                    },
  { name: "NextAuth",           cat: "Auth & Security", projects: 1,             icon: SI("authjs","ffffff")        },
  { name: "Session Management", cat: "Auth & Security", projects: 3                                               },
  { name: "Cookies / RBAC",     cat: "Auth & Security", projects: 2                                               },

  // ── AI & APIs ──────────────────────────────────────────────────
  { name: "Google Gemini AI",        cat: "AI & APIs", projects: 3, core: true, icon: SI("googlegemini","8E75B2")   },
  { name: "AssemblyAI",              cat: "AI & APIs", projects: 1,             icon: SI("assemblyai","ffffff")      },
  { name: "HuggingFace Bart CNN",    cat: "AI & APIs", projects: 1,             icon: SI("huggingface","FFD21E")     },
  { name: "Deepgram API",            cat: "AI & APIs", projects: 1,             icon: SI("deepgram","13EF93")        },
  { name: "GBIF API",                cat: "AI & APIs", projects: 1                                                  },
  { name: "PubChem API",             cat: "AI & APIs", projects: 1                                                  },
  { name: "NASA Images API",         cat: "AI & APIs", projects: 1,             icon: SI("nasa","E03C31")            },
  { name: "iNaturalist API",         cat: "AI & APIs", projects: 1                                                  },
  { name: "OpenWeather API",         cat: "AI & APIs", projects: 1,             icon: SI("openweathermap","E96E50")  },
  { name: "Pexels API",              cat: "AI & APIs", projects: 1,             icon: SI("pexels","05A081")          },
  { name: "FCM Push Notifications",  cat: "AI & APIs", projects: 2,             icon: DI("firebase")                },
  { name: "Jamendo / Deezer / Audius", cat: "AI & APIs", projects: 1                                               },
  { name: "Wikipedia API",           cat: "AI & APIs", projects: 1,             icon: SI("wikipedia","aaaaaa")       },

  // ── Mobile ─────────────────────────────────────────────────────
  { name: "Flutter",             cat: "Mobile", projects: 2, core: true, icon: DI("flutter")               },
  { name: "Provider (State)",    cat: "Mobile", projects: 1                                                 },
  { name: "Dio HTTP Client",     cat: "Mobile", projects: 1                                                 },
  { name: "Background Location", cat: "Mobile", projects: 1                                                 },
  { name: "Firebase FCM",        cat: "Mobile", projects: 1,             icon: DI("firebase")               },
  { name: "SharedPreferences",   cat: "Mobile", projects: 1                                                 },

  // ── Blockchain ─────────────────────────────────────────────────
  { name: "Aptos Blockchain",                    cat: "Blockchain", projects: 1 },
  { name: "Move Language",                       cat: "Blockchain", projects: 1 },
  { name: "Petra Wallet",                        cat: "Blockchain", projects: 1 },
  { name: "Aptos CLI",                           cat: "Blockchain", projects: 1 },
  { name: "@aptos-labs/wallet-adapter-react",    cat: "Blockchain", projects: 1 },

  // ── Infra & Cloud ──────────────────────────────────────────────
  { name: "Vercel",             cat: "Infra & Cloud", projects: 2, core: true, icon: SI("vercel","E2DDD5")       },
  { name: "Firebase",           cat: "Infra & Cloud", projects: 2,             icon: DI("firebase")              },
  { name: "Cloudinary",         cat: "Infra & Cloud", projects: 2,             icon: SI("cloudinary","3448C5")   },
  { name: "Supabase Storage",   cat: "Infra & Cloud", projects: 1,             icon: DI("supabase")              },
  { name: "Nodemailer + Gmail", cat: "Infra & Cloud", projects: 2,             icon: SI("gmail","EA4335")        },

  // ── Tools ──────────────────────────────────────────────────────
  { name: "Git & GitHub",  cat: "Tools", projects: 10, core: true, icon: DI("git")                          },
  { name: "VS Code",       cat: "Tools", projects: 10, core: true, icon: DI("vscode")                       },
  { name: "npm",           cat: "Tools", projects:  9, core: true, icon: DI("npm","original-wordmark"),
    iconFilter: "brightness(0) invert(1)"                                                                    },
  { name: "Postman",       cat: "Tools", projects:  7, core: true, icon: DI("postman")                      },
  { name: "Playwright",    cat: "Tools", projects:  1,             icon: DI("playwright")                   },
  { name: "Cargo (Rust)",  cat: "Tools", projects:  1,             icon: SI("rust","F74C00")                 },
];

/* ──────────────── category meta (color per category) ─────────── */

const CAT_META: Record<
  Exclude<Category, "All">,
  { color: string; border: string; bg: string; dot: string; accent: string }
> = {
  "Languages":       { color: "text-orange-300",  border: "border-orange-400/25",  bg: "bg-orange-400/5",  dot: "bg-orange-400",  accent: "#FB923C" },
  "Frontend":        { color: "text-blue-300",    border: "border-blue-400/25",    bg: "bg-blue-400/5",    dot: "bg-blue-400",    accent: "#60A5FA" },
  "Backend":         { color: "text-emerald-300", border: "border-emerald-400/25", bg: "bg-emerald-400/5", dot: "bg-emerald-400", accent: "#34D399" },
  "Database":        { color: "text-amber-300",   border: "border-amber-400/25",   bg: "bg-amber-400/5",   dot: "bg-amber-400",   accent: "#FCD34D" },
  "Auth & Security": { color: "text-pink-300",    border: "border-pink-400/25",    bg: "bg-pink-400/5",    dot: "bg-pink-400",    accent: "#F9A8D4" },
  "AI & APIs":       { color: "text-violet-300",  border: "border-violet-400/25",  bg: "bg-violet-400/5",  dot: "bg-violet-400",  accent: "#C4B5FD" },
  "Mobile":          { color: "text-cyan-300",    border: "border-cyan-400/25",    bg: "bg-cyan-400/5",    dot: "bg-cyan-400",    accent: "#67E8F9" },
  "Blockchain":      { color: "text-indigo-300",  border: "border-indigo-400/25",  bg: "bg-indigo-400/5",  dot: "bg-indigo-400",  accent: "#A5B4FC" },
  "Infra & Cloud":   { color: "text-slate-300",   border: "border-slate-400/25",   bg: "bg-slate-400/5",   dot: "bg-slate-400",   accent: "#CBD5E1" },
  "Tools":           { color: "text-teal-300",    border: "border-teal-400/25",    bg: "bg-teal-400/5",    dot: "bg-teal-400",    accent: "#5EEAD4" },
};

const CAT_ICONS: Record<Exclude<Category, "All">, string> = {
  "Languages":       "⌨️",
  "Frontend":        "🖥️",
  "Backend":         "⚙️",
  "Database":        "🗄️",
  "Auth & Security": "🔐",
  "AI & APIs":       "🤖",
  "Mobile":          "📱",
  "Blockchain":      "⛓️",
  "Infra & Cloud":   "☁️",
  "Tools":           "🛠️",
};

const FILTERS: Category[] = [
  "All", "Languages", "Frontend", "Backend", "Database",
  "Auth & Security", "AI & APIs", "Mobile", "Blockchain", "Infra & Cloud", "Tools",
];

/* ──────────────────── intersection observer hook ─────────────── */

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

/* ──────────────── tiny tech-logo component ───────────────────── */

function TechLogo({
  src,
  alt,
  filter,
}: {
  src: string;
  alt: string;
  filter?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${alt} logo`}
      width={14}
      height={14}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      style={{
        width: 14,
        height: 14,
        objectFit: "contain",
        flexShrink: 0,
        filter: filter ?? "none",
      }}
    />
  );
}

/* ───────────────────────── component ─────────────────────────── */

export default function TechStack() {
  const [active, setActive] = useState<Category>("All");
  const { ref, visible } = useReveal(0.04);

  const fade = (delay: number): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.55s ${delay}s ease, transform 0.55s ${delay}s ease`,
  });

  const cats = (
    active === "All"
      ? (Object.keys(CAT_META) as Exclude<Category, "All">[])
      : [active as Exclude<Category, "All">]
  );

  const totalTechs = new Set(SKILLS.map((s) => s.name)).size;
  const totalCats  = Object.keys(CAT_META).length;

  return (
    <section
      id="tech-stack"
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Nitrajsinh Solanki tech stack — all technologies used across 10 real projects including hackathons, client work and internship"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative py-20 md:py-28 px-6 md:px-10 overflow-hidden"
    >
      {/* ── ambient glows ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[5%] left-[-5%] w-[460px] h-[460px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(94,234,212,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] right-[-4%] w-[380px] h-[380px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── section label ── */}
        <div className="flex items-center gap-4 mb-4" style={fade(0.04)}>
          <span className="font-mono text-[11px] text-teal-300 tracking-[0.18em] uppercase select-none">
            // tech stack
          </span>
          <span
            className="flex-1 h-[1px]"
            style={{ background: "linear-gradient(to right, #1A2B42, transparent)" }}
          />
        </div>

        {/* ── h2 — crawlable by search engines ── */}
        <h2
          className="leading-[1.05] tracking-tight text-[#E2DDD5] mb-3"
          style={{
            fontFamily: "var(--syne-var)",
            fontWeight: 800,
            fontSize: "clamp(28px, 4.8vw, 48px)",
            ...fade(0.12),
          }}
          itemProp="name"
        >
          Everything I{" "}
          <span className="text-teal-300">build with.</span>
        </h2>

        {/* ── sub-tagline ── */}
        <p
          className="font-mono text-[11.5px] text-[#4A6070] tracking-wide mb-3"
          style={fade(0.18)}
          itemProp="description"
        >
          Not a list of buzzwords — every badge here was written, debugged, and shipped.
        </p>

        {/* ── stats row ── */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10" style={fade(0.22)}>
          {[
            { val: `${totalTechs}+`, label: "Technologies" },
            { val: `${totalCats}`,   label: "Categories"   },
            { val: "10",             label: "Projects"      },
            { val: "$250+",          label: "Prize Money"   },
          ].map(({ val, label }) => (
            <div key={label} className="flex items-baseline gap-1.5">
              <span
                className="text-teal-300 font-bold text-[15px]"
                style={{ fontFamily: "var(--syne-var)" }}
              >
                {val}
              </span>
              <span className="font-mono text-[10px] text-[#3A5060] tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── filter bar ── */}
        <nav
          aria-label="Filter technologies by category"
          className="mb-10"
          style={fade(0.28)}
        >
          <ul
            role="tablist"
            aria-label="Technology categories"
            className="flex flex-wrap gap-2 list-none p-0 m-0"
          >
            {FILTERS.map((f) => (
              <li key={f} role="presentation">
                <button
                  role="tab"
                  aria-selected={active === f}
                  aria-controls="tech-grid"
                  onClick={() => setActive(f)}
                  className={[
                    "font-mono text-[10.5px] tracking-[0.08em] px-3.5 py-1.5 rounded-full border",
                    "transition-all duration-200 whitespace-nowrap",
                    active === f
                      ? "bg-teal-300 text-[#070B14] border-teal-300 font-semibold"
                      : "text-[#5A6A70] border-[#1A2B42] hover:border-teal-300/40 hover:text-teal-300/80",
                  ].join(" ")}
                >
                  {f}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── category grid ── */}
        <div
          id="tech-grid"
          role="tabpanel"
          aria-label={`${active} technologies`}
          className={
            active === "All"
              ? "columns-1 sm:columns-2 lg:columns-3"
              : "grid grid-cols-1 gap-5"
          }
          style={{ columnGap: "20px", ...fade(0.34) }}
        >
          {cats.map((cat) => {
            const meta   = CAT_META[cat];
            const skills = SKILLS.filter((s) => s.cat === cat);
            if (!skills.length) return null;

            return (
              <article
                key={cat}
                className="break-inside-avoid mb-5 bg-[#0B1623] border border-[#131C2E] rounded-2xl p-5
                           hover:border-[#1A2B42] transition-colors duration-300"
                aria-label={`${cat} — ${skills.length} technologies`}
                itemScope
                itemType="https://schema.org/ItemList"
              >
                {/* category header */}
                <header className="flex items-center gap-2.5 mb-4">
                  <span
                    aria-hidden="true"
                    className={`w-2 h-2 rounded-sm shrink-0 ${meta.dot}`}
                  />
                  <span aria-hidden="true" className="text-[13px] leading-none">
                    {CAT_ICONS[cat]}
                  </span>
                  <h3
                    className={`font-mono text-[10.5px] tracking-[0.14em] uppercase ${meta.color}`}
                    itemProp="name"
                  >
                    {cat}
                  </h3>
                  <span className="font-mono text-[9.5px] text-[#2D3A40] ml-auto">
                    {skills.length} tech{skills.length > 1 ? "s" : ""}
                  </span>
                </header>

                {/* skills list */}
                <ul className="flex flex-wrap gap-2 list-none p-0 m-0" role="list">
                  {skills.map((sk, i) => (
                    <li
                      key={sk.name}
                      role="listitem"
                      itemProp="itemListElement"
                      itemScope
                      itemType="https://schema.org/ListItem"
                    >
                      <meta itemProp="position" content={String(i + 1)} />
                      <span
                        title={
                          sk.note
                            ? sk.note
                            : sk.projects > 0
                            ? `Used in ${sk.projects} project${sk.projects > 1 ? "s" : ""}`
                            : ""
                        }
                        itemProp="name"
                        className={[
                          "inline-flex items-center gap-1.5",
                          "font-mono text-[11px] px-2.5 py-1 rounded-md border",
                          "transition-all duration-150 cursor-default select-none",
                          "hover:brightness-125 hover:scale-[1.03]",
                          meta.border,
                          meta.bg,
                          meta.color,
                        ].join(" ")}
                      >
                        {/* tech logo */}
                        {sk.icon ? (
                          <TechLogo
                            src={sk.icon}
                            alt={sk.name}
                            filter={sk.iconFilter}
                          />
                        ) : (
                          sk.core && (
                            <span
                              className="w-1 h-1 rounded-full bg-current opacity-70 shrink-0"
                              aria-label="core skill"
                            />
                          )
                        )}

                        {sk.name}

                        {sk.note ? (
                          <span className="text-[9px] opacity-50 border-l border-current/20 pl-1.5 ml-0.5">
                            {sk.note}
                          </span>
                        ) : sk.projects > 0 ? (
                          <span className="text-[9px] opacity-45 border-l border-current/20 pl-1.5 ml-0.5">
                            ×{sk.projects}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* ── legend ── */}
        <footer
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2"
          style={fade(0.42)}
          aria-label="Legend"
        >
          <div className="flex items-center gap-2">
            {/* sample logo placeholder */}
            <span
              className="w-3.5 h-3.5 rounded-sm border border-teal-400/30 bg-teal-400/10 flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="w-2 h-2 rounded-sm bg-teal-400/60" />
            </span>
            <span className="font-mono text-[9.5px] text-[#3A4A50] tracking-wide">
              Badge icon = official tech logo
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-teal-300/60"
              aria-hidden="true"
            />
            <span className="font-mono text-[9.5px] text-[#3A4A50] tracking-wide">
              Dot = core / production skill
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9.5px] text-[#3A4A50] tracking-wide">
              ×N = used in N real projects
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9.5px] text-[#3A4A50] tracking-wide">
              Internship / Academic = non-hackathon context
            </span>
          </div>
        </footer>

      </div>
    </section>
  );
}