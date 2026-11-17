import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import "./Hero.css";

// Change this to the existing route the hero button should open.
const HERO_ROUTE = "/upload-mri-images";

const SAMPLE = [
  { label: "Meningioma", score: 91 },
  { label: "Glioma", score: 5 },
  { label: "Pituitary tumor", score: 3 },
  { label: "No tumor", score: 1 },
];

const Hero = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const item = (i) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="hero">
      <motion.h1 className="hero__title" {...item(0)}>
        See what a scan is hiding.
      </motion.h1>
      <motion.p className="hero__sub" {...item(1)}>
        IntelliScan reads brain MRI images and flags possible tumors in seconds,
        so specialists can focus on the cases that need them most.
      </motion.p>
      <motion.div className="hero__cta" {...item(2)}>
        <Button size="lg" onClick={() => navigate(HERO_ROUTE)}>Analyze an MRI</Button>
        <Button
          size="lg"
          variant="glass"
          onClick={() => document.getElementById("how-it-works")?.scrollIntoView()}
        >
          How it works
        </Button>
      </motion.div>

      <motion.div
        className="preview glass glass--strong"
        initial={reduce ? false : { opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="preview__slice" aria-hidden="true">
          <span className="preview__marker" />
        </div>
        <div className="preview__results">
          <p className="preview__kicker">Most likely</p>
          <p className="preview__top">Meningioma <strong>91%</strong></p>
          <ul className="preview__bars">
            {SAMPLE.map((s, i) => (
              <li key={s.label}>
                <span>{s.label}</span>
                <div className="preview__track">
                  <motion.i
                    initial={reduce ? false : { width: 0 }}
                    animate={{ width: `${s.score}%` }}
                    transition={{ delay: 1 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <b>{s.score}%</b>
              </li>
            ))}
          </ul>
          <p className="preview__note">Sample illustration. Not a real scan or diagnosis.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;