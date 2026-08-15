import { motion } from "motion/react";
import {
  HiOutlineCalendarDays,
  HiOutlineFaceSmile,
  HiOutlineFire,
  HiOutlineMagnifyingGlass,
  HiOutlineSwatch,
  HiOutlineLockClosed,
} from "react-icons/hi2";

const features = [
  {
    icon: HiOutlineCalendarDays,
    title: "Calendar View",
    description:
      "Browse memories by date and revisit important moments anytime.",
  },
  {
    icon: HiOutlineFaceSmile,
    title: "Mood Tracking",
    description:
      "Capture how you feel and discover emotional patterns over time.",
  },
  {
    icon: HiOutlineFire,
    title: "Writing Streaks",
    description:
      "Build consistency and stay motivated with daily journaling streaks.",
  },
  {
    icon: HiOutlineMagnifyingGlass,
    title: "Quick Search",
    description: "Instantly find entries by title and rediscover old memories.",
  },
  {
    icon: HiOutlineSwatch,
    title: "Custom Themes",
    description:
      "Personalize your writing space with multiple beautiful themes.",
  },
  {
    icon: HiOutlineLockClosed,
    title: "Private Space",
    description:
      "Your journal belongs to you—a secure place for personal thoughts.",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <p className="font-semibold tracking-[0.2em] text-(--accent) uppercase">
          Features
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          Everything you need to preserve memories
        </h2>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-3xl bg-(--bg-secondary) p-6"
            >
              <Icon className="text-4xl text-(--accent)" />

              <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>

              <p className="mt-3 text-(--text-secondary)">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default FeaturesSection;
