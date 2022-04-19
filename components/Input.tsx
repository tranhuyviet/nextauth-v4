import React from "react";

const Input: React.FC<{
  label: string;
  id: string;
  type?: string;
  value: any;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  error: string | undefined;
  className?: string;
}> = ({ label, id, type = "text", value, handleChange, error, className }) => {
  return (
    <div className={`text-left ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        autoComplete="off"
        type={type}
        className="input"
        name={id}
        id={id}
        value={value}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Input;
