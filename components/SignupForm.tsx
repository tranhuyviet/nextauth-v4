import React, { useState } from "react";
import { useFormik } from "formik";
import { IUserSignupBody } from "../utils/types";
import axios from "axios";
import { useRouter } from "next/router";
import { signupCredentialsValidate } from "../utils/validate";
import SubmitButton from "./SubmitButton";
import { signIn } from "next-auth/react";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValues: IUserSignupBody = {
    provider: "credentials",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: IUserSignupBody): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/signup", values);
      console.log("SIGNUP RESPON DATA:", data);
      if (data.status === "success") {
        await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        }).then((error: any) => {
          if (error) {
            const errors = JSON.parse(error?.error);
            setErrors(errors);
          }

          if (!error.error) router.push("/");
        });
      }
      setLoading(false);
    } catch (error: any) {
      setErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors, setErrors } =
    useFormik<IUserSignupBody>({
      initialValues,
      onSubmit,
      validationSchema: signupCredentialsValidate,
    });

  return (
    <form onSubmit={handleSubmit}>
      {/* name */}
      <div className="text-left">
        <label htmlFor="name">Name:</label>
        <input
          autoComplete="off"
          type="text"
          className="input"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors && errors.name && (
          <p className="text-red-500 mt-2">{errors.name}</p>
        )}
      </div>

      {/* email */}
      <div className="text-left mt-4">
        <label htmlFor="email">Email:</label>
        <input
          autoComplete="off"
          type="text"
          className="input"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors && errors.email && (
          <p className="text-red-500 mt-2">{errors.email}</p>
        )}
      </div>

      {/* password */}
      <div className="text-left mt-4">
        <label htmlFor="password">Password:</label>
        <input
          autoComplete="off"
          type="password"
          className="input"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors && errors.password && (
          <p className="text-red-500 mt-2">{errors.password}</p>
        )}
      </div>

      {/* confirm password */}
      <div className="text-left mt-4">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          autoComplete="off"
          type="password"
          className="input"
          name="confirmPassword"
          id="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
        />
        {errors && errors.confirmPassword && (
          <p className="text-red-500 mt-2">{errors.confirmPassword}</p>
        )}
      </div>

      {/* button signup */}
      <div className="text-left mt-4">
        <SubmitButton loading={loading} text="signup" />
      </div>
    </form>
  );
};

export default SignupForm;
