/** Small monospace tech badge. */
export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-lg border border-line-strong bg-surface px-2.5 py-1 font-mono text-xs text-ink-soft">
      {children}
    </span>
  );
}
