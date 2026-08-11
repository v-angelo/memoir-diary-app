import { useContext, useState } from "react";
import { motion } from "motion/react";
import { toast } from "react-toastify";

import DashboardNavbar from "../components/layout/DashboardNavbar";
import ProfileModal from "../components/layout/ProfileModal";

import { AuthContext } from "../context/AuthContext";
import { ThemeContext, themeStyles } from "../context/ThemeContext";

import { getInitials } from "../utilities/journalUtils";
import { updateUserAPI } from "../services/authService";

function Profile() {
  const { theme } = useContext(ThemeContext);
  const { user, updateUser } = useContext(AuthContext);

  const colors = themeStyles[theme];

  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleUpdateProfile = async (formData) => {
    try {
      const reqBody = new FormData();

      reqBody.append("username", formData.username);
      reqBody.append("email", formData.email);

      if (formData.password?.trim()) {
        reqBody.append("password", formData.password);
      }

      // uploaded file
      if (formData.imageFile) {
        reqBody.append("profilePic", formData.imageFile);
      }

      // image URL fallback
      else if (formData.imageUrl?.trim()) {
        reqBody.append("profilePic", formData.imageUrl);
      }

      // remove profile pic
      reqBody.append("removeProfilePic", formData.removeProfilePic);

      const response = await updateUserAPI(user._id, reqBody);

      const updatedUser = response.data;

      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      updateUser(updatedUser);

      toast.success("Profile updated successfully");

      setShowProfileModal(false);
    } catch (error) {
      console.log(error);

      toast.error("Failed to update profile");
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
        className=""
      >
        <div className="mx-auto max-w-4xl px-6 py-12">
          {/* Header */}
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
            <h1 className="text-4xl font-bold">Profile</h1>

            <p className="mt-2 text-(--text-secondary)">
              Manage your account information.
            </p>
          </motion.div>

          {/* Profile Card */}
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
              delay: 0.1,
            }}
            className="mt-8 rounded-3xl bg-(--bg-secondary) p-8"
          >
            <div className="flex flex-col items-center text-center">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-(--accent) text-4xl font-bold text-white">
                  {getInitials(user?.username)}
                </div>
              )}

              <h2 className="mt-6 text-3xl font-bold">{user?.username}</h2>

              <p className="mt-2 text-(--text-secondary)">{user?.email}</p>

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => setShowProfileModal(true)}
                className="mt-8 cursor-pointer rounded-xl bg-(--accent) px-6 py-3 font-medium text-white"
              >
                Edit Profile
              </motion.button>
            </div>
          </motion.div>
        </div>

        <ProfileModal
          isOpen={showProfileModal}
          user={user}
          onClose={() => setShowProfileModal(false)}
          onSave={handleUpdateProfile}
        />
      </motion.main>
    </>
  );
}

export default Profile;
