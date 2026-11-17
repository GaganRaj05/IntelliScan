import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { sign_Up } from "../../services/auth";
import Button from "../ui/Button";
import "./login.css";

const FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "Your full name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
  { name: "password", label: "Password", type: "password", placeholder: "At least 6 characters", autoComplete: "new-password", row: true },
  { name: "confirmPassword", label: "Confirm password", type: "password", placeholder: "Repeat password", autoComplete: "new-password", row: true },
  { name: "phone", label: "Phone", type: "tel", placeholder: "Phone number", autoComplete: "tel" },
  { name: "address", label: "Address", type: "text", placeholder: "Your address", autoComplete: "street-address" },
];

function SignUp({ onClose, onLoginClick }) {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "", phone: "", address: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    const response = await sign_Up(formData);
    setIsLoading(false);
    if (response.error) {
      onClose();
      toast.error(
        response.error === "Failed to fetch"
          ? "Some error occured please try again later"
          : response.error
      );
      return;
    }
    toast.success("Account created successfully please login");
    onClose();
  };

  const renderField = (f) => (
    <div className="field" key={f.name}>
      <label htmlFor={f.name}>{f.label}</label>
      <input
        id={f.name} name={f.name} type={f.type} placeholder={f.placeholder}
        autoComplete={f.autoComplete} value={formData[f.name]} onChange={handleChange}
        minLength={f.type === "password" ? 6 : undefined} required
      />
    </div>
  );

  return (
    <div className="auth" onClick={onClose}>
      <motion.div
        className="auth__card auth__card--wide glass glass--strong"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        <button type="button" className="auth__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <h2 id="signup-title" className="auth__title">Create your account</h2>
        <p className="auth__sub">It takes less than a minute.</p>

        <form className="auth__form" onSubmit={handleSubmit}>
          {FIELDS.filter((f) => !f.row && ["name", "email"].includes(f.name)).map(renderField)}
          <div className="auth__row">{FIELDS.filter((f) => f.row).map(renderField)}</div>
          {FIELDS.filter((f) => ["phone", "address"].includes(f.name)).map(renderField)}
          <Button type="submit" className="auth__submit" disabled={isLoading}>
            {isLoading ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="auth__switch">
          Already a user?{" "}
          <Button variant="link" onClick={onLoginClick}>Log in</Button>
        </p>
      </motion.div>
    </div>
  );
}

export default SignUp;