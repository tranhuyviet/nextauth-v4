import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import ReactLoading from "react-loading";
import useSWR from "swr";
import { IPostPopulate } from "../utils/types";

const PostDetailPage = () => {
  const route = useRouter();
  console.log(route.asPath);
  const { data, error } = useSWR(`/posts${route.asPath}`);

  if (error) return <p>Error...</p>;
  if (!data)
    return (
      <div className="mx-auto mt-6">
        <ReactLoading height={55} width={45} color="#3972ED" type="bars" />
      </div>
    );

  const post: IPostPopulate = data.data.post;

  return (
    <div className="text-center pt-2 flex flex-col items-center">
      <h1 className="font-bold">Post Detail</h1>
      <p>{post._id}</p>
      <p>{post.content}</p>
      <Avatar src={post.user.image} />
      <p>{post.user.name}</p>
      <p>{post.createdAt}</p>
    </div>
  );
};

export default PostDetailPage;
