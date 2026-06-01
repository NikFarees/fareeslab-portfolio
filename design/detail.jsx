// detail.jsx — Project Detail page wireframe ( /projects/[slug] )
// Title, category, overview, role, tech stack, contribution summary,
// privacy note if private, optional links when available.

function DetailPage({ slug, onBack, annot }) {
  const D = WF_DATA;
  const p = D.projects.find((x) => x.slug === slug) || D.projects[0];
  const isPrivate = p.visibility === "Private";
  return (
    <div className="page page-detail">
      <div className="wf-nav wf-nav-minimal">
        <div className="wf-nav-brand"><span className="wf-nav-dot" /> {D.name}</div>
        <span className="detail-back" onClick={onBack}>← All projects</span>
      </div>

      <section className="sec detail-hero">
        <span className="detail-crumb">Projects / {p.cat}</span>
        <div className="detail-titlerow">
          <h1 className="display">{p.title}</h1>
          <Tag kind={isPrivate ? "lock" : "open"}>{isPrivate ? "🔒 Private" : "● Public"}</Tag>
        </div>
        {annot && <Annot side="left" style={{ marginTop: 4 }}>route: /projects/[slug]</Annot>}
        <div className="wf-badges">{p.stack.map((s) => <Badge key={s}>{s}</Badge>)}</div>
        {p.links ? (
          <div className="cta-row"><CTA solid>GitHub</CTA><CTA>Live demo</CTA></div>
        ) : (
          <div className="privacy-note">
            <span className="privacy-ico">🔒</span>
            This is a private client project — source code and live link are not publicly available.
          </div>
        )}
      </section>

      <section className="sec detail-body">
        <div className="detail-main">
          <div className="detail-block">
            <h3 className="detail-h">Overview</h3>
            <Lines n={4} w={["100%", "97%", "100%", "68%"]} />
          </div>
          <div className="detail-block">
            <h3 className="detail-h">Contribution summary</h3>
            <Lines n={3} w={["100%", "90%", "58%"]} />
            <ul className="detail-ul">
              <li><span className="wf-line sm" style={{ width: "72%" }} /></li>
              <li><span className="wf-line sm" style={{ width: "64%" }} /></li>
              <li><span className="wf-line sm" style={{ width: "78%" }} /></li>
            </ul>
          </div>
          <Img label="screens / architecture diagram" h={220} />
        </div>

        <aside className="detail-side">
          <div className="meta-card">
            <div className="meta-row"><span className="meta-k">Category</span><span className="meta-v">{p.cat}</span></div>
            <div className="meta-row"><span className="meta-k">Role</span><span className="meta-v">Software Engineer</span></div>
            <div className="meta-row"><span className="meta-k">Visibility</span><span className="meta-v">{p.visibility}</span></div>
            <div className="meta-row col">
              <span className="meta-k">Tech stack</span>
              <div className="wf-badges" style={{ marginTop: 8 }}>{p.stack.map((s) => <Badge key={s}>{s}</Badge>)}</div>
            </div>
            {p.links && (
              <div className="meta-row col">
                <span className="meta-k">Links</span>
                <div className="cta-row" style={{ marginTop: 8 }}><CTA sm>GitHub</CTA><CTA sm>Live</CTA></div>
              </div>
            )}
          </div>
          {annot && <Annot side="left" style={{ marginTop: 12 }}>sticky meta rail with role + stack</Annot>}
        </aside>
      </section>

      <Footer />
    </div>
  );
}

window.DetailPage = DetailPage;
