import React, { FC, MouseEvent } from "react";
import { Loader } from "../loader/loader";

interface BaseButtonProps {
  onClick: (event: MouseEvent<HTMLElement>) => void;
  label: string;
  disabled?: boolean;
  loading?: boolean;
  wide?: boolean;
  className?: string;
}

export const BaseButton: FC<BaseButtonProps> = ({
  label,
  disabled,
  loading,
  wide,
  onClick,
  className,
}) => (
  <button
    disabled={disabled}
    className={`
    flex 
    relative 
    py-2.5 
    px-3 
    outline-none 
    rounded-lg 
    text-slate-50 
    border 
    border-solid 
    border-slate-50 
    disabled:opacity-75
    ${className ?? ""}
    ${wide ? "min-w-full" : ""}
    `}
    onClick={onClick}
  >
    {loading ? <Loader className="loader animate-spin" /> : label}
  </button>
);
