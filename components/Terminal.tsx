"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { site } from "@/data/site";

// ---------------------------------------------------------------------------
// Fake filesystem
// ---------------------------------------------------------------------------
type FSNode = { type: "file"; content: string } | { type: "dir"; children: Record<string, FSNode> };

const FS: Record<string, FSNode> = {
  "about.txt": {
    type: "file",
    content: `Name    : Nik Farees
Role    : Software Developer
Base    : Kuala Lumpur, Malaysia
Focus   : Laravel · Filament · Docker · Next.js
Bio     : Backend-leaning engineer who ships maintainable,
          production-ready software.`,
  },
  "skills.txt": {
    type: "file",
    content: `Languages : PHP, Python, Java, C#
Backend   : Laravel, Filament, REST APIs, ASP.NET MVC
DevOps    : Docker, GitHub Actions, Git, Linux, Cloudflare
Databases : MySQL, SQLite
Frontend  : Next.js, TypeScript, Tailwind CSS`,
  },
  "contact.txt": {
    type: "file",
    content: `Email    : nfarees.faizal@gmail.com
GitHub   : github.com/NikFarees
LinkedIn : linkedin.com/in/nikfarees
Phone    : +60 11-7511 2905`,
  },
  projects: {
    type: "dir",
    children: {
      "auction-system": {
        type: "dir",
        children: {
          "README.md": {
            type: "file",
            content: `# Malaysia's Largest Online Auction System
Stack  : Laravel · MySQL · WebSockets
Users  : 100+ concurrent bidders
Status : Production · Private`,
          },
        },
      },
      "sumbangan": {
        type: "dir",
        children: {
          "README.md": {
            type: "file",
            content: `# School Donation Management System
Stack  : Laravel · Filament · Docker · GitHub Actions
CI/CD  : Staging + production pipelines from scratch
Status : Production`,
          },
        },
      },
    },
  },
  experience: {
    type: "dir",
    children: {
      "career.txt": {
        type: "file",
        content: `[Mar 2026 – Present]  Software Developer @ Latitude Innovation
  - 6+ production systems shipped
  - CI/CD pipelines across 3+ repos (GitHub Actions)

[Sep 2025 – Feb 2026] Web Developer Intern @ Latitude Innovation
  - Real-time auction backend · 100+ concurrent users
  - DNS, SMTP setup for 10+ client sites

[Oct 2023 – Mar 2024] Lecturer Assistant @ UniKL MIIT
  - Supported 50+ students in weekly labs & lectures`,
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Command resolver
// ---------------------------------------------------------------------------
function resolve(path: string[], node: Record<string, FSNode> = FS): Record<string, FSNode> | null {
  if (path.length === 0) return node;
  const [head, ...rest] = path;
  const child = node[head];
  if (!child || child.type !== "dir") return null;
  return resolve(rest, child.children);
}

function runCommand(cmd: string, cwd: string[]): { output: string; nextCwd?: string[] } {
  const [prog, ...args] = cmd.trim().split(/\s+/);

  if (!prog) return { output: "" };

  if (prog === "clear") return { output: "__CLEAR__" };

  if (prog === "help") {
    return {
      output: `Available commands:
  ls              list directory contents
  cd [dir]        change directory (cd .. to go up)
  pwd             print working directory
  cat [file]      read a file
  whoami          current user
  clear           clear the terminal
  help            show this message`,
    };
  }

  if (prog === "whoami") return { output: "nik-farees" };

  if (prog === "pwd") {
    return { output: "~/" + (cwd.length ? cwd.join("/") : "fareeslab.dev") };
  }

  if (prog === "ls") {
    const dir = resolve(cwd);
    if (!dir) return { output: "ls: cannot access directory" };
    const entries = Object.entries(dir).map(([name, node]) =>
      node.type === "dir" ? name + "/" : name
    );
    return { output: entries.join("  ") || "(empty)" };
  }

  if (prog === "cd") {
    const target = args[0];
    if (!target || target === "~") return { output: "", nextCwd: [] };
    if (target === "..") {
      return { output: "", nextCwd: cwd.slice(0, -1) };
    }
    const nextCwd = [...cwd, target];
    const dir = resolve(nextCwd);
    if (!dir) return { output: `cd: no such directory: ${target}` };
    return { output: "", nextCwd };
  }

  if (prog === "cat") {
    const target = args[0];
    if (!target) return { output: "cat: missing file operand" };
    const dir = resolve(cwd);
    if (!dir) return { output: "cat: cannot read directory" };
    const node = dir[target];
    if (!node) return { output: `cat: ${target}: No such file` };
    if (node.type === "dir") return { output: `cat: ${target}: Is a directory` };
    return { output: node.content };
  }

  return { output: `zsh: command not found: ${prog}` };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
type HistoryEntry = { prompt: string; output: string };

const INTRO_LINES = site.terminalLines;

export default function Terminal() {
  const [introTyped, setIntroTyped] = useState<string[]>([""]);
  const [introDone, setIntroDone] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState<string[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Intro typing animation
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setIntroTyped([...INTRO_LINES]);
      setIntroDone(true);
      return;
    }

    let li = 0, ci = 0;
    const out: string[] = [""];
    const timers: ReturnType<typeof setTimeout>[] = [];

    const step = () => {
      if (li >= INTRO_LINES.length) { setIntroDone(true); return; }
      const current = INTRO_LINES[li];
      if (ci <= current.length) {
        out[li] = current.slice(0, ci);
        setIntroTyped([...out]);
        ci++;
        timers.push(setTimeout(step, 36 + Math.random() * 34));
      } else {
        li++; ci = 0; out[li] = "";
        timers.push(setTimeout(step, 260));
      }
    };

    timers.push(setTimeout(step, 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Scroll inside the terminal body only — never affect the page scroll
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, introTyped]);

  const prompt = `nik@fareeslab${cwd.length ? "/" + cwd.join("/") : ""} $`;

  const submit = () => {
    const cmd = input.trim();
    if (!cmd) { setInput(""); return; }

    const { output, nextCwd } = runCommand(cmd, cwd);

    if (output === "__CLEAR__") {
      setHistory([]);
      setInput("");
      setCmdHistory((h) => [cmd, ...h]);
      setCmdIdx(-1);
      return;
    }

    setHistory((h) => [...h, { prompt: `${prompt} ${cmd}`, output }]);
    if (nextCwd !== undefined) setCwd(nextCwd);
    setCmdHistory((h) => [cmd, ...h]);
    setCmdIdx(-1);
    setInput("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { submit(); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdIdx + 1, cmdHistory.length - 1);
      setCmdIdx(next);
      setInput(cmdHistory[next] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cmdIdx - 1;
      if (next < 0) { setCmdIdx(-1); setInput(""); }
      else { setCmdIdx(next); setInput(cmdHistory[next]); }
    }
  };

  const renderIntroLine = (line: string, isLast: boolean) => {
    const firstSpace = line.indexOf(" ");
    const head = firstSpace === -1 ? line : line.slice(0, firstSpace);
    const rest = firstSpace === -1 ? "" : line.slice(firstSpace);
    const isHost = !line.startsWith(">");
    return (
      <>
        <span className={isHost ? "text-accent" : "text-[#6f8fb5]"}>{head}</span>
        <span>{rest}</span>
        {isLast && !introDone && (
          <span className="ml-0.5 inline-block h-4 w-2 -translate-y-[2px] animate-pulse bg-accent align-middle" />
        )}
      </>
    );
  };

  return (
    <div
      className="cursor-text overflow-hidden rounded-2xl border border-[#2a2823] bg-[#1c1b18] shadow-term"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex flex-shrink-0 items-center gap-1.5 border-b border-[#2c2a23] bg-[#232118] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e06c5b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e0b04f]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5fb573]" />
        <span className="ml-2 font-mono text-[11.5px] text-[#86806f]">
          zsh — {site.domain}
        </span>
      </div>

      {/* Body */}
      <div ref={bodyRef} className="max-h-[220px] min-h-[128px] overflow-y-auto px-[18px] py-[18px] font-mono text-[13px] leading-[1.85] text-[#d6d1c4]">
        {/* Intro animation */}
        {introTyped.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {renderIntroLine(line, i === introTyped.length - 1)}
          </div>
        ))}

        {/* Command history */}
        {introDone && history.map((entry, i) => (
          <div key={i} className="mt-1">
            <div className="text-[#86806f]">{entry.prompt}</div>
            {entry.output && (
              <div className="whitespace-pre-wrap text-[#d6d1c4]">{entry.output}</div>
            )}
          </div>
        ))}

        {/* Active input line */}
        {introDone && (
          <div className="mt-1 flex items-center gap-1.5">
            <span className="flex-shrink-0 text-[#86806f]">{prompt}</span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                className="w-full bg-transparent text-[#d6d1c4] caret-accent outline-none"
              />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
