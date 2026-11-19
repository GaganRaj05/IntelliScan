import { motion } from "framer-motion";

// variant: "primary" | "soft" | "light"   size: "md" | "lg"
const NeuButton = ({ variant = "primary", size = "md", className = "", children, ...props }) => (
  <motion.button
    type="button"
    className={`nbtn nbtn--${variant} nbtn--${size} ${className}`}
    whileHover={{ y: -1 }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: "spring", stiffness: 500, damping: 32 }}
    {...props}
  >
    {children}
  </motion.button>
);

export default NeuButton;