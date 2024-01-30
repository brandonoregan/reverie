import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;

export const registerSchema = yup.object().shape({
  first_name: yup.string().required("Required. "),
  last_name: yup.string().required("Required. "),
  username: yup
    .string()
    .required("Required. ")
    .min(7, { message: "Username must be atleast 7 characters." })
    .max(20, { message: "Username is too long, maximum 20 characters." }),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Required. "),
  password: yup.string().matches(passwordRules).required("Required. "),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match.")
    .required("Required"),
});

export const updateUserSchema = yup.object().shape({
  first_name: yup.string().required("Required. "),
  last_name: yup.string().required("Required. "),
  username: yup
    .string()
    .required("Required. ")
    .min(7, { message: "Username must be atleast 7 characters." })
    .max(20, { message: "Username is too long, maximum 20 characters." }),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Required. "),
});

export const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required."),
  // or if you use email to login:
  // email: yup.string().email("Please enter a valid email.").required("Email is required"),
  password: yup.string().required("Password is required."),
});
