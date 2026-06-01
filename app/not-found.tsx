import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-7 text-center">
      <div>
        <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
          404
        </p>
        <h1 className="mt-4 text-[clamp(32px,5vw,52px)] font-semibold tracking-[-0.03em]">
          Page not found
        </h1>
        <p className="mt-3 text-[17px] text-ink-soft">
          That page doesn&rsquo;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-[11px] bg-accent px-[18px] py-2.5 text-[14.5px] font-medium text-white shadow-primary transition-colors hover:bg-accent-dark"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
