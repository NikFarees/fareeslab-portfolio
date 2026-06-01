"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { playKeyClick } from "@/utils/sounds";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

// ---------------------------------------------------------------------------
// Fake filesystem
// ---------------------------------------------------------------------------
type FSNode = { type: "file"; content: string } | { type: "dir"; children: Record<string, FSNode> };

function uniq(values: string[]) {
  return [...new Set(values)];
}

function makeFs(): Record<string, FSNode> {
  const skills = uniq([
    ...site.badges,
    ...projects.flatMap((project) => project.stack),
  ]);

  const projectDirs: Record<string, FSNode> = {};
  for (const project of projects) {
    const links = [
      project.links?.github ? `GitHub : ${project.links.github}` : "",
      project.links?.live ? `Live   : ${project.links.live}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    projectDirs[project.slug] = {
      type: "dir",
      children: {
        "README.md": {
          type: "file",
          content: `# ${project.title}
Category  : ${project.category}
Role      : ${project.role}
Visibility: ${project.visibility}
Stack     : ${project.stack.join(" · ")}

${project.description}${links ? `\n\n${links}` : ""}`,
        },
      },
    };
  }

  return {
    "about.txt": {
      type: "file",
      content: `Name    : ${site.name}
Role    : ${site.role}
Base    : Kuala Lumpur, Malaysia
Website : ${site.url}
Bio     : ${site.aboutLead}`,
    },
    "skills.txt": {
      type: "file",
      content: `Core stack:
${skills.map((skill) => `- ${skill}`).join("\n")}`,
    },
    "contact.txt": {
      type: "file",
      content: `Email    : ${site.contact.email}
GitHub   : ${site.contact.githubLabel}
LinkedIn : ${site.contact.linkedinLabel}
Phone    : ${site.contact.phoneLabel}`,
    },
    projects: {
      type: "dir",
      children: projectDirs,
    },
    experience: {
      type: "dir",
      children: {
        "career.txt": {
          type: "file",
          content: site.experience
            .map(
              (item) =>
                `[${item.period}] ${item.title} @ ${item.company}\n  - ${item.detail}`
            )
            .join("\n\n"),
        },
      },
    },
  };
}

const FS = makeFs();

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

function lcp(values: string[]) {
  if (values.length === 0) return "";
  let prefix = values[0];
  for (let i = 1; i < values.length; i++) {
    while (!values[i].startsWith(prefix) && prefix.length > 0) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
type HistoryEntry = { prompt: string; output: string };

const INTRO_LINES = site.terminalLines;
const COMMANDS = ["ls", "cd", "pwd", "cat", "whoami", "clear", "help"] as const;

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

  const pushOutput = (output: string) => {
    if (!output) return;
    setHistory((h) => [...h, { prompt: `${prompt} ${input}`, output }]);
  };

  const onTabComplete = () => {
    const raw = input;
    const trimmed = raw.trimStart();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const prog = parts[0] ?? "";
    const arg = parts[1] ?? "";
    const hasArgSlot = trimmed.includes(" ");

    if (!hasArgSlot) {
      const matches = COMMANDS.filter((command) => command.startsWith(prog));
      if (matches.length === 0) return;
      if (matches.length === 1) {
        setInput(`${matches[0]} `);
        return;
      }
      const prefix = lcp(matches);
      if (prefix.length > prog.length) {
        setInput(prefix);
      } else {
        pushOutput(matches.join("  "));
      }
      return;
    }

    if (prog !== "cd" && prog !== "cat") return;
    if (parts.length > 2) return;

    const dir = resolve(cwd);
    if (!dir) return;

    const candidates = Object.entries(dir)
      .filter(([, node]) => (prog === "cd" ? node.type === "dir" : true))
      .map(([name, node]) =>
        prog === "cd" ? name : node.type === "dir" ? `${name}/` : name
      );

    const matches = candidates.filter((name) => name.startsWith(arg));
    if (matches.length === 0) return;
    if (matches.length === 1) {
      const selected = matches[0];
      const shouldAddSpace = prog === "cat" || !selected.endsWith("/");
      setInput(`${prog} ${selected}${shouldAddSpace ? " " : ""}`);
      return;
    }

    const prefix = lcp(matches);
    if (prefix.length > arg.length) {
      setInput(`${prog} ${prefix}`);
    } else {
      pushOutput(matches.join("  "));
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      playKeyClick();
      onTabComplete();
      return;
    }
    playKeyClick();
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
