import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Menu, X } from "lucide-react";
import "./Header.css";

const CONTACT_EMAIL = "gaganraj.dev05@gmail.com";

const LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Tumor types", href: "#tumor-types" },
  { label: "Demo", href: "#demo" },
  { label: "Privacy", href: "#privacy" },
  { label: "FAQ", href: "#faq" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash, key } = useLocation();

  // After navigating to "/#section", scroll to that section.
  // React Router doesn't do this itself, and the section may not be mounted yet, so retry briefly.
  useEffect(() => {
    if (!hash) return;
    let timer;
    let tries = 0;
    const go = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView();
      else if (tries++ < 20) timer = setTimeout(go, 50);
    };
    go();
    return () => clearTimeout(timer);
  }, [pathname, hash, key]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header">
      <div className="header__inner">
        <div className={`header__bar glass ${scrolled ? "is-scrolled" : ""}`}>
          <Link to="/" className="header__brand" aria-label="IntelliScan home">
            <Brain size={22} strokeWidth={1.75} aria-hidden="true" />
            IntelliScan
          </Link>

          <nav className="header__links" aria-label="Primary">
            {LINKS.map((l) => (
              <Link key={l.href} to={`/${l.href}`}>{l.label}</Link>
            ))}
          </nav>

          <div className="header__actions">
            <a className="header__contact" href={`mailto:${CONTACT_EMAIL}`}>Contact us</a>
            <button
              className="header__toggle"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              className="header__panel glass glass--strong"
              aria-label="Mobile"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
              {LINKS.map((l) => (
                <Link key={l.href} to={`/${l.href}`} onClick={() => setOpen(false)}>{l.label}</Link>
              ))}
              <a className="header__contact header__contact--panel" href={`mailto:${CONTACT_EMAIL}`} onClick={() => setOpen(false)}>
                Contact us
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;