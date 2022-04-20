import React from "react";

const CommentButton: React.FC<{ numberOfComments: number }> = ({
  numberOfComments = 0,
}) => {
  return (
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
      <p>{numberOfComments}</p>
    </div>
  );
};

export default CommentButton;
