import fs from "fs";
import path from "path";

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

/** Extracts the trailing number from a filename stem, e.g. "fareeslab-3" → 3. */
function trailingNumber(stem: string): number {
  const m = stem.match(/-(\d+)$/);
  return m ? parseInt(m[1], 10) : Infinity;
}

/**
 * Reads public/image/projects/{slug}/ and returns sorted image URLs.
 * The file with the lowest trailing number (e.g. *-1.*) is the main image.
 * All others become the gallery, in ascending numeric order.
 * Returns null if the directory is empty or doesn't exist.
 */
export function resolveProjectImages(slug: string): {
  main: string;
  gallery: string[];
} | null {
  const dir = path.join(process.cwd(), "public", "image", "projects", slug);

  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return null;
  }

  const images = files
    .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()) && f !== ".gitkeep")
    .sort((a, b) => trailingNumber(path.parse(a).name) - trailingNumber(path.parse(b).name));

  if (images.length === 0) return null;

  const base = `/image/projects/${slug}`;
  const [mainFile, ...rest] = images;
  return {
    main: `${base}/${mainFile}`,
    gallery: rest.map((f) => `${base}/${f}`),
  };
}
