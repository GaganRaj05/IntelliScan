const ROWS = [
  { who: "Radiologists", text: "Get a second look on a slice before writing the report, and spot the scans that need attention first." },
  { who: "Clinics and hospitals", text: "Triage a backlog of images so urgent cases reach a specialist sooner." },
  { who: "Researchers", text: "Test how a classifier behaves on your own images and compare confidence across classes." },
  { who: "Students", text: "Learn what different tumor types look like and check your own read against a model." },
];

const Audience = () => (
  <section className="section section--narrow" id="who-its-for">
    <h2 className="section__title">Who uses IntelliScan.</h2>
    <p className="section__sub">Anyone who looks at brain MRI and wants a faster first pass.</p>
    <dl className="audience">
      {ROWS.map((r) => (
        <div key={r.who} className="audience__row">
          <dt>{r.who}</dt>
          <dd>{r.text}</dd>
        </div>
      ))}
    </dl>
  </section>
);

export default Audience;