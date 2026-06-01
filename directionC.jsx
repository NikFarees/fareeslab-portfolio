// directionC.jsx — "Sidebar Index"
// Fixed left sidebar nav, content column on the right. Asymmetric hero,
// single project grid with category badges, timeline experience, contact card.

function DirectionC({ onOpen, annot }) {
  const D = WF_DATA;
  return (
    <div className="page page-c">
      <aside className="side-rail">
        <div className="side-brand"><span className="wf-nav-dot" /> {D.name}</div>
        <div className="side-role">{D.role}</div>
        <nav className="side-nav">
          {D.nav.map((l, i) => (
            <span key={l} className={"side-link" + (i === 0 ? " on" : "")}>
              <span className="side-link-n">0{i + 1}</span>{l}
            </span>
          ))}
        </nav>
        <div className="side-foot">
          <Terminal compact />
          {annot && <Annot side="left" style={{ marginTop: 10 }}>terminal anchored low in the rail</Annot>}
        </div>
      </aside>

      <div className="side-content">
        {/* HERO */}
        <section className="sec hero-c">
          {annot && <Annot side="left" style={{ marginBottom: 8 }}>persistent sidebar = always-on nav</Annot>}
          <span className="eyebrow">Software Engineer · {D.domain}</span>
          <h1 className="display">{D.name}</h1>
          <p className="lede wide">{D.heroCopy}</p>
          <div className="wf-badges">{D.badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>
          <div className="cta-row"><CTA solid>Contact Me</CTA><CTA>View Projects</CTA></div>
        </section>

        {/* ABOUT */}
        <section className="sec about-c">
          <SectionTag n="01" label="ABOUT" />
          <Lines n={4} w={["100%", "95%", "90%", "50%"]} />
        </section>

        {/* PROJECTS single grid w/ category badges */}
        <section className="sec projects-c">
          <SectionTag n="02" label="PROJECTS" />
          {annot && <Annot side="left" style={{ marginTop: 6 }}>one grid, category shown as a badge</Annot>}
          <div className="proj-grid">
            {D.projects.map((p) => (
              <ProjectCard key={p.slug} p={p} onOpen={() => onOpen(p.slug)} />
            ))}
            <div className="wf-card ghost"><span className="ghost-plus">+</span><span>more soon</span></div>
          </div>
        </section>

        {/* EXPERIENCE timeline */}
        <section className="sec exp-c">
          <SectionTag n="03" label="EXPERIENCE" />
          <div className="exp-timeline">
            {D.experience.map((e, i) => (
              <div className="tl-item" key={i}>
                <span className="tl-dot" />
                <div className="tl-body">
                  <h4 className="wf-exp-t">{e.t}</h4>
                  <p className="wf-exp-d">{e.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT card */}
        <section className="sec contact-c">
          <SectionTag n="04" label="CONTACT" />
          <div className="contact-card">
            <h2 className="contact-head">Let’s build something.</h2>
            <div className="contact-list">
              <ContactRow label="Email" value={D.contact.email} />
              <ContactRow label="GitHub" value={D.contact.github} />
              <ContactRow label="LinkedIn" value={D.contact.linkedin} />
              <ContactRow label="Phone" value={D.contact.phone} />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

window.DirectionC = DirectionC;
