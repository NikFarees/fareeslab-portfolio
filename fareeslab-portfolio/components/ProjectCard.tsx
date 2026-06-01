import Link from "next/link";
import type { Project } from "@/data/projects";
import Badge from "./Badge";

function VisibilityTag({ visibility }: { visibility: Project["visibility"] }) {
  const isPrivate = visibility === "Private";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] ${
        isPrivate ? "bg-accent-wash text-[#a9542f]" : "bg-[#eef5ef] text-[#3c7d54]"
      }`}
    >
      {isPrivate ? "🔒 Private" : "● Public"}
    </span>
  );
}

/** Project card. Links to the dynamic detail page at /projects/[slug]. */
export default function ProjectCard({ project }: { project: Project }) {
  const hasLinks = Boolean(project.links?.github || project.links?.live);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-[20px] border border-line bg-surface p-[22px] transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-card"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.09em] text-ink-soft">
          {project.category}
        </span>
        <VisibilityTag visibility={project.visibility} />
      </div>

      {/* Thumbnail placeholder — swap for a real <Image> when available. */}
      <div className="mb-[18px] grid h-[158px] place-items-center rounded-[13px] border border-line bg-gradient-to-br from-[#f6f1ea] to-[#efe9df] font-mono text-[11.5px] text-[#a59e8e]">
        project preview
      </div>

      <h3 className="mb-2 text-[22px] font-semibold tracking-[-0.02em]">
        {project.title}
      </h3>
      <p className="mb-[18px] text-[14.5px] leading-[1.55] text-ink-soft">
        {project.description}
      </p>

      <div className="mt-auto flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <Badge key={s}>{s}</Badge>
        ))}
      </div>

      <div className="mt-[18px] flex items-center justify-between border-t border-line pt-4">
        <span className="font-mono text-[11px] text-ink-soft">
          {project.visibility === "Private"
            ? "Private · details on request"
            : hasLinks
              ? "GitHub · Live demo"
              : "Links coming soon"}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[12.5px] text-accent transition-all group-hover:gap-2.5">
          View detail →
        </span>
      </div>
    </Link>
  );
}

/** Dashed "coming soon" placeholder tile shown after the real cards. */
export function GhostCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-[20px] border border-dashed border-line-strong p-[22px] text-center font-mono text-[13px] text-ink-soft">
      <span className="text-2xl text-line-strong">+</span>
      More projects coming soon
    </div>
  );
}
