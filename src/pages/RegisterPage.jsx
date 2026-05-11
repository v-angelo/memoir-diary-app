import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useContext } from "react";

import { useFormik } from "formik";

import Navbar from "../components/layout/Navbar";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

import { ThemeContext, themeStyles } from "../context/ThemeContext";

import { registerSchema } from "../validation/registerSchema";

function RegisterPage() {
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: registerSchema,

    onSubmit: (values) => {
      console.log(values);

      // register API call here
    },
  });

  return (
    <motion.div
      animate={{
        backgroundColor: colors.bgPrimary,
        color: colors.textPrimary,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-h-screen"
    >
      {/* NAVBAR */}

      <Navbar />

      {/* MAIN SECTION */}

      <main className="px-6 py-12">
        <div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-16 lg:grid-cols-2">
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
              Start Your Journey
            </p>

            <h1 className="text-5xl leading-tight font-bold tracking-tight md:text-7xl">
              Create your
              <span className="text-(--accent)"> private</span> digital diary.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-(--text-secondary)">
              Memoir gives you a calm and beautiful space to document your
              thoughts, daily experiences, memories, and emotions securely.
            </p>
          </motion.div>

          {/* REGISTER CARD */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <AuthCard
              title="Create Account"
              subtitle="Start journaling and preserving your memories today."
            >
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                <AuthInput
                  label="Full Name"
                  type="text"
                  name="name"
                  placeholder="V Angelo"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.name}
                  touched={formik.touched.name}
                />

                <AuthInput
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="angelo@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.email}
                  touched={formik.touched.email}
                />

                <AuthInput
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.password}
                  touched={formik.touched.password}
                />

                <AuthInput
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.confirmPassword}
                  touched={formik.touched.confirmPassword}
                />

                <AuthButton>Create Account</AuthButton>
              </form>

              <p className="mt-6 text-center text-(--text-secondary)">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-(--accent)">
                  Login
                </Link>
              </p>
            </AuthCard>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}

export default RegisterPage;
