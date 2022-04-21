import axios from "axios";
import { useFormik } from "formik";
import useSWR from "swr";
import React, { useState } from "react";
import { ICreatePostBody } from "../utils/types";
import { postValidate } from "../utils/validate";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { Avatar, TextareaAutosize } from "@mui/material";
import { useSession } from "next-auth/react";

const AddPostForm = () => {
  const { data: session } = useSession();
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
      className="w-[600px] p-4 border border-gray-100 border-b-0"
    >
      <div className="w-full flex space-x-4">
        <Avatar
          src={session?.user.image}
          sx={{ width: 48, height: 48 }}
          alt={session?.user.name}
        />

        {/* TODO: separate the form */}
        <div className="flex flex-col w-full">
          <TextareaAutosize
            id="content"
            name="content"
            minRows={2}
            placeholder="What's happening?"
            className="!w-full !border border-gray-100 !rounded-md !outline-none !focus:border-gray-200 !forcus:ring-gray-900 !focus:ring-2 !focus:outline-none"
            value={values.content}
            onChange={handleChange}
          />
          <div className="flex justify-end border-t border-gray-100 mt-4 pt-4">
            <SubmitButton
              disabled={!values.content}
              loading={loading}
              text="Post"
              className="rounded-full w-[87px] h-[36px] text-[15px]"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddPostForm;
