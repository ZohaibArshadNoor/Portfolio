import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { Projects } from "@/components/projects/Projects";
import { Spotlight } from "@/components/spotlight/Spotlight";
import { Experience } from "@/components/experience/Experience";
import { Achievements } from "@/components/achievements/Achievements";
import { Services } from "@/components/services/Services";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { Contact } from "@/components/contact/Contact";
import { SHOW_TESTIMONIALS } from "@/data/experience";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Spotlight />
      <Experience />
      <Achievements />
      <Services />
      {/*
        Testimonials — toggled via SHOW_TESTIMONIALS in src/data/experience.ts
        Search: @EDIT TESTIMONIALS
        Or comment out the block below to remove it from the page.
      */}
      {SHOW_TESTIMONIALS && <Testimonials />}
      <Contact />
    </>
  );
}
