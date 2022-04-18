import React from "react";
import { useFormik } from "formik";
import { IUserSignupBody } from "../utils/types";

const SignupForm = () => {
  const initialValues: IUserSignupBody = {
    provider: "credentials",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: IUserSignupBody): Promise<void> => {
    console.log("submit", values);
  };

  const { values, handleChange, handleSubmit, errors, setErrors } =
    useFormik<IUserSignupBody>({
      initialValues,
      onSubmit,
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
        <button className="button" type="submit">
          signup
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
