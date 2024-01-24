import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;

export const registerSchema = yup.object().shape({
  first_name: yup.string().required("Required"),
  last_name: yup.string().required("Required"),
  username: yup
    .string()
    .min(7, { message: "Username must be atleast 7 characters" })
    .max(20),
  email: yup.string().email("Please enter a valid email.").required("Required"),
  password: yup
    .string()
    .min(7)
    .matches(passwordRules, {
      message:
        "Password must be at least 7 characters long and include a number, an uppercase, and a lowercase letter.",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match.")
    .required("Required"),
});

export const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  // or if you use email to login:
  // email: yup.string().email("Please enter a valid email.").required("Email is required"),
  password: yup.string().required("Password is required"),
});
