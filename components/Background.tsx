"use client";

import { useState } from "react";
import { site } from "@/data/site";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

// Tabs consolidate Experience / Education / Certifications into one section so the
// homepage stays short. Add a new label here + a render branch below to extend
// (e.g. "Awards", "Co-curricular") — no new section, no extra scroll.
const TABS = ["Experience", "Education", "Certifications", "Achievements"] as const;
type Tab = (typeof TABS)[number];

export default function Background() {
  const [active, setActive] = useState<Tab>("Experience");

  return (
    <section id="background" className="border-t border-line py-20 md:py-[78px]">
      <div className="wrap">
        <Reveal>
          <SectionTag number="03" label="Background" />
        </Reveal>

        <Reveal>
          {/* Scrolls horizontally on narrow screens so all tabs stay reachable. */}
          <div className="mb-7 -mx-7 overflow-x-auto px-7 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="inline-flex gap-1 rounded-xl bg-[#f0ede4] p-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActive(tab)}
                  className={`whitespace-nowrap rounded-[9px] px-[18px] py-2 text-sm font-medium transition-all ${
                    active === tab
                      ? "bg-surface text-ink shadow-sm"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal key={`bg-${active}`}>
          {active === "Experience" && <ExperienceTab />}
          {active === "Education" && <EducationTab />}
          {active === "Certifications" && <CertificationsTab />}
          {active === "Achievements" && <AchievementsTab />}
        </Reveal>
      </div>
    </section>
  );
}

function ExperienceTab() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {site.experience.map((item, i) => (
        <div
          key={item.title}
          className="flex h-full flex-col rounded-[16px] border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-card"
        >
          <span className="mb-4 font-mono text-[13px] font-medium text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mb-1 text-[20px] font-semibold leading-[1.2] tracking-[-0.01em]">
            {item.title}
          </h3>
          <p className="mb-1 text-[13px] font-medium text-ink-soft">{item.company}</p>
          <p className="mb-4 font-mono text-[11.5px] text-ink-soft opacity-70">
            {item.period}
          </p>
          <p className="text-[15px] leading-[1.6] text-ink-soft">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

function EducationTab() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {site.education.map((item) => (
        <div
          key={item.degree}
          className="flex h-full flex-col rounded-[16px] border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-card"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <span className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-soft opacity-70">
              {item.period}
            </span>
            <span className="inline-flex items-center rounded-full bg-accent-wash px-2.5 py-1 font-mono text-[11px] text-[#a9542f]">
              {item.result}
            </span>
          </div>
          <h3 className="mb-1 text-[20px] font-semibold leading-[1.25] tracking-[-0.01em]">
            {item.degree}
          </h3>
          <p className="text-[13px] font-medium text-ink-soft">{item.institution}</p>
        </div>
      ))}
    </div>
  );
}

function CertificationsTab() {
  return (
    <MiniCardGrid
      items={site.certifications.map((c) => ({ title: c.name, sub: c.issuer }))}
    />
  );
}

function AchievementsTab() {
  return (
    <div className="flex flex-col gap-9">
      <div>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
          Awards
        </p>
        <MiniCardGrid
          items={site.awards.map((a) => ({ title: a.title, sub: a.detail }))}
        />
      </div>
      <div>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
          Co-curricular
        </p>
        <MiniCardGrid
          items={site.activities.map((a) => ({ title: a.title, sub: a.detail }))}
        />
      </div>
    </div>
  );
}

type MiniItem = { title: string; sub: string };

// Caps the grid at INITIAL cards and reveals the rest on demand — keeps the
// section short no matter how many items, identical on desktop and mobile.
const INITIAL = 6;

function MiniCardGrid({ items }: { items: MiniItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? items : items.slice(0, INITIAL);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((it) => (
          <MiniCard key={it.title} title={it.title} sub={it.sub} />
        ))}
      </div>
      {items.length > INITIAL && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-5 font-mono text-[12.5px] text-accent transition-colors hover:text-accent-dark"
        >
          {expanded ? "Show less ↑" : `Show all ${items.length} ↓`}
        </button>
      )}
    </div>
  );
}

/** Compact card shared by Certifications and Achievements. */
function MiniCard({ title, sub }: MiniItem) {
  return (
    <div className="flex flex-col gap-1.5 rounded-[16px] border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card">
      <h3 className="text-[15.5px] font-semibold leading-[1.3] tracking-[-0.01em]">
        {title}
      </h3>
      <span className="text-[12.5px] leading-[1.4] text-ink-soft">{sub}</span>
    </div>
  );
}
