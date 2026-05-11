import { motion } from "motion/react";
import { useContext } from "react";

import { ThemeContext, themeStyles } from "../../context/ThemeContext";

const AuthCard = ({ title, subtitle, children }) => {
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  return (
    <motion.div
      animate={{
        backgroundColor: colors.bgSecondary,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-4xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl md:p-10"
    >
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>

      <p className="mt-2 text-(--text-secondary)">{subtitle}</p>

      <div className="mt-8">{children}</div>
    </motion.div>
  );
};

export default AuthCard;
