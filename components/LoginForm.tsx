import React from "react";
import { useFormik } from "formik";
import { IUserLoginBody } from "../utils/types";

const LoginForm = () => {
  const initialValues: IUserLoginBody = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: IUserLoginBody): Promise<void> => {
    console.log("submit", values);
  };

  const { values, handleChange, handleSubmit, errors, setErrors } =
    useFormik<IUserLoginBody>({
      initialValues,
      onSubmit,
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
        <button className="button" type="submit">
          login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
