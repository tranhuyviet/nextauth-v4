import { Avatar, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { IPostPopulate } from "../utils/types";
import moment from "moment";

const PostCard: React.FC<{ post: IPostPopulate }> = ({ post }) => {
  return (
    <div className="shadow-lg border border-blue-600">
      {/* card header */}
      <div className="p-4 bg-blue-600/80 text-white">
        <p className="text-center capitalize tracking-wide text-lg">
          {post.title}
        </p>
      </div>

      {/* card body */}
      <div>
        <p>{post.content}</p>
      </div>

      {/* card footer */}
      <div>
        <div className="flex items-center space-x-2">
          <Avatar src={post.user.image} />
          <p>{post.user.name}</p>
        </div>
        <p>{moment(post.createdAt).fromNow()}</p>
      </div>
    </div>
  );
};

export default PostCard;
