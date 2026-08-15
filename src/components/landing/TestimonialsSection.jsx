import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineChatAlt2,
} from "react-icons/hi";

const testimonials = [
  {
    name: "John Smith",
    role: "Student",
    image: "/testimonials/user1.png",
    text: "Memoir helped me build a daily journaling habit. The calendar view makes revisiting memories effortless.",
  },
  {
    name: "Sarah Williams",
    role: "Content Creator",
    image: "/testimonials/user2.png",
    text: "Clean, distraction-free, and beautifully designed. It feels like a digital notebook I actually enjoy using.",
  },
  {
    name: "George Johnson",
    role: "Software Engineer",
    image: "/testimonials/user3.png",
    text: "The mood tracking and timeline features make reflecting on my personal growth surprisingly easy.",
  },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const activeTestimonial = testimonials[current];

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
      className="mx-auto max-w-4xl scroll-mt-12 px-6 py-24"
    >
      <div className="text-center">
        <p className="font-semibold tracking-[0.2em] text-(--accent) uppercase">
          Testimonials
        </p>

        <h2 className="mt-3 text-4xl font-bold">Loved by thoughtful writers</h2>
      </div>

      <div className="mt-16 flex items-center gap-2 md:gap-4">
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
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              whileHover={{
                scale: 0.98,
              }}
              className="rounded-3xl bg-(--bg-secondary) p-6 text-center md:p-8"
            >
              <HiOutlineChatAlt2
                className="mx-auto mb-4 text-(--accent)"
                size={32}
              />
              <img
                src={activeTestimonial.image}
                alt={activeTestimonial.name}
                className="mx-auto mb-5 h-20 w-20 rounded-full border-2 border-(--accent)/30 object-cover"
              />

              <p className="text-lg leading-relaxed text-(--text-secondary) italic">
                "{activeTestimonial.text}"
              </p>

              <h4 className="mt-6 text-lg font-semibold">
                {activeTestimonial.name}
              </h4>

              <p className="text-sm text-(--text-secondary)">
                {activeTestimonial.role}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* next */}
        <button
          onClick={nextSlide}
          className="cursor-pointer rounded-full bg-(--bg-secondary) p-3 transition hover:scale-110 hover:text-(--accent)"
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
