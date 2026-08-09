import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useFormik } from "formik";

import { ThemeContext, themeStyles } from "../../context/ThemeContext";
import { getInitials } from "../../utilities/journalUtils";
import { profileSchema } from "../../validation/profileSchema";

function ProfileModal({ isOpen, user, onClose, onSave }) {
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  const fileInputRef = useRef(null);

  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    setPreviewImage(user?.profilePic || "");
  }, [user]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      profilePic: user?.profilePic || "",
      imageFile: null,
    },

    validationSchema: profileSchema,

    onSubmit: (values) => {
      onSave(values);
    },
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                backgroundColor: colors.bgSecondary,
                color: colors.textPrimary,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full max-w-xl rounded-3xl p-6 shadow-2xl"
            >
              {/* header */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Edit Profile</h2>

                <button
                  onClick={onClose}
                  className="cursor-pointer text-2xl text-(--text-secondary)"
                >
                  ×
                </button>
              </div>

              {/* avatar preview */}
              <div className="mb-6 flex justify-center">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative cursor-pointer"
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className="h-28 w-28 rounded-full object-cover transition-opacity group-hover:opacity-80"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-(--accent) text-3xl font-bold text-white transition-opacity group-hover:opacity-80">
                      {getInitials(formik.values.username)}
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-sm font-medium text-white">
                      Change
                    </span>
                  </div>
                </div>
              </div>

              {/* hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  const imageUrl = URL.createObjectURL(file);

                  setPreviewImage(imageUrl);

                  formik.setFieldValue("imageFile", file);
                }}
              />

              <form onSubmit={formik.handleSubmit}>
                {/* image url */}
                <input
                  type="text"
                  name="profilePic"
                  value={formik.values.profilePic}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setPreviewImage(e.target.value);
                  }}
                  placeholder="Profile image URL"
                  className="mb-4 w-full rounded-xl border border-white/10 bg-(--bg-primary) px-4 py-3 outline-none"
                />

                {/* username */}
                <input
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Username"
                  className="mb-2 w-full rounded-xl border border-white/10 bg-(--bg-primary) px-4 py-3 outline-none"
                />

                {formik.touched.username && formik.errors.username && (
                  <p className="mb-4 ml-2 text-sm text-red-500">
                    {formik.errors.username}
                  </p>
                )}

                {/* email */}
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Email"
                  className="mb-2 w-full rounded-xl border border-white/10 bg-(--bg-primary) px-4 py-3 outline-none"
                />

                {formik.touched.email && formik.errors.email && (
                  <p className="mb-4 ml-2 text-sm text-red-500">
                    {formik.errors.email}
                  </p>
                )}

                {/* password */}
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="New password (optional)"
                  className="mb-2 w-full rounded-xl border border-white/10 bg-(--bg-primary) px-4 py-3 outline-none"
                />

                {formik.touched.password && formik.errors.password && (
                  <p className="mb-4 ml-2 text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}

                {/* footer */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer rounded-xl border border-(--accent) px-5 py-3 text-(--accent)"
                  >
                    Cancel
                  </button>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="cursor-pointer rounded-xl bg-(--accent) px-6 py-3 font-medium text-white"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProfileModal;
