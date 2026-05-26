// nitrajsinh-solanki/app/page.tsx
import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import About     from "./components/About";
import TechStack from "./components/TechStack";
import WorkHistory from "./components/WorkHistory";
import Services  from "./components/Services";
import Footer    from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070B14]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <TechStack />
        <Services />
        <WorkHistory/>
      </main>
      <Footer />
    </div>
  );
}