import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { signIn } from "../../services/auth";
import Button from "../ui/Button";
import "./login.css";

function Login({ onClose, onRegisterClick }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      toast.success("Already Logged In");
      onClose();
      return;
    }
    setIsLoading(true);
    try {
      const response = await signIn(formData);
      if (response.error) {
        toast.error(
          response.error === "Failed to fetch"
            ? "Some error occured please try again later"
            : response.error
        );
        return;
      }
      setUser(response.userData);
      onClose();
      toast.success("Login successfull");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth" onClick={onClose}>
      <motion.div
        className="auth__card glass glass--strong"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        <button type="button" className="auth__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <h2 id="login-title" className="auth__title">Welcome back</h2>
        <p className="auth__sub">Log in to analyze your scans.</p>

        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" autoFocus
              placeholder="you@example.com" onChange={handleChange} value={formData.email} required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password"
              placeholder="Enter your password" onChange={handleChange} value={formData.password} required />
          </div>
          <Button type="submit" className="auth__submit" disabled={isLoading}>
            {isLoading ? "Logging in…" : "Log in"}
          </Button>
        </form>

        <p className="auth__switch">
          Not a user yet?{" "}
          <Button variant="link" onClick={onRegisterClick}>Register</Button>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;