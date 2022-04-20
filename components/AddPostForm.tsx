import axios from "axios";
import { useFormik } from "formik";
import useSWR, { useSWRConfig } from "swr";
import React, { useState } from "react";
import { ICreatePostBody } from "../utils/types";
import { postValidate } from "../utils/validate";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import ReactLoading from "react-loading";

const AddPostForm = () => {
  const url = "/posts";
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(url);
  const [loading, setLoading] = useState(false);

  const initialValues: ICreatePostBody = {
    content: "",
  };

  const onSubmit = async (values: ICreatePostBody): Promise<void> => {
    try {
      setLoading(true);
      const { data: resData } = await axios.post(url, values);
      if (resData.status === "success") {
        mutate(url, [...data.data.posts, resData.data.post], {
          optimisticData: values,
          rollbackOnError: true,
        });
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

  if (error) return <p>Error...</p>;
  if (!data)
    return (
      <div className="mx-auto mt-6">
        <ReactLoading height={55} width={45} color="#3972ED" type="bars" />
      </div>
    );

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
