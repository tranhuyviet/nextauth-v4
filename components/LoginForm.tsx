import React, { useState } from "react";
import { useFormik } from "formik";
import { IUserLoginBody } from "../utils/types";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/router";
import axios from "axios";
import { signIn } from "next-auth/react";
import { loginCredentialsValidate } from "../utils/validate";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValues: IUserLoginBody = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: IUserLoginBody): Promise<void> => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error: any) {
      setErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors, setErrors } =
    useFormik<IUserLoginBody>({
      initialValues,
      onSubmit,
      validationSchema: loginCredentialsValidate,
    });

  return (
    <form onSubmit={handleSubmit}>
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

      {/* button login */}
      <div className="text-left mt-4">
        <SubmitButton loading={loading} text="login" />
      </div>
    </form>
  );
};

export default LoginForm;
