import * as Yup from "yup";
import { IProviders } from "./types";

// USERS
const name = Yup.string()
  .min(3, "Name must be at least 3 characters!")
  .max(50, "Name cannot be longer than 50 characters!")
  .required("Name cannot be empty!");
const email = Yup.string()
  .required("Email cannot be empty!")
  .email("Invalid email format!");
const password = Yup.string()
  .min(6, "Password must be at least 6 characters!")
  .required("Password cannot be empty!");
const confirmPassword = Yup.string()
  .required("Confirm Password cannot be empty!")
  .oneOf([Yup.ref("password")], "Password not match!");
const provider = Yup.mixed<IProviders>().oneOf(Object.values(IProviders));

// POSTS
// const title = Yup.string()
//   .min(3, "Title must be at least 3 characters!")
//   .max(50, "Title cannot be longer than 50 characters!")
//   .required("Title cannot be empty!");
const content = Yup.string().required("Content cannot be empty!");

export const signupCredentialsValidate = Yup.object().shape({
  name,
  email,
  password,
  confirmPassword,
});

export const signupProvidersValidate = Yup.object().shape({
  name,
  email,
  provider,
});

export const loginCredentialsValidate = Yup.object().shape({
  email,
  password,
});

export const postValidate = Yup.object().shape({
  content,
});
