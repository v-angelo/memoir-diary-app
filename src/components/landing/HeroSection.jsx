import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { ThemeContext, themeStyles } from "../../context/ThemeContext";
import { useContext } from "react";

function HeroSection() {
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-6 py-24 md:py-32">
      <div className="grid items-center gap-16 md:grid-cols-2">
        {/* LEFT CONTENT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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

          {/* BUTTONS */}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/register">
              <motion.button
                initial={{ scale: 0.98 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="cursor-pointer rounded-2xl bg-(--accent) px-7 py-3 text-lg font-medium text-white shadow-lg shadow-black/10"
              >
                Start Writing
              </motion.button>
            </Link>

            <a href="#features">
              <motion.button
                initial={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="cursor-pointer rounded-2xl border border-white/10 bg-(--bg-secondary) px-7 py-3 text-lg font-medium shadow-lg shadow-black/5 hover:border-(--accent)"
              >
                Explore Features
              </motion.button>
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* MAIN CARD */}

          <motion.div
            animate={{
              backgroundColor: colors.bgSecondary,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-3xl border border-white/10 p-8 shadow-2xl"
          >
            {/* TOP BAR */}

            <div className="mb-8 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
            </div>

            {/* MOCK JOURNAL */}

            <p className="mb-3 text-sm text-(--text-secondary)">May 10, 2026</p>

            <h3 className="mb-4 text-2xl font-semibold">A peaceful evening.</h3>

            <p className="leading-relaxed text-(--text-secondary)">
              Today felt calmer than usual. I spent some time reflecting on
              goals, listening to rain, and writing down thoughts that usually
              stay hidden in my mind...
            </p>

            {/* TAGS */}

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-(--accent)/20 px-4 py-1 text-sm text-(--accent)">
                Reflection
              </span>

              <span className="rounded-full bg-(--accent)/20 px-4 py-1 text-sm text-(--accent)">
                Personal
              </span>
            </div>
          </motion.div>

          {/* BACKGROUND GLOW */}

          <div className="absolute top-10 right-10 -z-10 h-72 w-72 rounded-full bg-(--accent)/20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
