// nitrajsinh-solanki/app/page.tsx
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
    <div className="flex flex-col min-h-screen bg-[#070B14]">
      <JsonLd data={homeGraph()} />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <TechStack />
        <ProjectsPreview />
        <Services />
        <WorkHistory />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}