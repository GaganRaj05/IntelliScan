import { motion } from "framer-motion";
import "./Button.css";

/**
 * variant: "primary" | "glass" | "link"
 * size:    "sm" | "md" | "lg"
 */
const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...rest
}) => {
  const isLink = variant === "link";
  return (
    <motion.button
      type={type}
      className={`btn btn--${variant} ${isLink ? "" : `btn--${size}`} ${className}`.trim()}
      onClick={onClick}
      whileHover={isLink ? undefined : { scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;
