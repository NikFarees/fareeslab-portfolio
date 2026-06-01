/** "01 ——— ABOUT" style section marker. */
export default function SectionTag({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="mb-9 flex items-center gap-3">
      <span className="font-mono text-[13px] font-medium text-accent">
        {number}
      </span>
      <span className="h-px w-9 bg-line-strong" />
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </span>
    </div>
  );
}
