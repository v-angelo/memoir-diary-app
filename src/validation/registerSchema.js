import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name is too short")
    .required("Full name is required"),

  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});
