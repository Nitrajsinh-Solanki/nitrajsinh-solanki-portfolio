// nitrajsinh-solanki/app/page.tsx
// Trigger a fresh Vercel build from the main branch.
import Navbar          from "./components/Navbar";
import Hero            from "./components/Hero";
import About           from "./components/About";
import TechStack       from "./components/TechStack";
import ProjectsPreview from "./components/ProjectsPreview";
import Services        from "./components/Services";
import WorkHistory     from "./components/WorkHistory";
import Contact         from "./components/Contact";
import Footer          from "./components/Footer";
import JsonLd from "./components/JsonLd";
import { homeGraph } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F7F3]">
      <JsonLd data={homeGraph()} />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <TechStack />
        <ProjectsPreview />

        <section
          id="approach"
          aria-labelledby="approach-heading"
          className="border-y border-[#E3E0D8] bg-white/60 px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24"
        >
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-indigo-700">
              How I build
            </p>
            <h2
              id="approach-heading"
              className="mb-6 max-w-3xl text-[#17191D]"
              style={{
                fontFamily: "var(--syne-var)",
                fontWeight: 800,
                fontSize: "clamp(28px, 4.5vw, 46px)",
                lineHeight: 1.08,
              }}
            >
              Thoughtful engineering, from the first API to the final interaction.
            </h2>
            <div className="grid gap-6 text-[15px] leading-7 text-[#555963] md:grid-cols-2 md:gap-10">
              <div className="space-y-4">
                <p>
                  I’m Nitrajsinh Solanki, a full-stack developer based in Gujarat, India.
                  I enjoy turning complex requirements into software that feels clear and
                  dependable to the people using it. My work spans frontend interfaces,
                  backend services, data modelling and the connections that make a complete
                  product function as one system.
                </p>
                <p>
                  In my current engineering work at VeloxCore, I build with ASP.NET Core
                  and Angular, including REST APIs, reusable UI components and application
                  features backed by carefully structured data. Across personal and
                  collaborative projects, I also work with React, Next.js, Node.js,
                  TypeScript, MongoDB and Flutter, choosing technologies to suit the
                  problem rather than adding complexity for its own sake.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  I care about the details that make software maintainable: readable code,
                  consistent interfaces, sensible error handling, accessible controls and
                  layouts that work on phones as well as desktops. I treat performance and
                  usability as part of implementation, not as a polish pass left until the
                  end.
                </p>
                <p>
                  My portfolio includes projects across web applications, data and
                  biodiversity tools, library workflows and blockchain experiences. Each
                  project is an opportunity to practise the full delivery cycle: understand
                  the user’s need, shape the architecture, build the interface, connect the
                  data and make the result easy to explore. Browse the featured work for
                  implementation details, technologies and available live demos.
                </p>
                <p>
                  I’m always interested in useful problems, thoughtful collaboration and
                  opportunities to keep growing as an engineer. If you’re building a
                  product or have an idea that needs a practical technical partner,
                  <a
                    href="mailto:nrsolanki2005@gmail.com"
                    className="ml-1 font-semibold text-indigo-700 underline decoration-indigo-700/30 underline-offset-4 hover:decoration-indigo-700"
                  >
                    get in touch
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Services />
        <WorkHistory />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}