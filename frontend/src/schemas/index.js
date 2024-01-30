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

export const updateProductSchema = yup.object().shape({
  name: yup.string().required("Product name is required."),
  // image: yup.mixed().test("fileType", "Invalid file type", (value) => {
  //   if (!value) return true; // No file selected is allowed
  //   return value && ["image/jpeg", "image/png"].includes(value.type);
  // }),
  category: yup.string().required("Product category is required."),
  description: yup.string().required("Product description is required."),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is required."),
  stock_count: yup
    .number()
    .typeError("Stock count must be a number")
    .integer("Stock count must be an integer")
    .min(0, "Stock count must be a positive number")
    .required("Stock count is required."),
});
