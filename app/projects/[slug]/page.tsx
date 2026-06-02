import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";
import { site } from "@/data/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Badge from "@/components/Badge";

// Pre-render a static page for every project at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.overview,
  };
}

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const isPrivate = project.visibility === "Private";
  const hasLinks = Boolean(project.links?.github || project.links?.live);

  return (
    <>
      <Navbar />
      <main className="wrap pb-24 pt-12">
        {/* Header */}
        <Reveal>
          <Link
            href="/#projects"
            className="font-mono text-[12.5px] text-accent transition-colors hover:text-accent-dark"
          >
            ← All projects
          </Link>

          <p className="mt-8 font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-soft">
            Projects / {project.category}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <div>
              <h1 className="text-[clamp(40px,6vw,64px)] font-semibold tracking-[-0.035em]">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="mt-1 font-mono text-[13px] text-ink-soft">
                  {project.subtitle}
                </p>
              )}
            </div>
            <span
              className={`inline-flex h-fit items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] ${
                isPrivate
                  ? "bg-accent-wash text-[#a9542f]"
                  : "bg-[#eef5ef] text-[#3c7d54]"
              }`}
            >
              {isPrivate ? "Private" : "● Public"}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>

          {hasLinks ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[11px] bg-accent px-[18px] py-2.5 text-[14.5px] font-medium text-white shadow-primary transition-colors hover:bg-accent-dark"
                >
                  GitHub
                </a>
              )}
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[11px] border border-line-strong bg-surface px-[18px] py-2.5 text-[14.5px] font-medium text-ink transition-colors hover:border-[#d2cdc1]"
                >
                  Live demo
                </a>
              )}
            </div>
          ) : (
            <div className="mt-6 flex max-w-[560px] items-center gap-2.5 rounded-[12px] border border-[#e0c4a6] bg-accent-wash px-4 py-3.5 text-[13.5px] text-[#8a5631]">
              {isPrivate
                ? "This is a private client project — source code and live link are not publicly available."
                : "Links for this project will be added soon."}
            </div>
          )}
        </Reveal>

        {/* Body */}
        <div className="mt-12 grid items-start gap-10 md:grid-cols-[1fr_300px]">
          <Reveal className="flex flex-col gap-8">
            <section>
              <h2 className="mb-3.5 text-[23px] font-semibold tracking-[-0.01em]">
                Overview
              </h2>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                {project.overview}
              </p>
            </section>

            <section>
              <h2 className="mb-3.5 text-[23px] font-semibold tracking-[-0.01em]">
                Contribution summary
              </h2>
              <ul className="flex flex-col gap-3">
                {project.contribution.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    <span className="text-[16px] leading-[1.6] text-ink-soft">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Images */}
            {project.images && (
              <div className="flex flex-col gap-4">
                <div className="relative h-[320px] w-full overflow-hidden rounded-[16px] border border-line">
                  <Image
                    src={project.images.main}
                    alt={`${project.title} main screenshot`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 760px"
                    priority
                  />
                </div>
                {project.images.gallery && project.images.gallery.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {project.images.gallery.map((src) => (
                      <div
                        key={src}
                        className="relative aspect-video overflow-hidden rounded-[12px] border border-line"
                      >
                        <Image
                          src={src}
                          alt={`${project.title} screenshot`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 240px"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Reveal>

          {/* Meta sidebar */}
          <Reveal delay={0.08}>
            <aside className="sticky top-[84px] flex flex-col gap-4 rounded-[16px] border border-line bg-surface p-[22px]">
              <MetaRow label="Category" value={project.category} />
              <MetaRow label="Role" value={project.role} />
              <MetaRow label="Visibility" value={project.visibility} />
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                  Tech stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
        {label}
      </span>
      <span className="text-[14px]">{value}</span>
    </div>
  );
}
