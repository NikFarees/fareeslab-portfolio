import { site } from "@/data/site";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

export default function About() {
  return (
    <section id="about" className="border-t border-line py-20 md:py-[78px]">
      <div className="wrap">
        <Reveal>
          <SectionTag number="01" label="About" />
        </Reveal>
        <div className="grid items-start gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
          <Reveal>
            <h2 className="text-[27px] font-medium leading-[1.18] tracking-[-0.02em]">
              {site.aboutLead}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[17px] leading-[1.66] text-ink-soft">
              {site.about}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
