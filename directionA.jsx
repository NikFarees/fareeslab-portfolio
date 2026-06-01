// directionA.jsx — "Centered / Classic Apple"
// Sticky glass nav, centered hero, terminal tucked bottom-right of hero,
// two labeled rows of project cards, 3-up experience, centered contact.

function DirectionA({ onOpen, annot }) {
  const D = WF_DATA;
  const client = D.projects[0], personal = D.projects[1];
  return (
    <div className="page page-a">
      <Nav align="center" cta={true} />

      {/* HERO */}
      <section className="sec hero-a">
        {annot && <Annot side="left" style={{ top: 10, left: 0 }}>centered, lots of breathing room — Apple feel</Annot>}
        <span className="eyebrow">{D.role}</span>
        <h1 className="display">{D.name}</h1>
        <p className="lede">{D.heroCopy}</p>
        <div className="wf-badges center">
          {D.badges.map((b) => <Badge key={b}>{b}</Badge>)}
        </div>
        <div className="cta-row center">
          <CTA solid>Contact Me</CTA>
          <CTA>View Projects</CTA>
        </div>
        <div className="term-corner">
          {annot && <Annot side="right" style={{ top: -26, right: 0 }}>terminal tucked here, subtle</Annot>}
          <Terminal compact />
        </div>
      </section>

      {/* ABOUT */}
      <section className="sec about-a">
        <SectionTag n="01" label="ABOUT" />
        <div className="about-body">
          <Lines n={4} w={["100%", "98%", "100%", "62%"]} />
        </div>
      </section>

      {/* PROJECTS */}
      <section className="sec projects-a">
        <SectionTag n="02" label="PROJECTS" />
        {annot && <Annot side="left" style={{ marginTop: 6 }}>two labelled rows: Client, then Personal</Annot>}
        <div className="proj-group">
          <h3 className="group-title">Client Projects</h3>
          <div className="row-cards">
            <ProjectCard p={client} onOpen={() => onOpen(client.slug)} />
            <div className="wf-card ghost"><span className="ghost-plus">+</span><span>more soon</span></div>
          </div>
        </div>
        <div className="proj-group">
          <h3 className="group-title">Personal Projects</h3>
          <div className="row-cards">
            <ProjectCard p={personal} onOpen={() => onOpen(personal.slug)} />
            <div className="wf-card ghost"><span className="ghost-plus">+</span><span>more soon</span></div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="sec exp-a">
        <SectionTag n="03" label="EXPERIENCE" />
        <div className="exp-grid-3">
          {D.experience.map((e, i) => <ExpCard key={i} e={e} n={`0${i + 1}`} />)}
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec contact-a">
        <SectionTag n="04" label="CONTACT" />
        <h2 className="contact-head">Let’s build something.</h2>
        <div className="contact-list center-list">
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

window.DirectionA = DirectionA;
