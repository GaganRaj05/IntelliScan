import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NeuButton from "./NeuButton";

// Change this to the existing route the hero button should open.
const HERO_ROUTE = "/upload-mri-images";
const EASE = [0.22, 1, 0.36, 1];

const SAMPLE = [
  { label: "Meningioma", score: 91 },
  { label: "Pituitary tumor", score: 6 },
  { label: "No tumor", score: 3 },
];

// One orchestrated moment: scan line sweeps the slice, the marker lands, then the bars fill.
const SWEEP_AT = 0.9;
const SWEEP_FOR = 1.6;
const MARKER_AT = SWEEP_AT + SWEEP_FOR * 0.36;
const BARS_AT = SWEEP_AT + SWEEP_FOR;

const Hero = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const rise = (i) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.08 * i, duration: 0.7, ease: EASE },
  });

  return (
    <section className="hero">
      <motion.h1 className="hero__title" {...rise(0)}>
        See what a scan is hiding.
      </motion.h1>
      <motion.p className="hero__sub" {...rise(1)}>
        IntelliScan reads brain MRI slices and flags possible tumors in seconds,
        so specialists can focus on the cases that need them most.
      </motion.p>
      <motion.div className="hero__cta" {...rise(2)}>
        <NeuButton size="lg" onClick={() => navigate(HERO_ROUTE)}>Analyze an MRI</NeuButton>
        <NeuButton size="lg" variant="soft" onClick={() => document.getElementById("how-it-works")?.scrollIntoView()}>
          How it works
        </NeuButton>
      </motion.div>

      <motion.div
        className="device"
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
      >
        <div className="slice" aria-hidden="true">
          {!reduce && (
            <motion.span
              className="slice__sweep"
              initial={{ top: "0%", opacity: 1 }}
              animate={{ top: "100%", opacity: [1, 1, 0] }}
              transition={{ delay: SWEEP_AT, duration: SWEEP_FOR, ease: "linear", opacity: { times: [0, 0.9, 1], duration: SWEEP_FOR, delay: SWEEP_AT } }}
            />
          )}
          <motion.span
            className="slice__marker"
            initial={reduce ? false : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: MARKER_AT, type: "spring", stiffness: 260, damping: 18 }}
          />
        </div>

        <div className="device__panel glass">
          <p className="device__kicker">Most likely</p>
          <p className="device__top">Meningioma <strong>91%</strong></p>
          <ul className="device__bars">
            {SAMPLE.map((s, i) => (
              <li key={s.label}>
                <span>{s.label}</span>
                <div className="track">
                  <motion.i
                    initial={reduce ? false : { width: 0 }}
                    animate={{ width: `${s.score}%` }}
                    transition={{ delay: BARS_AT + i * 0.12, duration: 0.9, ease: EASE }}
                  />
                </div>
                <b>{s.score}%</b>
              </li>
            ))}
          </ul>
          <p className="device__note">Sample illustration. Not a real scan or diagnosis.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;