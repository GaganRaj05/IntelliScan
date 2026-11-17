import { FileImage, Gauge, Layers, Lock } from "lucide-react";

const ITEMS = [
  { icon: FileImage, text: "PNG and JPG brain MRI slices" },
  { icon: Layers, text: "Four classes in one model" },
  { icon: Gauge, text: "Confidence score on every result" },
  { icon: Lock, text: "Demo images stay in your browser" },
];

const TrustStrip = () => (
  <section className="trust" aria-label="Key facts">
    <ul className="trust__list">
      {ITEMS.map(({ icon: Icon, text }) => (
        <li key={text}><Icon size={18} strokeWidth={1.75} aria-hidden="true" />{text}</li>
      ))}
    </ul>
  </section>
);

export default TrustStrip;