"use client";

import { useState } from "react";
import { projectsByCategory, type ProjectCategory } from "@/data/projects";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";
import ProjectCard, { GhostCard } from "./ProjectCard";

const TABS: ProjectCategory[] = ["Client Project", "Personal Project"];
const TAB_LABEL: Record<ProjectCategory, string> = {
  "Client Project": "Client Projects",
  "Personal Project": "Personal Projects",
};

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory>("Client Project");
  const items = projectsByCategory(active);

  return (
    <section id="projects" className="border-t border-line py-20 md:py-[78px]">
      <div className="wrap">
        <Reveal>
          <SectionTag number="02" label="Projects" />
        </Reveal>

        <Reveal>
          <div className="mb-7 inline-flex gap-1 rounded-xl bg-[#f0ede4] p-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={`rounded-[9px] px-[18px] py-2 text-sm font-medium transition-all ${
                  active === tab
                    ? "bg-surface text-ink shadow-sm"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {TAB_LABEL[tab]}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal key={active} className="grid gap-[22px] lg:grid-cols-[1.05fr_0.95fr]">
          {items.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
          <GhostCard />
        </Reveal>
      </div>
    </section>
  );
}
