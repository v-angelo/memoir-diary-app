import { Link } from "react-router-dom";
import { motion } from "motion/react";

function PnF() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-8xl font-bold text-(--accent)"
      >
        404
      </motion.h1>

      <h2 className="mt-4 text-3xl font-bold">Page Not Found</h2>

      <p className="mt-3 max-w-md text-(--text-secondary)">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-2xl bg-(--accent) px-6 py-3 text-white"
      >
        Back Home
      </Link>
    </div>
  );
}

export default PnF;
