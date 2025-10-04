import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variety?: "default" | "ghost";
}

const Button = ({
  onClick,
  children,
  disabled,
  className = "",
  variety = "default",
}: ButtonProps) => {
  const varietyClasses = {
    default: "bg-[#d97757] text-white hover:bg-[#c96442]",
    ghost: "bg-[#222222] text-neutral-100 hover:bg-[#262626]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-4 py-2 transition-colors text-sm font-medium rounded-lg cursor-pointer ${className} ${varietyClasses[variety]}`}
    >
      {children}
    </button>
  );
};

export default Button;
