import React, { FC, ChangeEventHandler, ReactElement } from "react";

interface BaseInput {
  type?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  value: string;
  prefixIcon?: ReactElement;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

export const BaseInput: FC<BaseInput> = ({
  type = "text",
  id,
  className,
  placeholder,
  value,
  handleChange,
  prefixIcon,
}) => (
  <label
    htmlFor={id}
    className={"flex flex-row justify-center items-center relative " + className}
  >
    <div className="input-prefix-icon">{prefixIcon}</div>
    <input
      className="
      outline-none 
      bg-gray-50 
      border 
      border-gray-300 
      text-gray-900 
      text-sm 
      rounded-lg 
      focus:ring-blue-500 
      focus:border-blue-500 
      block 
      w-full 
      p-2.5 
      dark:bg-gray-700 
      dark:border-gray-600 
      dark:placeholder-gray-400 
      dark:text-white 
      dark:focus:ring-blue-500 
      dark:focus:border-blue-500
      "
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  </label>
);
