import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ICreatePostBody } from "../utils/types";
import { postValidate } from "../utils/validate";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const AddPostForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValues: ICreatePostBody = {
    title: "",
    content: "",
  };

  const onSubmit = async (values: ICreatePostBody): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await axios.post("/posts", values);
      console.log("POST RESPON DATA:", data);
      if (data.status === "success") {
      }
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
        label="Title"
        id="title"
        value={values.title}
        handleChange={handleChange}
        error={errors.title}
      />

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
