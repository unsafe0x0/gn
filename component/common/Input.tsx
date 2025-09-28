import React from "react";

interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  className?: string;
  label?: string;
}

const Input = ({
  onChange,
  value,
  placeholder,
  className = "",
  label,
}: InputProps) => {
  return (
    <div className="flex flex-col justify-start items-start w-full">
      {label && (
        <label className="block text-base font-medium mb-1">{label}</label>
      )}
      <input
        type="text"
        className={`border border-neutral-300 bg-[#faf9f5] rounded-md p-2 outline-none focus:border-[#c96442] w-full text-sm font-normal ${className}`}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
