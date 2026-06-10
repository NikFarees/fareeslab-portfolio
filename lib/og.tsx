/**
 * Shared palette + styles for build-time generated images (icons + OG images).
 * Values mirror the design tokens in tailwind.config.ts — keep them in sync.
 */
export const ogColors = {
  paper: "#F4F0E6",
  surface: "#FAF7F0",
  ink: "#1B1A18",
  inkSoft: "#6C6962",
  line: "#E5DDD0",
  accent: "#CC6B4D",
} as const;

export const ogSize = { width: 1200, height: 630 };

// Full-bleed card layout shared by the root and per-project OG images.
export const ogContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: 72,
  backgroundColor: ogColors.paper,
  color: ogColors.ink,
  fontFamily: "sans-serif",
};

export const ogBadgeStyle: React.CSSProperties = {
  display: "flex",
  padding: "8px 18px",
  borderRadius: 999,
  border: `2px solid ${ogColors.line}`,
  backgroundColor: ogColors.surface,
  color: ogColors.inkSoft,
  fontSize: 24,
};
