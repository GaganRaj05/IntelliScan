import { FileText, ScanSearch, Upload } from "lucide-react";

const STEPS = [
  { icon: Upload, title: "Upload a scan", text: "Drop in a brain MRI slice as a PNG or JPG. Nothing is stored until you choose to save it." },
  { icon: ScanSearch, title: "Pixel analyzes it", text: "A trained neural network scans every region and looks for patterns that match known tumor types." },
  { icon: FileText, title: "Review the result", text: "See the predicted type with a confidence score, then share it with your care team." },
];

const HowItWorks = () => (
  <section className="section" id="how-it-works">
    <h2 className="section__title">Three steps from scan to answer.</h2>
    <p className="section__sub">No setup, no waiting on a queue.</p>
    <ol className="steps">
      {STEPS.map(({ icon: Icon, title, text }, i) => (
        <li key={title} className="card steps__item">
          <span className="steps__num">{i + 1}</span>
          <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
          <h3>{title}</h3>
          <p>{text}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default HowItWorks;
