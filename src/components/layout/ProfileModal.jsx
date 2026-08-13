import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useFormik } from "formik";

import { ThemeContext, themeStyles } from "../../context/ThemeContext";
import { getInitials } from "../../utilities/journalUtils";
import { profileSchema } from "../../validation/profileSchema";

import { HiOutlineTrash } from "react-icons/hi2";
import { HiEye, HiEyeOff } from "react-icons/hi";

function ProfileModal({ isOpen, user, onClose, onSave }) {
  const { theme } = useContext(ThemeContext);

  const colors = themeStyles[theme];

  const fileInputRef = useRef(null);

  const [previewImage, setPreviewImage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setPreviewImage(user?.profilePic || "");
  }, [user, isOpen]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      confirmPassword: "",
      imageUrl: user?.profilePic?.includes("/files/")
        ? ""
        : user?.profilePic || "",
      imageFile: null,
      removeProfilePic: false,
    },

    validationSchema: profileSchema,

    onSubmit: (values) => {
      onSave(values);
    },
  });

  const handleClose = () => {
    formik.resetForm();

    setShowPassword(false);
    setShowConfirmPassword(false);

    setPreviewImage(user?.profilePic || "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
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
                  onClick={handleClose}
                  className="cursor-pointer text-2xl text-(--text-secondary)"
                >
                  ×
                </button>
              </div>

              {/* avatar preview */}
              <div className="mb-6 flex justify-center">
                <div
                  className="group relative cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
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

                  {/* delete button */}
                  {previewImage && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();

                        setPreviewImage("");

                        formik.setFieldValue("imageFile", null);
                        formik.setFieldValue("profilePic", "");
                        formik.setFieldValue("removeProfilePic", true);

                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="absolute -right-2 -bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:scale-110"
                    >
                      <HiOutlineTrash />
                    </button>
                  )}
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
                  formik.setFieldValue("removeProfilePic", false);
                }}
              />

              <form onSubmit={formik.handleSubmit}>
                {/* image url */}
                <input
                  type="text"
                  name="imageUrl"
                  value={formik.values.imageUrl}
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
                <div className="relative mb-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="New password (optional)"
                    className="w-full rounded-xl border border-white/10 bg-(--bg-primary) px-4 py-3 pr-12 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-(--text-secondary)"
                  >
                    {showPassword ? <HiEyeOff /> : <HiEye />}
                  </button>
                </div>

                {formik.touched.password && formik.errors.password && (
                  <p className="mb-4 ml-2 text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}

                {/* confirm password */}
                {formik.values.password && (
                  <div className="relative mb-2">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Confirm new password"
                      className="w-full rounded-xl border border-white/10 bg-(--bg-primary) px-4 py-3 pr-12 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-(--text-secondary)"
                    >
                      {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                    </button>
                  </div>
                )}

                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="mb-4 ml-2 text-sm text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  )}

                {/* footer */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
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
