// directionB.jsx — "Split / Asymmetric Editorial"
// Minimal nav (name left, single CTA right), split hero (big type left / terminal right),
// tabbed Client/Personal projects, big-number experience list, left-aligned contact.

function DirectionB({ onOpen, annot }) {
  const D = WF_DATA;
  const [tab, setTab] = useState(0);
  const proj = D.projects[tab];
  return (
    <div className="page page-b">
      <div className="wf-nav wf-nav-minimal">
        <div className="wf-nav-brand"><span className="wf-nav-dot" /> {D.name}</div>
        <div className="wf-nav-links">{D.nav.map((l) => <span key={l} className="wf-nav-link">{l}</span>)}</div>
        <CTA sm solid>Contact</CTA>
      </div>

      {/* HERO split */}
      <section className="sec hero-b">
        <div className="hero-b-left">
          {annot && <Annot side="left" style={{ marginBottom: 10 }}>oversized name, editorial weight</Annot>}
          <span className="eyebrow">{D.role}</span>
          <h1 className="display xl">{D.name}</h1>
          <p className="lede">{D.heroCopy}</p>
          <div className="wf-badges">{D.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>
          <div className="cta-row"><CTA solid>Contact Me</CTA><CTA>View Projects</CTA></div>
        </div>
        <div className="hero-b-right">
          {annot && <Annot side="right" style={{ marginBottom: 8 }}>terminal lives in the side rail</Annot>}
          <Terminal />
          <Img label="portrait / workspace" h={150} style={{ marginTop: 16 }} />
        </div>
      </section>

      {/* ABOUT two-col */}
      <section className="sec about-b">
        <SectionTag n="01" label="ABOUT" />
        <div className="about-2col">
          <h3 className="about-lead">A backend-leaning engineer who ships.</h3>
          <Lines n={5} w={["100%", "92%", "100%", "88%", "55%"]} />
        </div>
      </section>

      {/* PROJECTS tabbed */}
      <section className="sec projects-b">
        <SectionTag n="02" label="PROJECTS" />
        {annot && <Annot side="left" style={{ marginTop: 6 }}>toggle between Client / Personal</Annot>}
        <div className="proj-tabs">
          <button className={"proj-tab" + (tab === 0 ? " on" : "")} onClick={() => setTab(0)}>Client Projects</button>
          <button className={"proj-tab" + (tab === 1 ? " on" : "")} onClick={() => setTab(1)}>Personal Projects</button>
        </div>
        <div className="proj-tabpanel">
          <ProjectCard p={proj} big onOpen={() => onOpen(proj.slug)} />
          <div className="wf-card ghost tall"><span className="ghost-plus">+</span><span>add more here</span></div>
        </div>
      </section>

      {/* EXPERIENCE big-number list */}
      <section className="sec exp-b">
        <SectionTag n="03" label="EXPERIENCE" />
        <div className="exp-list">
          {D.experience.map((e, i) => (
            <div className="exp-row" key={i}>
              <span className="exp-row-n">0{i + 1}</span>
              <div className="exp-row-body">
                <h4 className="wf-exp-t">{e.t}</h4>
                <p className="wf-exp-d">{e.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT left */}
      <section className="sec contact-b">
        <SectionTag n="04" label="CONTACT" />
        <h2 className="contact-head big">Let’s build something.</h2>
        <div className="contact-list">
          <ContactRow label="Email" value={D.contact.email} />
          <ContactRow label="GitHub" value={D.contact.github} />
          <ContactRow label="LinkedIn" value={D.contact.linkedin} />
          <ContactRow label="Phone" value={D.contact.phone} />
        </div>
      </section>

      <Footer />
    </div>
  );
}

window.DirectionB = DirectionB;
