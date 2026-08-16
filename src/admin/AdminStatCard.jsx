import { motion } from "motion/react";

function AdminStatCard({ title, value, icon, delay = 0 }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
      }}
      className="rounded-3xl bg-(--bg-secondary) p-6"
    >
      <div className="mb-3 text-(--accent)">{icon}</div>

      <p className="text-sm text-(--text-secondary)">{title}</p>

      <h3 className="mt-2 text-3xl font-bold">{value}</h3>
    </motion.div>
  );
}

export default AdminStatCard;
