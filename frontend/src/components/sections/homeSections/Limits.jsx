import { Check, X } from "lucide-react";

const DOES = ["Flags patterns that match known tumor types", "Shows a confidence score for each class", "Helps specialists prioritize scans"];
const DOESNT = ["Diagnose a condition", "Replace a radiologist or physician", "Recommend treatment"];

const List = ({ items, icon: Icon, tone }) => (
  <ul className={`limits__list limits__list--${tone}`}>
    {items.map((t) => <li key={t}><Icon size={18} aria-hidden="true" />{t}</li>)}
  </ul>
);

const Limits = () => (
  <section className="section section--narrow" id="limits">
    <h2 className="section__title">What IntelliScan does, and what it doesn’t.</h2>
    <div className="limits">
      <div className="neu-card"><h3>IntelliScan does</h3><List items={DOES} icon={Check} tone="yes" /></div>
      <div className="limits__no"><h3>IntelliScan does not</h3><List items={DOESNT} icon={X} tone="no" /></div>
    </div>
  </section>
);

export default Limits;