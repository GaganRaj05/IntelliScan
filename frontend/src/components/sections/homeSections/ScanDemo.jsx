import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { toast } from "react-toastify";
import { ImagePlus, RotateCcw } from "lucide-react";
import NeuButton from "./NeuButton";

// Replace with a real API call that returns [{ label, score }] sorted by score.
const analyzeScan = async () => {
  await new Promise((r) => setTimeout(r, 1800));
  return [
    { label: "Meningioma", score: 0.09 },
    { label: "Pituitary tumor", score: 0.06 },
    { label: "No tumor", score: 0.85 },
  ].sort((a, b) => b.score - a.score);
};

const ScanDemo = () => {
  const reduce = useReducedMotion();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  const onDrop = useCallback((accepted, rejected) => {
    if (rejected.length) return toast.error("Use a PNG or JPG image under 10 MB.");
    if (accepted[0]) { setFile(accepted[0]); setResult(null); }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, multiple: false, maxSize: 10 * 1024 * 1024,
    accept: { "image/png": [], "image/jpeg": [] },
  });

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const run = async () => {
    setBusy(true);
    try { setResult(await analyzeScan(file)); }
    catch { toast.error("Analysis failed. Try again."); }
    finally { setBusy(false); }
  };
  const reset = () => { setFile(null); setResult(null); };

  return (
    <section className="section" id="demo">
      <h2 className="section__title">Try it with a scan.</h2>
      <p className="section__sub">This demo returns a simulated result and does not upload your image.</p>
      <div className="demo">
        {!file ? (
          <div {...getRootProps({ className: `demo__drop ${isDragActive ? "is-active" : ""}` })}>
            <input {...getInputProps()} aria-label="Upload MRI image" />
            <span className="well"><ImagePlus size={26} strokeWidth={1.5} aria-hidden="true" /></span>
            <p><strong>Drop an MRI image here</strong></p>
            <p className="muted">or click to choose a PNG or JPG</p>
          </div>
        ) : (
          <div className="demo__result">
            <div className="demo__img">
              <img src={preview} alt="Uploaded MRI scan" />
              {busy && !reduce && (
                <motion.span
                  className="slice__sweep"
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
                />
              )}
            </div>
            <div className="demo__side glass">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h3>Most likely: {result[0].label}</h3>
                    {result.map((r) => (
                      <div key={r.label} className="bar">
                        <span>{r.label}</span>
                        <div className="track">
                          <motion.i
                            initial={{ width: 0 }}
                            animate={{ width: `${r.score * 100}%` }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                        <b>{Math.round(r.score * 100)}%</b>
                      </div>
                    ))}
                    <p className="muted">Simulated result. Not a medical diagnosis.</p>
                  </motion.div>
                ) : (
                  <motion.p key="p" className="muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {busy ? "Analyzing scan…" : file.name}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="demo__actions">
                {!result && <NeuButton onClick={run} disabled={busy}>{busy ? "Analyzing…" : "Analyze scan"}</NeuButton>}
                <NeuButton variant="soft" onClick={reset}><RotateCcw size={16} aria-hidden="true" />Choose another</NeuButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScanDemo;