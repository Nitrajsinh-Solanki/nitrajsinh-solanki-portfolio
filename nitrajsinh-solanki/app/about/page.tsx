import Link from "next/link";
import JsonLd from "../components/JsonLd";
import { PageNav, PageFooter } from "../components/PageChrome";
import { pageMetadata } from "@/lib/seo";
import { profilePageGraph, breadcrumb } from "@/lib/schema";
import { profile } from "@/lib/profile";
import { LOCATION_LABEL, ALTERNATE_NAMES, SOCIAL } from "@/lib/site";
import { STATS } from "../projects/data";

export const metadata = pageMetadata({
  title: "About — Full-Stack Developer in Gujarat",
  description: profile.name + " is a full-stack developer from " + LOCATION_LABEL + ": " +
    profile.role.title + " at " + profile.role.org +
    ", StackUp hackathon prize winner, builder of live client platforms.",
  path: "/about",
  type: "profile",
});

const h2 = "text-[#17191D] text-[22px] mb-4";
const p = "text-[15px] text-[#555963] leading-[1.85] mb-4";

export default function AboutPage() {
  const edu = profile.education[0];
  const elsewhere = [
    { label: "GitHub", href: SOCIAL.github },
    { label: "LinkedIn", href: SOCIAL.linkedin },
    { label: "X", href: SOCIAL.x },
    { label: "Medium", href: SOCIAL.medium },
  ];

  return (
    <>
      <JsonLd data={profilePageGraph("/about")} />
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageNav />
      <main className="flex-1 max-w-3xl mx-auto px-6 md:px-10 pt-28 pb-20">
        <h1 className="text-[#17191D] leading-tight mb-6" style={{ fontFamily: "var(--syne-var)", fontWeight: 800, fontSize: "clamp(30px,5vw,46px)" }}>
          About {profile.name}
        </h1>
        <p className={p}>
          {profile.name} is a full-stack developer based in {LOCATION_LABEL}.
          {ALTERNATE_NAMES.length > 0 && " Also written as " + ALTERNATE_NAMES.join(" or ") + "."}{" "}
          Since {profile.role.since}, {profile.givenName} has been working as a{" "}
          {profile.role.title} at {profile.role.org}, building enterprise web applications with {profile.role.stack}.
        </p>
        <p className={p}>
          {profile.givenName} studied {edu.level} at {edu.school}, affiliated to {edu.board} ({edu.period}, {edu.score}).
        </p>
        <p className={p}>
          In 2024–2025 {profile.givenName} competed in five global hackathon and bounty challenges on StackUp,
          winning $250+ in prizes across blockchain, AI and full-stack categories. Freelance work includes the
          Ice Saathi business platform and Flutter delivery app for Aman Sales in Gandhidham, and the Floris
          Restaurant &amp; Banquet website in Patan.
        </p>
        <p className={p}>
          In total there are {STATS.total} projects. Browse them on the{" "}
          <Link href="/projects" className="text-indigo-600 hover:underline">projects page</Link>{" "}
          or read the <Link href="/resume" className="text-indigo-600 hover:underline">resume</Link>.
        </p>

        <h2 className={h2} style={{ fontFamily: "var(--syne-var)", fontWeight: 700 }}>Quick facts</h2>
        <dl className="grid grid-cols-[130px_1fr] gap-y-2 text-[14px] mb-10">
          <dt className="text-[#737780] font-mono text-[11px] uppercase">Location</dt><dd className="text-[#555963]">{LOCATION_LABEL}</dd>
          <dt className="text-[#737780] font-mono text-[11px] uppercase">Role</dt><dd className="text-[#555963]">{profile.role.title}, {profile.role.org}</dd>
          <dt className="text-[#737780] font-mono text-[11px] uppercase">Main stack</dt><dd className="text-[#555963]">Next.js, React, TypeScript, Node.js, ASP.NET Core, Angular, Flutter, MongoDB</dd>
          <dt className="text-[#737780] font-mono text-[11px] uppercase">Contact</dt><dd className="text-[#555963]"><a className="text-indigo-600 hover:underline" href={"mailto:" + profile.email}>{profile.email}</a></dd>
        </dl>

        <h2 className={h2} style={{ fontFamily: "var(--syne-var)", fontWeight: 700 }}>Awards</h2>
        <ul className="list-disc pl-5 text-[15px] text-[#555963] leading-[1.9] mb-10">
          {profile.awards.map((item) => <li key={item.text}>{item.text}</li>)}
        </ul>

        <h2 className={h2} style={{ fontFamily: "var(--syne-var)", fontWeight: 700 }}>Education</h2>
        <ul className="text-[15px] text-[#555963] leading-[1.9] mb-10">
          {profile.education.map((item) => <li key={item.level}>{item.level}, {item.school} ({item.board}), {item.period}, {item.score}</li>)}
        </ul>

        <h2 className={h2} style={{ fontFamily: "var(--syne-var)", fontWeight: 700 }}>Elsewhere</h2>
        <ul className="text-[15px] leading-[1.9]">
          {elsewhere.map((item) => <li key={item.label}><a rel="me noopener noreferrer" target="_blank" href={item.href} className="text-indigo-600 hover:underline">{item.label}</a></li>)}
        </ul>
      </main>
      <PageFooter />
    </>
  );
}
