import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "motion/react";

import { useContext } from "react";
import { ThemeContext, themeStyles } from "./context/ThemeContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Journal from "./pages/Journal";
import Profile from "./pages/Profile";
import PnF from "./pages/PnF";
import ScrollToTop from "./components/layout/ScrollToTop";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from "./admin/AdminRoute";
import UserRoute from "./components/auth/UserRoute";

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
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <UserRoute>
                <Dashboard />
              </UserRoute>
            }
          />

          <Route
            path="/journal"
            element={
              <UserRoute>
                <Journal />
              </UserRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<PnF />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </BrowserRouter>
    </motion.div>
  );
}

export default App;
