// app.jsx — wireframe shell: tab control + tweaks wiring.

const TABS = [
  { id: "a", label: "A · Centered" },
  { id: "b", label: "B · Split" },
  { id: "c", label: "C · Sidebar" },
  { id: "detail", label: "Project Detail" },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#3f72af",
  "fidelity": "sketch",
  "density": "regular",
  "annotations": true,
  "handFont": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [tab, setTab] = useState("a");
  const [slug, setSlug] = useState(WF_DATA.projects[0].slug);
  const [back, setBack] = useState("a");
  const stageRef = useRef(null);

  const openDetail = (s) => { setSlug(s); setBack(tab === "detail" ? back : tab); setTab("detail"); stageScrollTop(); };
  const goBack = () => { setTab(back); stageScrollTop(); };
  function stageScrollTop() { setTimeout(() => stageRef.current && (stageRef.current.scrollTop = 0), 0); }

  const switchTab = (id) => { setTab(id); stageScrollTop(); };

  const annot = t.annotations;
  const rootStyle = {
    "--accent": t.accent,
    "--head-font": t.handFont ? "'Patrick Hand', cursive" : "'Space Grotesk', system-ui, sans-serif",
  };

  return (
    <div className="wf-root" data-fidelity={t.fidelity} data-density={t.density} style={rootStyle}>
      {/* Toolbar */}
      <header className="wf-toolbar">
        <div className="wf-tb-title">
          <span className="wf-tb-mark">✎</span>
          Nik Farees — Portfolio <span className="wf-tb-dim">/ wireframes</span>
        </div>
        <div className="wf-tabs">
          {TABS.map((x) => (
            <button key={x.id} className={"wf-tab" + (tab === x.id ? " on" : "")} onClick={() => switchTab(x.id)}>
              {x.label}
            </button>
          ))}
        </div>
        <div className="wf-tb-hint">low-fi · structure & flow</div>
      </header>

      {/* Stage */}
      <main className="wf-stage" ref={stageRef}>
        <div className="wf-stage-inner">
          {tab === "a" && <DirectionA onOpen={openDetail} annot={annot} />}
          {tab === "b" && <DirectionB onOpen={openDetail} annot={annot} />}
          {tab === "c" && <DirectionC onOpen={openDetail} annot={annot} />}
          {tab === "detail" && <DetailPage slug={slug} onBack={goBack} annot={annot} />}
        </div>
      </main>

      {/* Tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Look" />
        <TweakRadio label="Fidelity" value={t.fidelity} options={["sketch", "clean"]}
          onChange={(v) => setTweak("fidelity", v)} />
        <TweakColor label="Accent" value={t.accent}
          options={["#3f72af", "#1f8a5b", "#b4593b", "#6d5ae0", "#2b2a28"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakToggle label="Handwritten headings" value={t.handFont}
          onChange={(v) => setTweak("handFont", v)} />
        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density} options={["cozy", "regular", "airy"]}
          onChange={(v) => setTweak("density", v)} />
        <TweakToggle label="Margin notes" value={t.annotations}
          onChange={(v) => setTweak("annotations", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
