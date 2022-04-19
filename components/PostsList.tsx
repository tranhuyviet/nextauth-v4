import React from "react";
import useSWR from "swr";
import { IPostPopulate } from "../utils/types";

const PostsList = () => {
  const { data, error } = useSWR("/posts");

  if (error) return <p>Error...</p>;
  if (!data) return <p>Loading...</p>;
  console.log(data.data.posts);
  const posts: IPostPopulate[] = data.data.posts;
  return (
    <div className="w-[600px] shadow-md p-8 mt-4">
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.title}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
