const TYPES = [
  { name: "Glioma", text: "Grows from glial cells that support neurons. Gliomas range from slow-growing to aggressive and are the most common primary brain tumor.", big: true },
  { name: "Meningioma", text: "Forms in the membranes around the brain and spinal cord. Most are benign and slow-growing." },
  { name: "Pituitary tumor", text: "Develops in the pituitary gland at the base of the brain and can affect hormone levels." },
  { name: "No tumor", text: "Scans with no detected abnormality, so you can rule out the common types quickly." },
];

const TumorTypes = () => (
  <section className="section" id="tumor-types">
    <h2 className="section__title">Four classes. One model.</h2>
    <p className="section__sub">Pixel is trained to tell these apart on standard MRI slices.</p>
    <div className="bento">
      {TYPES.map((t) => (
        <article key={t.name} className={`card bento__item ${t.big ? "bento__item--big" : ""}`}>
          <h3>{t.name}</h3>
          <p>{t.text}</p>
        </article>
      ))}
    </div>
  </section>
);

export default TumorTypes;
