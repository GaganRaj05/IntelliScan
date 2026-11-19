import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import "./Footer.css";

const COLS = [
  { title: "Product", links: [["How it works", "#how-it-works"], ["Features", "#features"], ["Tumor types", "#tumor-types"], ["Try the demo", "#demo"]] },
  { title: "Trust", links: [["Privacy", "#privacy"], ["Limitations", "#limits"], ["Who it’s for", "#who-its-for"], ["FAQ", "#faq"]] },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner footer__grid">
      <div className="footer__about">
        <p className="footer__brand"><Brain size={18} aria-hidden="true" /> Pixel</p>
        <p className="footer__note">Brain MRI analysis that helps specialists focus on the cases that need them most.</p>
      </div>
      {COLS.map((c) => (
        <nav key={c.title} aria-label={c.title} className="footer__col">
          <h4>{c.title}</h4>
          {c.links.map(([label, href]) => <Link key={label} to={`/${href}`}>{label}</Link>)}
        </nav>
      ))}
    </div>
    <div className="footer__inner footer__legal">
      <p className="footer__note">
        Pixel is an educational and decision-support tool. It does not provide medical
        advice, diagnosis, or treatment. Always consult a qualified healthcare professional
        about any medical concern.
      </p>
      <p className="footer__note">© {new Date().getFullYear()} Pixel</p>
    </div>
  </footer>
);

export default Footer;