import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-wrap items-center justify-between gap-4 py-[30px]">
        <span className="font-mono text-[12.5px] text-ink-soft">
          © 2026 {site.name}. Built with Next.js.
        </span>
        <div className="flex gap-5">
          <a
            href={site.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-ink-soft transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={site.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-ink-soft transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.contact.email}`}
            className="text-[13px] text-ink-soft transition-colors hover:text-ink"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
