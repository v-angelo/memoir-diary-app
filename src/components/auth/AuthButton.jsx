import { motion } from "motion/react";

const AuthButton = ({ children }) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="w-full rounded-2xl bg-(--accent) px-4 py-3 font-semibold text-white"
    >
      {children}
    </motion.button>
  );
};

export default AuthButton;
