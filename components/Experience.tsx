import { site } from "@/data/site";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line py-20 md:py-[78px]">
      <div className="wrap">
        <Reveal>
          <SectionTag number="03" label="Experience" />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-3">
          {site.experience.map((item, i) => (
            <Reveal key={item.title}>
              <div className="flex h-full flex-col rounded-[16px] border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-card">
                <span className="mb-4 font-mono text-[13px] font-medium text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-1 text-[20px] font-semibold leading-[1.2] tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="mb-1 text-[13px] font-medium text-ink-soft">
                  {item.company}
                </p>
                <p className="mb-4 font-mono text-[11.5px] text-ink-soft opacity-70">
                  {item.period}
                </p>
                <p className="text-[15px] leading-[1.6] text-ink-soft">
                  {item.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
