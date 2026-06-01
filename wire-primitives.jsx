// wire-primitives.jsx
// Shared low-fi wireframe building blocks + portfolio content.
// All components export to window at the bottom.

const { useState, useEffect, useRef } = React;

/* ----------------------------- CONTENT ----------------------------- */
const WF_DATA = {
  name: "Nik Farees",
  role: "Software Engineer",
  domain: "fareeslab.dev",
  heroCopy:
    "Building reliable backend systems, scalable web applications, and deployment-ready digital products with Laravel, Next.js, Docker, and modern engineering workflows.",
  badges: ["Laravel", "Next.js", "Docker", "MySQL", "Filament"],
  terminal: ["fareeslab.dev", "> building backend systems...", "> deploying web applications...", "> ready."],
  about:
    "Nik Farees is a Software Engineer focused on building practical, maintainable, and deployment-ready web applications. His work combines backend engineering, modern frontend frameworks, database-driven systems, Docker-based workflows, and production-focused problem solving.",
  nav: ["About", "Projects", "Experience", "Contact"],
  projects: [
    {
      slug: "client-project-one",
      cat: "Client Project",
      title: "Client Project One",
      desc: "A private client system with backend workflows, admin features, and database-driven operations.",
      stack: ["Laravel", "Filament", "Docker", "MySQL"],
      visibility: "Private",
      links: false,
    },
    {
      slug: "personal-project-one",
      cat: "Personal Project",
      title: "Personal Project One",
      desc: "A personal software project that can include a public demo or GitHub link later.",
      stack: ["Next.js", "Laravel", "Docker"],
      visibility: "Public",
      links: true,
    },
  ],
  experience: [
    { t: "Backend Application Development", d: "Designing APIs, data models, and business logic for maintainable server-side systems." },
    { t: "DevOps & Deployment", d: "Containerized, VPS-ready deployments with Docker and reproducible workflows." },
    { t: "Admin & Operational Systems", d: "Internal dashboards and admin panels that keep day-to-day operations running." },
  ],
  contact: {
    email: "nfarees.faizal@gmail.com",
    github: "github.com/NikFarees",
    linkedin: "linkedin.com/in/nikfarees",
    phone: "+60 11-7511 2905",
  },
  footer: "© 2026 Nik Farees. Built with Next.js.",
};

/* --------------------------- PRIMITIVES ---------------------------- */

// Grey placeholder text lines (true low-fi body copy)
function Lines({ n = 3, w = ["100%", "96%", "70%"], gap = 9 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="wf-line" style={{ width: w[i % w.length] }} />
      ))}
    </div>
  );
}

// A small handwritten margin annotation in the accent color
function Annot({ children, side = "left", style }) {
  return (
    <span className={`wf-annot wf-annot-${side}`} style={style}>
      <span className="wf-annot-arrow">{side === "left" ? "↘" : "↙"}</span>
      {children}
    </span>
  );
}

// Section index marker e.g. "02 / ABOUT"
function SectionTag({ n, label }) {
  return (
    <div className="wf-sectag">
      <span className="wf-sectag-n">{n}</span>
      <span className="wf-sectag-line" />
      <span className="wf-sectag-label">{label}</span>
    </div>
  );
}

// Tech badge pill
function Badge({ children, solid }) {
  return <span className={"wf-badge" + (solid ? " wf-badge-solid" : "")}>{children}</span>;
}

// Visibility / status tag
function Tag({ children, kind = "muted" }) {
  return <span className={`wf-tag wf-tag-${kind}`}>{children}</span>;
}

// Button placeholder
function CTA({ children, solid, sm }) {
  return <span className={"wf-btn" + (solid ? " wf-btn-solid" : "") + (sm ? " wf-btn-sm" : "")}>{children}</span>;
}

// Striped image / media placeholder with a monospace label
function Img({ label = "image", h = 160, style }) {
  return (
    <div className="wf-img" style={{ height: h, ...style }}>
      <span className="wf-img-label">{label}</span>
    </div>
  );
}

