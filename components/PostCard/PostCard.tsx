import { Avatar, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ICreatePostBody, IPostPopulate } from "../../utils/types";
import moment from "moment";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import MenuButton from "./MenuButton";
import SubmitButton from "../SubmitButton";
import { useFormik } from "formik";
import { postValidate } from "../../utils/validate";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

const PostCard: React.FC<{ post: IPostPopulate }> = ({ post }) => {
  const route = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWR("/posts");

  const initialValues: ICreatePostBody = {
    content: post.content,
  };

  const openEditForm = () => {
    setIsEdit(true);
  };

  const closeEditForm = () => {
    setIsEdit(false);
  };

  const onSubmit = async (values: ICreatePostBody): Promise<void> => {
    try {
      setLoading(true);

      await axios.put(`/posts/${post._id}`, values);
      mutate();

      setLoading(false);
      setIsEdit(false);
    } catch (error: any) {
      setErrors(error?.response?.data?.errors);
      setLoading(false);
      setIsEdit(false);
    }
  };

  const { values, handleChange, handleSubmit, errors, setErrors } =
    useFormik<ICreatePostBody>({
      initialValues,
      onSubmit,
      validationSchema: postValidate,
    });

  useEffect(() => {
    if (isEdit) {
      document.getElementById("contentUpdate")?.focus();
    }
  }, [isEdit]);

  return (
    <div className="px-4 pt-4 pb-2 border-b border-gray-100 first:border-b-0 hover:bg-gray-100/80 transition-all duration-300 ">
      <div className="flex">
        <div className="mr-3">
          <Avatar src={post.user.image} sx={{ width: 48, height: 48 }} />
        </div>
        <div className="flex-auto">
          <div className="flex items-center">
            <p className="font-bold">{post.user.name}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[22px] w-[22px] text-blue-600/80 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-500/80 mx-2">-</span>
            <p className="text-gray-500/80">
              {moment(post.createdAt).fromNow()}
            </p>
            <MenuButton post={post} openEditForm={openEditForm} />
          </div>

          {/* content */}
          {!isEdit ? (
            <div>
              <p
                className="line-clamp-3 hover:cursor-pointer"
                onClick={() => route.push(`/${post._id}`)}
              >
                {post.content}
              </p>
            </div>
          ) : (
            // edit form
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col w-full">
                <TextareaAutosize
                  id="contentUpdate"
                  name="content"
                  minRows={2}
                  placeholder="What's happening?"
                  className="!w-full !border border-gray-100 !rounded-md !outline-none !focus:border-gray-200 !forcus:ring-gray-900 !focus:ring-2 !focus:outline-none"
                  value={values.content}
                  onChange={handleChange}
                />
                <div className="flex justify-end border-t border-gray-100 mt-4 pt-4">
                  <button
                    className="button rounded-full w-[87px] h-[36px] text-[15px] mr-4 text-red-600/80 bg-transparent border border-red-600/80"
                    type="button"
                    onClick={closeEditForm}
                  >
                    Cancel
                  </button>
                  <SubmitButton
                    disabled={!values.content}
                    loading={loading}
                    text="Save"
                    className="rounded-full w-[87px] h-[36px] text-[15px]"
                  />
                </div>
              </div>
            </form>
          )}

          {/* comment, like, share buttons */}
          <div className="mt-2 flex justify-between w-full">
            <CommentButton numberOfComments={12} />
            <LikeButton numberOfLikes={223} />
            <ShareButton numberOfShares={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
