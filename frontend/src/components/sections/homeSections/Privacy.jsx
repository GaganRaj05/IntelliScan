import { EyeOff, HardDrive, ShieldCheck } from "lucide-react";

const POINTS = [
  { icon: HardDrive, title: "Stays on your device", text: "In this demo your image is read in the browser and never uploaded." },
  { icon: EyeOff, title: "Saved only when you choose", text: "Nothing is kept unless you decide to save a result." },
  { icon: ShieldCheck, title: "Clear limits", text: "IntelliScan supports a decision. It never makes one for you." },
];

const Privacy = () => (
  <section className="section" id="privacy">
    <div className="privacy">
      <h2 className="section__title">Your scans are your business.</h2>
      <p className="section__sub">Medical images are sensitive, so IntelliScan treats them that way.</p>
      <div className="privacy__grid">
        {POINTS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="privacy__item">
            <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Privacy;