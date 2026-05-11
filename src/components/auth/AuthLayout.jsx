import { motion } from "motion/react";
import { useContext } from "react";

import { ThemeContext, themeStyles } from "../../context/ThemeContext";

const AuthLayout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  return (
    <motion.section
      animate={{
        backgroundColor: colors.bgPrimary,
        color: colors.textPrimary,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-h-screen overflow-hidden px-6 py-10"
    >
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* LEFT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="hidden lg:block"
        >
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-(--accent) uppercase">
            Your Personal Space
          </p>

          <h1 className="text-5xl leading-tight font-bold tracking-tight md:text-7xl">
            Capture your
            <span className="text-(--accent)"> thoughts</span>, memories, and
            moments.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-(--text-secondary)">
            Memoir is your private digital journal for documenting daily
            experiences, emotions, and ideas in a calm and beautiful space.
          </p>
        </motion.div>

        {/* FORM */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AuthLayout;
