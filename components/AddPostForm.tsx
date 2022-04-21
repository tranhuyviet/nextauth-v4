import axios from "axios";
import { useFormik } from "formik";
import useSWR from "swr";
import React, { useState } from "react";
import { ICreatePostBody } from "../utils/types";
import { postValidate } from "../utils/validate";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const AddPostForm = () => {
  const url = "/posts";
  const { mutate } = useSWR(url);
  const [loading, setLoading] = useState(false);

  const initialValues: ICreatePostBody = {
    content: "",
  };

  const onSubmit = async (values: ICreatePostBody): Promise<void> => {
    try {
      setLoading(true);

      await axios.post(url, values);
      mutate();

      setLoading(false);
    } catch (error: any) {
      setErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors, setErrors } =
    useFormik<ICreatePostBody>({
      initialValues,
      onSubmit,
      validationSchema: postValidate,
    });

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-[600px] shadow-md p-8"
    >
      <Input
        label="Content"
        id="content"
        value={values.content}
        handleChange={handleChange}
        error={errors.content}
        className="mt-4"
      />

      <SubmitButton loading={loading} text="Post" className="mt-6" />
    </form>
  );
};

export default AddPostForm;