// Subtle terminal block with a looping typing effect
function Terminal({ compact, lines = WF_DATA.terminal }) {
  const [shown, setShown] = useState([""]);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let li = 0, ci = 0, alive = true;
    const out = [""];
    setShown([""]); setDone(false);
    function step() {
      if (!alive) return;
      if (li >= lines.length) { setDone(true); return; }
      const cur = lines[li];
      if (ci <= cur.length) {
        out[li] = cur.slice(0, ci);
        setShown([...out]);
        ci++;
        setTimeout(step, 38 + Math.random() * 30);
      } else {
        li++; ci = 0; out[li] = "";
        setTimeout(step, 260);
      }
    }
    const id = setTimeout(step, 500);
    return () => { alive = false; clearTimeout(id); };
  }, []);
  return (
    <div className={"wf-term" + (compact ? " wf-term-compact" : "")}>
      <div className="wf-term-bar">
        <span className="wf-term-dot" /><span className="wf-term-dot" /><span className="wf-term-dot" />
        <span className="wf-term-title">zsh — {WF_DATA.domain}</span>
      </div>
      <div className="wf-term-body">
        {shown.map((l, i) => (
          <div key={i} className={"wf-term-line" + (i === 0 ? " wf-term-head" : "")}>
            {l}
            {i === shown.length - 1 && !done && <span className="wf-cursor">▋</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Glass sticky nav (variant-able via props)
function Nav({ align = "right", cta = true }) {
  return (
    <div className={`wf-nav wf-nav-${align}`}>
      <div className="wf-nav-brand">
        <span className="wf-nav-dot" /> {WF_DATA.name}
      </div>
      <div className="wf-nav-links">
        {WF_DATA.nav.map((l) => (
          <span key={l} className="wf-nav-link">{l}</span>
        ))}
      </div>
      {cta && <CTA sm>Contact</CTA>}
    </div>
  );
}

// A project card face: title + description + stack badges (user's chosen card style)
function ProjectCard({ p, big, onOpen }) {
  return (
    <div className={"wf-card" + (big ? " wf-card-big" : "")} onClick={onOpen} role="button">
      <div className="wf-card-top">
        <Tag kind={p.visibility === "Private" ? "lock" : "open"}>
          {p.visibility === "Private" ? "🔒 Private" : "● Public"}
        </Tag>
        <span className="wf-card-cat">{p.cat}</span>
      </div>
      <Img label="project shot" h={big ? 150 : 120} style={{ margin: "14px 0" }} />
      <h4 className="wf-card-title">{p.title}</h4>
      <p className="wf-card-desc">{p.desc}</p>
      <div className="wf-badges">
        {p.stack.map((s) => <Badge key={s}>{s}</Badge>)}
      </div>
      {p.links && (
        <div className="wf-card-links">
          <CTA sm>GitHub</CTA><CTA sm>Live demo</CTA>
        </div>
      )}
      <span className="wf-card-open">View detail →</span>
    </div>
  );
}

// A small experience card
function ExpCard({ e, n }) {
  return (
    <div className="wf-exp">
      <span className="wf-exp-n">{n}</span>
      <h4 className="wf-exp-t">{e.t}</h4>
      <p className="wf-exp-d">{e.d}</p>
    </div>
  );
}

// Contact line item
function ContactRow({ label, value }) {
  return (
    <div className="wf-contact-row">
      <span className="wf-contact-label">{label}</span>
      <span className="wf-contact-value">{value}</span>
      <span className="wf-contact-link">↗</span>
    </div>
  );
}

function Footer() {
  return <div className="wf-footer">{WF_DATA.footer}</div>;
}

Object.assign(window, {
  WF_DATA, Lines, Annot, SectionTag, Badge, Tag, CTA, Img, Terminal, Nav,
  ProjectCard, ExpCard, ContactRow, Footer,
});
