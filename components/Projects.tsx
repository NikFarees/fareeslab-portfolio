"use client";

import { useState } from "react";
import { projectsByCategory, type ProjectCategory } from "@/data/projects";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";
import ProjectCard from "./ProjectCard";

const TABS: ProjectCategory[] = ["Client Project", "Personal Project"];
const TAB_LABEL: Record<ProjectCategory, string> = {
  "Client Project": "Client Projects",
  "Personal Project": "Personal Projects",
};

const DESKTOP_PER_PAGE = 3; // 3 cols × 1 row
const MOBILE_PER_PAGE = 1; // 1 col × 1 row

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory>("Client Project");
  const [page, setPage] = useState(1);

  const items = projectsByCategory(active);

  const totalDesktopPages = Math.ceil(items.length / DESKTOP_PER_PAGE);
  const totalMobilePages = Math.ceil(items.length / MOBILE_PER_PAGE);

  // Clamp page when switching tabs.
  const safePage = (p: number, total: number) => Math.min(Math.max(1, p), Math.max(1, total));
  const desktopPage = safePage(page, totalDesktopPages);
  const mobilePage = safePage(page, totalMobilePages);

  const desktopItems = items.slice((desktopPage - 1) * DESKTOP_PER_PAGE, desktopPage * DESKTOP_PER_PAGE);
  const mobileItems = items.slice((mobilePage - 1) * MOBILE_PER_PAGE, mobilePage * MOBILE_PER_PAGE);

  const switchTab = (tab: ProjectCategory) => {
    setActive(tab);
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

            {/* Desktop pagination — sits where the column toggle used to be */}
            <div className="hidden lg:block">
              <Pager page={desktopPage} total={totalDesktopPages} onPage={setPage} />
            </div>
          </div>
        </Reveal>

        {/* Desktop grid — always 3 columns */}
        <Reveal
          key={`desktop-${active}-${desktopPage}`}
          className="hidden gap-[22px] lg:grid lg:grid-cols-3"
        >
          {desktopItems.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </Reveal>

        {/* Mobile grid */}
        <Reveal key={`mobile-${active}-${mobilePage}`} className="grid gap-[22px] lg:hidden">
          {mobileItems.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </Reveal>

        {/* Mobile pagination — stays at the bottom */}
        {totalMobilePages > 1 && (
          <div className="mt-8 flex justify-center lg:hidden">
            <Pager page={mobilePage} total={totalMobilePages} onPage={setPage} />
          </div>
        )}
      </div>
    </section>
  );
}

/** Prev / numbered / Next pagination control. Renders nothing for a single page. */
function Pager({
  page,
  total,
  onPage,
}: {
  page: number;
  total: number;
  onPage: (n: number) => void;
}) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="flex h-9 items-center rounded-[10px] border border-line-strong bg-surface px-3 text-[13px] font-medium text-ink transition-colors hover:border-[#d2cdc1] disabled:cursor-not-allowed disabled:opacity-40"
      >
        ←
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onPage(n)}
          className={`h-9 w-9 rounded-[10px] border text-[13px] font-medium transition-colors ${
            page === n
              ? "border-accent bg-accent text-white"
              : "border-line-strong bg-surface text-ink hover:border-[#d2cdc1]"
          }`}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPage(Math.min(total, page + 1))}
        disabled={page === total}
        aria-label="Next page"
        className="flex h-9 items-center rounded-[10px] border border-line-strong bg-surface px-3 text-[13px] font-medium text-ink transition-colors hover:border-[#d2cdc1] disabled:cursor-not-allowed disabled:opacity-40"
      >
        →
      </button>
    </div>
  );
}
