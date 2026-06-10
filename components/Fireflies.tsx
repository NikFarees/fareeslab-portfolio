"use client";

import { useEffect, useRef } from "react";

type Firefly = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number; // how strongly scroll parallax moves this fly
  phase: number; // flicker offset so flies don't pulse in sync
  speed: number; // flicker speed
};

// Matches the accent token in tailwind.config.ts.
const GLOW = "204, 107, 77";

/**
 * Ambient firefly layer behind the whole site. Flies drift slowly, flicker,
 * and parallax against scroll (scrolling down nudges them up and vice versa).
 * Skipped entirely when the user prefers reduced motion.
 */
export default function Fireflies() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let flies: Firefly[] = [];
    let raf = 0;
    let smoothScroll = window.scrollY;

    const spawn = () => {
      // Scale with viewport area: ~8 on phones, capped at 22 on desktop.
      const count = Math.min(22, Math.max(8, Math.round((width * height) / 60000)));
      flies = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.1,
        r: 1.2 + Math.random() * 1.8,
        depth: 0.04 + Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    };

    const wrap = 40; // off-screen margin so flies fade in/out at edges

    const draw = (t: number) => {
      // Ease toward the real scroll position so fast scrolls glide, not jump.
      smoothScroll += (window.scrollY - smoothScroll) * 0.06;
      ctx.clearRect(0, 0, width, height);
      const time = t / 1000;

      for (const f of flies) {
        f.x += f.vx;
        f.y += f.vy;
        if (f.x < -wrap) f.x = width + wrap;
        else if (f.x > width + wrap) f.x = -wrap;

        // Parallax against scroll, wrapped back into the viewport.
        const span = height + wrap * 2;
        const py = f.y - smoothScroll * f.depth;
        const yy = ((py % span) + span) % span - wrap;

        const flicker = 0.5 + 0.5 * Math.sin(time * f.speed + f.phase);
        const alpha = 0.1 + flicker * 0.25;

        const glow = ctx.createRadialGradient(f.x, yy, 0, f.x, yy, f.r * 6);
        glow.addColorStop(0, `rgba(${GLOW}, ${alpha})`);
        glow.addColorStop(1, `rgba(${GLOW}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(f.x, yy, f.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${GLOW}, ${Math.min(0.55, alpha + 0.15)})`;
        ctx.beginPath();
        ctx.arc(f.x, yy, f.r * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
