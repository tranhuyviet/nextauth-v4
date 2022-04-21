import React from "react";
import ReactLoading from "react-loading";

const SubmitButton: React.FC<{
  disabled?: boolean;
  loading: boolean;
  text: string;
  className?: string;
}> = ({ loading, text, className, disabled }) => {
  return (
    <button
      className={`button flex justify-center items-center ${
        loading || (disabled && "cursor-not-allowed bg-gray-600/60")
      } ${className}`}
      type="submit"
      disabled={disabled}
    >
      {loading ? (
        <ReactLoading type="spinningBubbles" height={20} width={20} />
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default SubmitButton;
