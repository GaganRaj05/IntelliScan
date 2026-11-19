const TYPES = [
  { name: "Meningioma", text: "Forms in the membranes around the brain and spinal cord. Most are benign and slow-growing.", big: true },
  { name: "Pituitary tumor", text: "Develops in the pituitary gland at the base of the brain and can affect hormone levels." },
  { name: "No tumor", text: "Scans where no abnormality is detected, so you can move on to the next one faster." },
];

const TumorTypes = () => (
  <section className="section" id="tumor-types">
    <h2 className="section__title">Three classes. One model.</h2>
    <p className="section__sub">IntelliScan is trained to tell these apart on standard MRI slices.</p>
    <div className="bento">
      {TYPES.map((t) => (
        <article key={t.name} className={`bento__item ${t.big ? "bento__item--big" : "neu-card"}`}>
          <h3>{t.name}</h3>
          <p>{t.text}</p>
        </article>
      ))}
    </div>
  </section>
);

export default TumorTypes;