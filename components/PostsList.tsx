import { Divider } from "@mui/material";
import React from "react";
import useSWR from "swr";
import { IPostPopulate } from "../utils/types";
import PostCard from "./PostCard";

const PostsList = () => {
  const { data, error } = useSWR("/posts");

  if (error) return <p>Error...</p>;
  if (!data) return <p>Loading...</p>;
  console.log(data.data.posts);
  const posts: IPostPopulate[] = data.data.posts;
  return (
    <div className="w-[600px] border border-gray-100 mt-4 flex flex-col-reverse">
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
};

export default PostsList;
