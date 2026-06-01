"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

/**
 * Terminal typing effect for the hero. Types each line out, then settles.
 * First word of each line is tinted (host = accent, others = blue arrow).
 */
export default function Terminal() {
  const lines = site.terminalLines;
  const [typed, setTyped] = useState<string[]>([""]);
  const [done, setDone] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce.current) {
      setTyped([...lines]);
      setDone(true);
      return;
    }

    let li = 0;
    let ci = 0;
    const out: string[] = [""];
    const timers: ReturnType<typeof setTimeout>[] = [];

    const step = () => {
      if (li >= lines.length) {
        setDone(true);
        return;
      }
      const current = lines[li];
      if (ci <= current.length) {
        out[li] = current.slice(0, ci);
        setTyped([...out]);
        ci += 1;
        timers.push(setTimeout(step, 36 + Math.random() * 34));
      } else {
        li += 1;
        ci = 0;
        out[li] = "";
        timers.push(setTimeout(step, 260));
      }
    };

    timers.push(setTimeout(step, 500));
    return () => timers.forEach(clearTimeout);
  }, [lines]);

  const renderLine = (line: string, isLast: boolean) => {
    const firstSpace = line.indexOf(" ");
    const head = firstSpace === -1 ? line : line.slice(0, firstSpace);
    const rest = firstSpace === -1 ? "" : line.slice(firstSpace);
    const isHost = !line.startsWith(">");
    return (
      <>
        <span className={isHost ? "text-accent" : "text-[#6f8fb5]"}>{head}</span>
        <span>{rest}</span>
        {isLast && !done && (
          <span className="ml-0.5 inline-block h-4 w-2 -translate-y-[2px] animate-pulse bg-accent align-middle" />
        )}
      </>
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#2a2823] bg-[#1c1b18] shadow-term">
      <div className="flex items-center gap-1.5 border-b border-[#2c2a23] bg-[#232118] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e06c5b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e0b04f]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5fb573]" />
        <span className="ml-2 font-mono text-[11.5px] text-[#86806f]">
          zsh — {site.domain}
        </span>
      </div>
      <div className="min-h-[128px] px-[18px] py-[18px] font-mono text-[13.5px] leading-[1.85] text-[#d6d1c4]">
        {typed.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {renderLine(line, i === typed.length - 1)}
          </div>
        ))}
      </div>
    </div>
  );
}
