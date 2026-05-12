import { motion } from "motion/react";

const AuthButton = ({ children, type = "button", disabled = false }) => {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="w-full rounded-2xl bg-(--accent) px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </motion.button>
  );
};

export default AuthButton;
