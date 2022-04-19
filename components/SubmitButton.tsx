import React from "react";
import ReactLoading from "react-loading";

const SubmitButton: React.FC<{
  loading: boolean;
  text: string;
  className?: string;
}> = ({ loading, text, className }) => {
  return (
    <button
      className={`button flex justify-center items-center ${
        loading && "cursor-not-allowed bg-gray-600/60"
      } ${className}`}
      type="submit"
      disabled={loading}
    >
      {loading && (
        <ReactLoading type="spinningBubbles" height={20} width={20} />
      )}
      <span className="ml-3">{text}</span>
    </button>
  );
};

export default SubmitButton;
