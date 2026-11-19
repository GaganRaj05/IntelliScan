import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import Button from "../ui/Button";
import "./ResultsDisplay.css";

// Classes that must never be shown. Matched case-insensitively against the
// keys the backend returns in `all_predictions` (e.g. "glioma_tumor").
const EXCLUDED_CLASSES = ["glioma"];

const pretty = (s) => s.replace(/_/g, " ");
const isExcluded = (key) => EXCLUDED_CLASSES.some((x) => key.toLowerCase().includes(x));

const ResultDisplay = ({ result }) => {
  if (!result) return <p className="result__loading">Loading result…</p>;

  // Drop excluded classes, then rescale the rest so they sum to 100%.
  const kept = Object.entries(result.all_predictions ?? {}).filter(([key]) => !isExcluded(key));
  const total = kept.reduce((sum, [, v]) => sum + v, 0);

  if (!kept.length || total <= 0) {
    return <p className="result__loading">No result available for this scan.</p>;
  }

  const entries = kept.map(([k, v]) => [k, v / total]).sort((a, b) => b[1] - a[1]);
  const [topClass, topConfidence] = entries[0];

  return (
    <section className="result">
      <motion.div
        className="result__card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="result__label">Most likely result</p>
        <h1 className="result__class">{pretty(topClass)}</h1>
        <p className="result__conf">{(topConfidence * 100).toFixed(2)}% confidence</p>

        <h2 className="result__heading">All class probabilities</h2>
        <ul className="result__bars">
          {entries.map(([key, value], i) => (
            <li key={key} className={`result__bar ${i === 0 ? "is-top" : ""}`}>
              <span>{pretty(key)}</span>
              <div className="result__track">
                <motion.i
                  initial={{ width: 0 }}
                  animate={{ width: `${value * 100}%` }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <b>{(value * 100).toFixed(1)}%</b>
            </li>
          ))}
        </ul>

        <p className="result__note">
          This result is not a medical diagnosis. Share it with a qualified doctor to confirm.
        </p>
        <div className="result__actions">
          <Link to="/upload-mri-images" tabIndex={-1}>
            <Button variant="glass"><RotateCcw size={16} aria-hidden="true" />Analyze another scan</Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default ResultDisplay;