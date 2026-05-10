import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "motion/react";

import { useContext } from "react";
import { ThemeContext, themeStyles } from "./context/ThemeContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  return (
    <motion.div
      animate={{
        backgroundColor: colors.bgPrimary,
        color: colors.textPrimary,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-h-screen"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </motion.div>
  );
}

export default App;
