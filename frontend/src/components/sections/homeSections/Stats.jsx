import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// PLACEHOLDER VALUES: replace with your model's validated metrics before launch.
const STATS = [
  { value: 98, suffix: "%", label: "Classification accuracy on the test set" },
  { value: 4, suffix: "", label: "Tumor classes recognized" },
  { value: 10, suffix: "s", prefix: "<", label: "Typical time to a result" },
];

const Counter = ({ value, prefix = "", suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) { ref.current.textContent = `${prefix}${value}${suffix}`; return; }
    const c = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`; },
    });
    return () => c.stop();
  }, [inView, reduce, value, prefix, suffix]);
  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
};

const Stats = () => (
  <section className="section">
    <div className="stats glass glass--strong">
      {STATS.map((s) => (
        <div key={s.label} className="stats__item">
          <strong><Counter {...s} /></strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Stats;
