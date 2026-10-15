import JsonLd from "../components/JsonLd";
import { PageNav, PageFooter } from "../components/PageChrome";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb } from "@/lib/schema";
import { profile } from "@/lib/profile";

export const metadata = pageMetadata({
  title: "Resume — Full-Stack Developer",
  description: "Resume of " + profile.name + ": " + profile.role.title + " at " +
    profile.role.org + ", full-stack skills (Next.js, React, ASP.NET Core, Angular, Flutter), education and StackUp hackathon awards.",
  path: "/resume",
});

const h2 = "text-[#E2DDD5] text-[22px] mt-10 mb-4";

export default function ResumePage() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Resume", path: "/resume" }])} />
      <PageNav />
      <main className="flex-1 max-w-3xl mx-auto px-6 md:px-10 pt-28 pb-20">
        <h1 className="text-[#E2DDD5]" style={{ fontFamily: "var(--syne-var)", fontWeight: 800, fontSize: "clamp(30px,5vw,46px)" }}>
          {profile.name}: Resume
        </h1>
        <p className="font-mono text-[12px] text-teal-300/80 mt-2">{profile.headline} · {profile.email}</p>
        <a href="/Nitrajsinh_Solanki_Resume.pdf" download aria-label="Download resume (PDF)"
          className="inline-block mt-5 bg-teal-300 text-[#070B14] font-bold text-[13px] px-6 py-3 rounded-xl"
          style={{ fontFamily: "var(--syne-var)" }}>Download resume (PDF)</a>

        <h2 className={h2} style={{ fontFamily: "var(--syne-var)", fontWeight: 700 }}>Experience</h2>
        {profile.experience.map((item) => (
          <section key={item.title} className="mb-6">
            <h3 className="text-[#E2DDD5] text-[16px] font-semibold">{item.title}, {item.org}</h3>
            <p className="font-mono text-[11px] text-[#94A3B8] mb-2">{item.period} · {item.place}</p>
            <ul className="list-disc pl-5 text-[14.5px] text-[#A5B0C0] leading-[1.8]">{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          </section>
        ))}
        <h2 className={h2} style={{ fontFamily: "var(--syne-var)", fontWeight: 700 }}>Technical skills</h2>
        <dl className="text-[14.5px] leading-[1.9]">
          {Object.entries(profile.skills).map(([label, values]) => (
            <div key={label} className="flex gap-2">
              <dt className="text-[#C8C3BA] font-semibold min-w-[170px]">{label}</dt>
              <dd className="text-[#A5B0C0]">{values.join(", ")}</dd>
            </div>
          ))}
        </dl>
        <h2 className={h2} style={{ fontFamily: "var(--syne-var)", fontWeight: 700 }}>Education</h2>
        <ul className="text-[14.5px] text-[#A5B0C0] leading-[1.9]">{profile.education.map((item) => <li key={item.level}>{item.level}, {item.school} ({item.board}), {item.period}, {item.score}</li>)}</ul>
        <h2 className={h2} style={{ fontFamily: "var(--syne-var)", fontWeight: 700 }}>Awards</h2>
        <ul className="list-disc pl-5 text-[14.5px] text-[#A5B0C0] leading-[1.9]">{profile.awards.map((item) => <li key={item.text}>{item.text}</li>)}</ul>
      </main>
      <PageFooter />
    </>
  );
}
