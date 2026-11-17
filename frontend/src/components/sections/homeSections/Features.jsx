import { BarChart3, Clock, Download, Share2, SlidersHorizontal, Zap } from "lucide-react";

const FEATURES = [
  { icon: Zap, title: "Results in seconds", text: "Upload a slice and get a classification without waiting in a queue." },
  { icon: BarChart3, title: "Scores for every class", text: "See the probability for each tumor type, not just the top guess." },
  { icon: SlidersHorizontal, title: "Built for review", text: "Confidence scores show how much weight a result deserves before a specialist reads it." },
  { icon: Clock, title: "Fits your workflow", text: "No installs and no account needed to try it. Open the page and start." },
  { icon: Share2, title: "Easy to share", text: "Send a result to your care team so everyone looks at the same finding." },
  { icon: Download, title: "Keep a record", text: "Save the result alongside the scan when you decide to keep it." },
];

const Features = () => (
  <section className="section" id="features">
    <h2 className="section__title">Made for the way scans get read.</h2>
    <p className="section__sub">Fast, clear, and honest about what it knows.</p>
    <div className="features">
      {FEATURES.map(({ icon: Icon, title, text }) => (
        <div key={title} className="feature">
          <span className="feature__icon"><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Features;