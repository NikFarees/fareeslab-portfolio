import { ImageResponse } from "next/og";
import { projects, getProject } from "@/data/projects";
import { site } from "@/data/site";
import { ogBadgeStyle, ogColors, ogContainerStyle, ogSize } from "@/lib/og";

// Without this export the image route falls back to request-time rendering.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const size = ogSize;
export const contentType = "image/png";

export default function ProjectOpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);

  return new ImageResponse(
    (
      <div style={ogContainerStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 26,
              color: ogColors.inkSoft,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {project ? project.category : site.role}
          </span>
          <span style={{ fontSize: 26, color: ogColors.inkSoft }}>
            {site.domain}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {project ? project.title : site.name}
          </span>
          {project?.subtitle && (
            <span style={{ fontSize: 34, color: ogColors.inkSoft }}>
              {project.subtitle}
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {(project ? project.stack.slice(0, 5) : [...site.badges]).map(
            (item) => (
              <span key={item} style={ogBadgeStyle}>
                {item}
              </span>
            )
          )}
        </div>
      </div>
    ),
    size
  );
}
