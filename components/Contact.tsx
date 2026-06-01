import { site } from "@/data/site";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

type Row = { label: string; value: string; href: string; external?: boolean };

export default function Contact() {
  const c = site.contact;
  const rows: Row[] = [
    { label: "Email", value: c.email, href: `mailto:${c.email}` },
    { label: "GitHub", value: c.githubLabel, href: c.github, external: true },
    { label: "LinkedIn", value: c.linkedinLabel, href: c.linkedin, external: true },
    { label: "Phone", value: c.phoneLabel, href: `tel:${c.phone}` },
  ];

  return (
    <section id="contact" className="border-t border-line py-20 md:py-[78px]">
      <div className="wrap">
        <Reveal>
          <SectionTag number="04" label="Contact" />
        </Reveal>
        <Reveal>
          <h2 className="mb-2 text-[clamp(34px,5vw,56px)] font-semibold leading-[1.02] tracking-[-0.03em]">
            Let&rsquo;s build something.
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mb-9 text-[18px] text-ink-soft">
            Open to roles and freelance work — reach out through any channel below.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex max-w-[620px] flex-col">
          {rows.map((r) => (
            <a
              key={r.label}
              href={r.href}
              {...(r.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex items-center gap-[18px] border-t border-line py-[18px] transition-all hover:pl-3.5"
            >
              <span className="w-[88px] flex-none font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                {r.label}
              </span>
              <span className="text-[17px] transition-colors group-hover:text-accent">
                {r.value}
              </span>
              <span className="ml-auto text-ink-soft transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">
                ↗
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
