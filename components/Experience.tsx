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
        <div className="flex flex-col">
          {site.experience.map((item, i) => (
            <Reveal
              key={item.title}
              className="grid items-start gap-2 border-t border-line py-[26px] first:border-t-0 sm:grid-cols-[84px_1fr] sm:gap-6"
            >
              <span className="text-[32px] font-semibold leading-none tracking-[-0.03em] text-accent sm:text-[40px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-[7px] text-[20px] font-semibold tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="max-w-[560px] text-[15.5px] leading-[1.6] text-ink-soft">
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
