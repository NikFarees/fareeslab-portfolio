import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import { resolveProjectImages } from "@/lib/project-images";

export default function Home() {
  const mainImageMap: Record<string, string> = {};
  for (const p of projects) {
    const resolved = resolveProjectImages(p.slug);
    if (resolved) mainImageMap[p.slug] = resolved.main;
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects mainImageMap={mainImageMap} />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
