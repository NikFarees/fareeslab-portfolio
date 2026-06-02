"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type WindowState = "open" | "minimized" | "closed";

type Props = {
  images: string[];
  alt: string;
  url?: string;
};

export default function ImageCarousel({ images, alt, url = "fareeslab.dev" }: Props) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [windowState, setWindowState] = useState<WindowState>("open");

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  if (images.length === 0) return null;

  if (windowState === "closed") {
    return (
      <div className="flex items-center gap-3 rounded-[12px] border border-dashed border-line-strong px-4 py-3">
        <span className="font-mono text-[12px] text-ink-soft">Window closed</span>
        <button
          type="button"
          onClick={() => setWindowState("open")}
          className="rounded-[8px] border border-line-strong bg-surface px-3 py-1.5 font-mono text-[11.5px] text-ink transition-colors hover:border-[#d2cdc1]"
        >
          Reopen
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Browser chrome frame */}
        <div className="overflow-hidden rounded-[14px] border border-[#d4cfc6] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">

          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-[#ddd8cf] bg-[#f0ece3] px-3 py-[10px] sm:gap-3 sm:px-4">

            {/* Traffic lights */}
            <div className="flex items-center gap-[6px]">
              <button
                type="button"
                onClick={() => setWindowState("closed")}
                aria-label="Close"
                className="group relative h-3 w-3 rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80"
              >
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[7px] text-[#7a1f1a] opacity-0 group-hover:opacity-100 select-none">✕</span>
              </button>
              <button
                type="button"
                onClick={() => setWindowState((s) => (s === "minimized" ? "open" : "minimized"))}
                aria-label={windowState === "minimized" ? "Restore" : "Minimize"}
                className="group relative h-3 w-3 rounded-full bg-[#febc2e] transition-opacity hover:opacity-80"
              >
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[7px] text-[#7a5300] opacity-0 group-hover:opacity-100 select-none">
                  {windowState === "minimized" ? "+" : "−"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setLightbox(true)}
                aria-label="Expand"
                className="group relative h-3 w-3 rounded-full bg-[#28c840] transition-opacity hover:opacity-80"
              >
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[7px] text-[#0a4a1a] opacity-0 group-hover:opacity-100 select-none">↗</span>
              </button>
            </div>

            {/* URL bar */}
            <div className="flex min-w-0 flex-1 items-center justify-center">
              <span className="max-w-[200px] truncate rounded-[6px] bg-[#e6e1d8] px-3 py-[3px] font-mono text-[11px] text-ink-soft sm:max-w-full sm:text-[11.5px]">
                {url}
              </span>
            </div>

            {/* Right spacer to keep URL visually centred */}
            <div className="w-[54px] shrink-0" />
          </div>

          {/* Image area */}
          {windowState === "open" && (
            <div className="group relative h-[220px] bg-[#f6f1ea] sm:h-[280px] md:h-[300px]">
              <button
                type="button"
                onClick={() => setLightbox(true)}
                aria-label="View full size"
                className="absolute inset-0 z-10 cursor-zoom-in"
              />
              <Image
                key={images[index]}
                src={images[index]}
                alt={`${alt} — image ${index + 1}`}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 760px"
                priority={index === 0}
              />

              {/* Expand hint — always visible on touch, hover-only on desktop */}
              <span className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-paper/80 px-2.5 py-1 font-mono text-[11px] text-ink backdrop-blur-sm transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                ⤢ expand
              </span>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-paper/80 text-ink shadow backdrop-blur-sm transition-opacity hover:bg-paper sm:h-9 sm:w-9 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-paper/80 text-ink shadow backdrop-blur-sm transition-opacity hover:bg-paper sm:h-9 sm:w-9 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    →
                  </button>
                </>
              )}

              {images.length > 1 && (
                <span className="absolute bottom-3 right-3 z-20 rounded-full bg-paper/80 px-2.5 py-1 font-mono text-[11px] text-ink backdrop-blur-sm">
                  {index + 1} / {images.length}
                </span>
              )}
            </div>
          )}

          {/* Minimized state */}
          {windowState === "minimized" && (
            <button
              type="button"
              onClick={() => setWindowState("open")}
              className="flex w-full items-center justify-center py-3 font-mono text-[11.5px] text-ink-soft transition-colors hover:bg-[#ece8df] hover:text-ink"
            >
              tap to restore
            </button>
          )}
        </div>

        {/* Dot indicators */}
        {windowState === "open" && images.length > 1 && (
          <div className="flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === index ? "w-5 bg-accent" : "w-1.5 bg-line-strong hover:bg-ink-soft"
                }`}
              />
            ))}
          </div>
        )}

        {/* Thumbnail strip */}
        {windowState === "open" && images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative h-[56px] w-[84px] flex-none overflow-hidden rounded-[8px] border-2 transition-all sm:h-[60px] sm:w-[90px] ${
                  i === index ? "border-accent" : "border-line-strong opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt={`${alt} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="90px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
        >
          <div
            className="relative flex w-full max-w-5xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close — inside the container, top-right, always visible */}
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[11px] text-white/50">
                {images.length > 1 ? `${index + 1} / ${images.length}` : ""}
              </span>
              <div className="flex items-center gap-3">
                {images.length > 1 && (
                  <span className="hidden font-mono text-[11px] text-white/40 sm:block">
                    ← → to navigate · esc to close
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setLightbox(false)}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-paper/20 text-white transition-colors hover:bg-paper/40"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative max-h-[80vh] w-full">
              <Image
                src={images[index]}
                alt={`${alt} — image ${index + 1}`}
                width={1920}
                height={1080}
                className="h-auto max-h-[80vh] w-full rounded-[10px] object-contain"
                priority
              />
            </div>

            {/* Prev / Next — below image on mobile, overlaid on desktop */}
            {images.length > 1 && (
              <div className="mt-4 flex justify-center gap-4 sm:hidden">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous image"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/20 text-white transition-colors hover:bg-paper/40"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next image"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/20 text-white transition-colors hover:bg-paper/40"
                >
                  →
                </button>
              </div>
            )}

            {/* Desktop overlaid arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute left-0 top-1/2 hidden -translate-x-14 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-paper/20 text-white shadow transition-colors hover:bg-paper/40 sm:flex"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next image"
                  className="absolute right-0 top-1/2 hidden translate-x-14 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-paper/20 text-white shadow transition-colors hover:bg-paper/40 sm:flex"
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
