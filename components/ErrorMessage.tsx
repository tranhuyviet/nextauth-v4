import React from "react";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="bg-red-300/30 w-full px-4 py-3 flex items-center mt-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="ml-2 text-red-800">{message}</p>
    </div>
  );
};

export default ErrorMessage;
