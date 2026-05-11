import { motion } from "motion/react";
import { useContext, useState } from "react";

import { HiEye, HiEyeOff } from "react-icons/hi";

import { ThemeContext, themeStyles } from "../../context/ThemeContext";

function AuthInput({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) {
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      {/* LABEL */}

      <label className="text-sm text-(--text-secondary)">{label}</label>

      {/* INPUT + ICON CONTAINER */}

      <div className="relative">
        <motion.input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          animate={{
            backgroundColor: colors.bgPrimary,
            color: colors.textPrimary,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full rounded-2xl border border-white/10 px-4 py-3 pr-12 outline-none placeholder:text-(--text-secondary) focus:border-(--accent)"
        />

        {/* PASSWORD TOGGLE */}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-(--text-secondary)"
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        )}
      </div>

      {/* ERROR MESSAGE */}

      {touched && error && <p className="ms-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}

export default AuthInput;
