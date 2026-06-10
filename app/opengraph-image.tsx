import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { ogBadgeStyle, ogColors, ogContainerStyle, ogSize } from "@/lib/og";

export const size = ogSize;
export const alt = `${site.name} — ${site.role}`;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={ogContainerStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: ogColors.accent,
              color: "#fff",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            NF
          </div>
          <span style={{ fontSize: 28, color: ogColors.inkSoft }}>
            {site.domain}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            {site.name}
          </span>
          <span style={{ fontSize: 38, color: ogColors.inkSoft }}>
            {site.role}
          </span>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {site.badges.map((badge) => (
            <span key={badge} style={ogBadgeStyle}>
              {badge}
            </span>
          ))}
        </div>
      </div>
    ),
    size
  );
}
