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

// Mobile = 1 col × 2 rows = 2 per page
const MOBILE_PER_PAGE = 2;

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory>("Client Project");
  const [cols, setCols] = useState<Cols>(3);
  const [page, setPage] = useState(1);

  const items = projectsByCategory(active);

  // Desktop: cols × 2 rows per page
  const desktopPerPage = cols * 2;

  const totalDesktopPages = Math.ceil(items.length / desktopPerPage);
  const totalMobilePages = Math.ceil(items.length / MOBILE_PER_PAGE);

  // Clamp page when switching tabs/cols
  const safePage = (p: number, total: number) => Math.min(Math.max(1, p), Math.max(1, total));

  const desktopPage = safePage(page, totalDesktopPages);
  const mobilePage = safePage(page, totalMobilePages);

  const desktopItems = items.slice((desktopPage - 1) * desktopPerPage, desktopPage * desktopPerPage);
  const mobileItems = items.slice((mobilePage - 1) * MOBILE_PER_PAGE, mobilePage * MOBILE_PER_PAGE);

  const isLastDesktopPage = desktopPage === totalDesktopPages || totalDesktopPages === 0;
  const isLastMobilePage = mobilePage === totalMobilePages || totalMobilePages === 0;

  const switchTab = (tab: ProjectCategory) => {
    setActive(tab);
    setPage(1);
  };

  const switchCols = (c: Cols) => {
    setCols(c);
    setPage(1);
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

            {/* Column toggle — desktop only */}
            <div className="hidden items-center gap-2 lg:flex">
              <span className="font-mono text-[11px] uppercase tracking-[0.09em] text-ink-soft">
                Columns
              </span>
              <div className="inline-flex gap-1 rounded-xl bg-[#f0ede4] p-1">
                {([2, 3] as Cols[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => switchCols(c)}
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

        {/* Desktop grid */}
        <Reveal
          key={`desktop-${active}-${cols}-${desktopPage}`}
          className={`hidden gap-[22px] lg:grid ${cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}
        >
          {desktopItems.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
          {isLastDesktopPage && <GhostCard />}
        </Reveal>

        {/* Mobile grid */}
        <Reveal
          key={`mobile-${active}-${mobilePage}`}
          className="grid gap-[22px] lg:hidden"
        >
          {mobileItems.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
          {isLastMobilePage && <GhostCard />}
        </Reveal>

        {/* Desktop pagination */}
        {totalDesktopPages > 1 && (
          <div className="mt-8 hidden items-center justify-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={desktopPage === 1}
              className="rounded-[10px] border border-line-strong bg-surface px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-[#d2cdc1] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Prev
            </button>
            {Array.from({ length: totalDesktopPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={`h-9 w-9 rounded-[10px] border text-[13px] font-medium transition-colors ${
                  desktopPage === n
                    ? "border-accent bg-accent text-white"
                    : "border-line-strong bg-surface text-ink hover:border-[#d2cdc1]"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalDesktopPages, p + 1))}
              disabled={desktopPage === totalDesktopPages}
              className="rounded-[10px] border border-line-strong bg-surface px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-[#d2cdc1] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}

        {/* Mobile pagination */}
        {totalMobilePages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={mobilePage === 1}
              className="rounded-[10px] border border-line-strong bg-surface px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-[#d2cdc1] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Prev
            </button>
            {Array.from({ length: totalMobilePages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={`h-9 w-9 rounded-[10px] border text-[13px] font-medium transition-colors ${
                  mobilePage === n
                    ? "border-accent bg-accent text-white"
                    : "border-line-strong bg-surface text-ink hover:border-[#d2cdc1]"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalMobilePages, p + 1))}
              disabled={mobilePage === totalMobilePages}
              className="rounded-[10px] border border-line-strong bg-surface px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-[#d2cdc1] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
