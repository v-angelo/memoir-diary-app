import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const testimonials = [
  {
    name: "Sarah",
    text: "Memoir helped me build a daily reflection habit.",
  },
  {
    name: "Alex",
    text: "The calendar view makes revisiting memories incredibly easy.",
  },
  {
    name: "Daniel",
    text: "Simple, beautiful, and distraction-free.",
  },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-5xl scroll-mt-16 px-6 py-24"
    >
      <div className="text-center">
        <p className="font-semibold tracking-[0.2em] text-(--accent) uppercase">
          Testimonials
        </p>

        <h2 className="mt-3 text-4xl font-bold">Loved by thoughtful writers</h2>
      </div>

      <div className="mt-16 flex items-center gap-4">
        {/* previous */}
        <button
          onClick={prevSlide}
          className="cursor-pointer rounded-full bg-(--bg-secondary) p-3"
        >
          <HiChevronLeft size={24} />
        </button>

        {/* testimonial */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -40,
              }}
              transition={{
                duration: 0.3,
              }}
              className="rounded-3xl bg-(--bg-secondary) p-8 text-center"
            >
              <p className="text-lg text-(--text-secondary) italic">
                "{testimonials[current].text}"
              </p>

              <h4 className="mt-6 text-xl font-semibold">
                {testimonials[current].name}
              </h4>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* next */}
        <button
          onClick={nextSlide}
          className="cursor-pointer rounded-full bg-(--bg-secondary) p-3"
        >
          <HiChevronRight size={24} />
        </button>
      </div>

      {/* dots */}
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 cursor-pointer rounded-full transition-all ${
              current === index
                ? "w-8 bg-(--accent)"
                : "bg-(--text-secondary)/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;
