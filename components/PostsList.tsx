import React from "react";
import useSWR from "swr";
import { IPostPopulate } from "../utils/types";
import PostCard from "./PostCard/PostCard";
import ReactLoading from "react-loading";

const PostsList = () => {
  const { data, error } = useSWR("/posts");

  if (error) return <p>Error...</p>;
  if (!data)
    return (
      <div className="mx-auto mt-6">
        <ReactLoading height={55} width={45} color="#3972ED" type="bars" />
      </div>
    );
  const posts: IPostPopulate[] = data?.data?.posts || [];
  return (
    <div className="w-[600px] border border-gray-100 mt-4 flex flex-col-reverse">
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
};

export default PostsList;
