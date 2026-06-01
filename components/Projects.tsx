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

type Cols = 2 | 3;

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory>("Client Project");
  const [cols, setCols] = useState<Cols>(3);
  const [expanded, setExpanded] = useState(false);

  const items = projectsByCategory(active);

  // Max two rows when collapsed.
  const maxVisible = cols * 2;
  const hasMore = items.length > maxVisible;
  const visibleItems = expanded ? items : items.slice(0, maxVisible);
  // Ghost "coming soon" tile only appears once every real card is shown.
  const showGhost = !hasMore || expanded;

  const switchTab = (tab: ProjectCategory) => {
    setActive(tab);
    setExpanded(false);
  };

  return (
    <section id="projects" className="border-t border-line py-20 md:py-[78px]">
      <div className="wrap">
        <Reveal>
          <SectionTag number="02" label="Projects" />
        </Reveal>

        <Reveal>
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            {/* Category tabs */}
            <div className="inline-flex gap-1 rounded-xl bg-[#f0ede4] p-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => switchTab(tab)}
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

            {/* Column toggle — hidden on mobile (always single column there) */}
            <div className="hidden items-center gap-2 lg:flex">
              <span className="font-mono text-[11px] uppercase tracking-[0.09em] text-ink-soft">
                Columns
              </span>
              <div className="inline-flex gap-1 rounded-xl bg-[#f0ede4] p-1">
                {([2, 3] as Cols[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCols(c)}
                    aria-label={`${c} columns`}
                    className={`rounded-[9px] px-3.5 py-1.5 text-sm font-medium tabular-nums transition-all ${
                      cols === c
                        ? "bg-surface text-ink shadow-sm"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal
          key={`${active}-${cols}`}
          className={`grid gap-[22px] ${
            cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"
          }`}
        >
          {visibleItems.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
          {showGhost && <GhostCard />}
        </Reveal>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="rounded-[11px] border border-line-strong bg-surface px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-[#d2cdc1]"
            >
              {expanded ? "See less" : `See more (${items.length - maxVisible})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
