import { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import { toast } from "react-toastify";

import {
  HiUsers,
  HiOutlineBookOpen,
  HiShieldCheck,
  HiCalendarDays,
} from "react-icons/hi2";

import DashboardNavbar from "../components/layout/DashboardNavbar";

import { ThemeContext, themeStyles } from "../context/ThemeContext";

import AdminStatCard from "./AdminStatCard";
import UserTable from "./UserTable";

import {
  getUsersAPI,
  getStatsAPI,
  deleteUserAPI,
} from "../services/adminService";

function AdminDashboard() {
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEntries: 0,
    totalAdmins: 0,
    entriesToday: 0,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [usersResponse, statsResponse] = await Promise.all([
        getUsersAPI(),
        getStatsAPI(),
      ]);

      console.log("usersResponse", usersResponse);
      console.log("statsResponse", statsResponse);

      setUsers(usersResponse.data);

      setStats(statsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (user) => {
    const confirmed = window.confirm(
      `Delete ${user.username}? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await deleteUserAPI(user._id);

      await loadDashboard();

      toast.success("User deleted successfully");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <>
      <DashboardNavbar />

      <motion.main
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
        <div className="mx-auto max-w-7xl px-6 py-8">
          {/* header */}
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>

            <p className="mt-2 text-(--text-secondary)">
              Manage users, entries and platform activity.
            </p>
          </motion.div>

          {/* stats */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<HiUsers size={32} />}
              delay={0.1}
            />

            <AdminStatCard
              title="Total Entries"
              value={stats.totalEntries}
              icon={<HiOutlineBookOpen size={32} />}
              delay={0.15}
            />

            <AdminStatCard
              title="Admins"
              value={stats.totalAdmins}
              icon={<HiShieldCheck size={32} />}
              delay={0.2}
            />

            <AdminStatCard
              title="Entries Today"
              value={stats.entriesToday}
              icon={<HiCalendarDays size={32} />}
              delay={0.25}
            />
          </div>

          {/* users */}
          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold">Users</h2>

            <UserTable users={users} onDelete={handleDeleteUser} />
          </div>
        </div>
      </motion.main>
    </>
  );
}

export default AdminDashboard;
