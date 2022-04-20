import React from "react";

const LikeButton: React.FC<{ numberOfLikes: number }> = ({
  numberOfLikes = 0,
}) => {
  return (
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
      <p>{numberOfLikes}</p>
    </div>
  );
};

export default LikeButton;
