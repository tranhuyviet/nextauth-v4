import { Avatar, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { IPostPopulate } from "../utils/types";
import moment from "moment";

const PostCard: React.FC<{ post: IPostPopulate }> = ({ post }) => {
  return (
    <div className="px-4 pt-4 pb-2 border-b border-gray-100 first:border-b-0 hover:bg-gray-100/80 transition-all duration-300 hover:cursor-pointer">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="button-social-icon ml-auto text-gray-500 hover:bg-blue-300/30 hover:text-blue-600 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </div>

          {/* content */}
          <div>
            <p className="line-clamp-3">{post.content}</p>
          </div>

          <div className="mt-2 flex justify-between w-full">
            {/* comments */}
            <div className="button-social-group group hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="button-social-icon group-hover:bg-blue-300/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p>7</p>
            </div>

            {/* like */}
            <div className="button-social-group group hover:text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="button-social-icon group-hover:bg-red-300/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <p>732</p>
            </div>

            {/* share */}
            <div className="button-social-group group hover:text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="button-social-icon group-hover:bg-green-300/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <p>7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
