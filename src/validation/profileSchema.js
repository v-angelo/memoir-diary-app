import * as Yup from "yup";

export const profileSchema = Yup.object({
  username: Yup.string()
    .min(2, "Name is too short")
    .required("Full name is required"),

  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .notRequired(),

  confirmPassword: Yup.string().when("password", {
    is: (password) => password?.length > 0,
    then: (schema) =>
      schema
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
