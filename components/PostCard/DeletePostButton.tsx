import axios from "axios";
import React from "react";
import useSWR from "swr";
import { IPostPopulate } from "../../utils/types";

const DeletePostButton: React.FC<{ postId: string }> = ({ postId }) => {
  const url = "/posts";
  const { data, mutate, error } = useSWR(url);

  const handleDeletePost = async () => {
    try {
      const { data: resDeletePost } = await axios.delete(`${url}/${postId}`);
      if (resDeletePost.status === "success") {
        const posts: IPostPopulate[] = data.data.posts;
        mutate([...posts.filter((post) => post._id !== postId)]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="menu-button-wrapper text-red-600/80"
      onClick={handleDeletePost}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      <span className="">Delete</span>
    </div>
  );
};

export default DeletePostButton;
