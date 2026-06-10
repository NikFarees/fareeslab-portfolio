import Link from "next/link";
import { site } from "@/data/site";
import Reveal, { StaggerReveal, StaggerItem } from "./Reveal";
import Badge from "./Badge";
import Terminal from "./Terminal";

export default function Hero() {
  return (
    <section id="top" className="pb-20 pt-[74px] md:pb-24">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.25fr_0.85fr] lg:gap-14">
        {/* Left: name + copy, revealed as a sequence */}
        <StaggerReveal stagger={0.08}>
          <StaggerItem>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {site.role}
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-[18px] text-[clamp(46px,7.4vw,88px)] font-semibold leading-[0.96] tracking-[-0.035em]">
              {site.name}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-[22px] max-w-[520px] text-[18px] leading-relaxed text-ink-soft text-pretty">
              {site.heroCopy}
            </p>
          </StaggerItem>

          <StaggerItem className="mt-[26px] flex flex-wrap gap-2">
            {site.badges.map((b) => (
              <Badge key={b}>{b}</Badge>
            ))}
          </StaggerItem>

          <StaggerItem className="mt-[30px] flex flex-wrap gap-3">
            <Link
              href="#contact"
              className="rounded-[11px] bg-accent px-[18px] py-2.5 text-[14.5px] font-medium text-white shadow-primary transition-colors hover:bg-accent-dark"
            >
              Contact Me
            </Link>
            <Link
              href="#projects"
              className="rounded-[11px] border border-line-strong bg-surface px-[18px] py-2.5 text-[14.5px] font-medium text-ink transition-colors hover:border-[#d2cdc1]"
            >
              View Projects
            </Link>
          </StaggerItem>
        </StaggerReveal>

        {/* Right: terminal */}
        <Reveal delay={0.12}>
          <Terminal />
        </Reveal>
      </div>
    </section>
  );
}
