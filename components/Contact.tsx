"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { site } from "@/data/site";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";
import { playConfettiSound } from "@/utils/sounds";

// ---------------------------------------------------------------------------
// Confetti canvas
// ---------------------------------------------------------------------------
function Confetti({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLORS = ["#D97757", "#5fb573", "#6f8fb5", "#e0b04f", "#e06c5b", "#f0c070"];
    const pieces = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 120,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 2 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w: Math.random() * 11 + 4,
      h: Math.random() * 7 + 3,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 12,
      alpha: 1,
    }));

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let any = false;
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07;
        p.rot += p.rotV;
        if (p.y > canvas.height * 0.55) p.alpha -= 0.018;
        if (p.alpha > 0) {
          any = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rot * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      }
      if (any) raf = requestAnimationFrame(tick);
      else onDone();
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" />;
}

// ---------------------------------------------------------------------------
// Toast
// ---------------------------------------------------------------------------
function Toast({ visible }: { visible: boolean }) {
  return (
    <div
      className={`fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-[#1c1b18] px-5 py-3 text-[14px] font-medium text-white shadow-xl transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      Glad you like it — you made my day!
    </div>
  );
}

// ---------------------------------------------------------------------------
// The fun widget
// ---------------------------------------------------------------------------
function FunWidget() {
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [noClicks, setNoClicks] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [done, setDone] = useState(false);
  const arenaRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);

  const noGone = noClicks >= 3;
  const promptByNoClicks = [
    "Do you like my website?",
    "You sure you want to say no?",
    "Are you really really sure you dont like my website?",
    "How about i help you.",
  ] as const;
  const promptTitle = promptByNoClicks[Math.min(noClicks, promptByNoClicks.length - 1)];
  const promptSubtitle =
    noClicks === 1 || noClicks === 2 ? "Please dont click no..." : "Be honest.";

  const escape = useCallback(() => {
    if (noGone) return;
    const arena = arenaRef.current;
    const btn = noRef.current;
    if (!arena || !btn) return;
    const aw = arena.offsetWidth;
    const ah = arena.offsetHeight;
    const bw = btn.offsetWidth || 80;
    const bh = btn.offsetHeight || 36;
    const cur = noPos ?? { x: aw - bw - 16, y: ah - bh - 16 };
    let nx: number, ny: number;
    do {
      nx = Math.random() * (aw - bw);
      ny = Math.random() * (ah - bh);
    } while (Math.abs(nx - cur.x) < 40 && Math.abs(ny - cur.y) < 40);
    setNoPos({ x: nx, y: ny });
    setNoClicks((c) => Math.min(3, c + 1));
  }, [noGone, noPos]);

  const handleYes = () => {
    playConfettiSound();
    setDone(true);
    setConfetti(true);
    setToast(true);
    setTimeout(() => setToastVisible(true), 40);
    setTimeout(() => setToastVisible(false), 2800);
    setTimeout(() => setToast(false), 3400);
  };

  if (done) {
    return (
      <>
        {confetti && <Confetti onDone={() => setConfetti(false)} />}
        {toast && <Toast visible={toastVisible} />}
        <div className="flex w-[340px] flex-col items-center rounded-[18px] border border-line bg-surface px-8 py-10 text-center shadow-card">
          <p className="mt-3 text-[20px] font-semibold">I knew you&rsquo;d click yes.</p>
          <p className="mt-2 text-[15px] text-ink-soft">Thank you for visiting — it genuinely means a lot. Hope it left a good impression!</p>
        </div>
      </>
    );
  }

  return (
    <div className="w-[340px] overflow-hidden rounded-[18px] border border-line bg-surface shadow-card">
      {/* Header */}
      <div className="px-6 pt-6 pb-5">
        <p className="text-[18px] font-semibold tracking-[-0.01em]">{promptTitle}</p>
        <p className="mt-1 text-[14px] text-ink-soft">{promptSubtitle}</p>
      </div>

      {/* Arena — No button runs around in here */}
      <div ref={arenaRef} className="relative h-[150px] border-t border-line">
        {/* Yes — centered when No is gone, otherwise bottom-left */}
        <button
          onClick={handleYes}
          className={`rounded-[10px] bg-accent text-white font-medium transition-all hover:bg-accent-dark ${
            noGone
              ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-10 py-4 text-[18px]"
              : "absolute bottom-5 left-5 px-5 py-2.5 text-[15px]"
          }`}
        >
          Yes
        </button>

        {/* No — runs away, disappears after 7 escapes */}
        {!noGone && (
          <button
            ref={noRef}
            onClick={escape}
            style={
              noPos
                ? { position: "absolute", left: noPos.x, top: noPos.y, transition: "left 0.12s ease, top 0.12s ease" }
                : { position: "absolute", bottom: 20, right: 16 }
            }
            className="rounded-[10px] border border-line-strong bg-surface px-5 py-2.5 text-[15px] font-medium text-ink"
          >
            No
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Contact section
// ---------------------------------------------------------------------------
type Row = { label: string; value: string; href: string; external?: boolean };

export default function Contact() {
  const c = site.contact;
  const whatsappPhone = c.phone.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(
    "Hi Nik, I came across your portfolio. Are you available for a quick chat?"
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;
  const rows: Row[] = [
    { label: "Email", value: c.email, href: `mailto:${c.email}` },
    { label: "GitHub", value: c.githubLabel, href: c.github, external: true },
    { label: "LinkedIn", value: c.linkedinLabel, href: c.linkedin, external: true },
    { label: "Phone", value: c.phoneLabel, href: whatsappUrl, external: true },
  ];

  return (
    <section id="contact" className="border-t border-line py-20 md:py-[78px]">
      <div className="wrap">
        <Reveal>
          <SectionTag number="04" label="Contact" />
        </Reveal>

        <div className="flex flex-wrap items-start justify-between gap-10">
          {/* Left: contact info */}
          <div className="flex-1">
            <Reveal>
              <h2 className="mb-2 text-[clamp(34px,5vw,56px)] font-semibold leading-[1.02] tracking-[-0.03em]">
                Let&rsquo;s build something.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mb-9 text-[18px] text-ink-soft">
                Open to roles and freelance work — reach out through any channel below.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="flex max-w-[620px] flex-col">
              {rows.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-[18px] border-t border-line py-[18px] transition-all hover:pl-3.5"
                >
                  <span className="w-[88px] flex-none font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                    {r.label}
                  </span>
                  <span className="text-[17px] transition-colors group-hover:text-accent">
                    {r.value}
                  </span>
                  <span className="ml-auto text-ink-soft transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">
                    ↗
                  </span>
                </a>
              ))}
            </Reveal>
          </div>

          {/* Right: fun widget */}
          <Reveal delay={0.14} className="flex w-full justify-center pt-2 md:w-auto md:justify-start">
            <FunWidget />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
