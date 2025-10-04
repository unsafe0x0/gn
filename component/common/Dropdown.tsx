import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  className = "",
  disabled = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isOpen]);

  const selectedOption = options.find((option) => option.value === value);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
        }
        break;
    }
  };

  return (
    <div className="flex flex-col justify-start items-start w-full">
      {label && (
        <label className="block text-base font-medium mb-1">{label}</label>
      )}
      <div className={`relative w-full ${className}`} ref={dropdownRef}>
        <button
          type="button"
          className={`
            w-full border border-neutral-300 bg-[#faf9f5] rounded-lg p-2 text-left
            text-sm font-normal transition-colors duration-200
            flex items-center justify-between outline-none
            ${
              disabled
                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                : "hover:border-neutral-400 focus:border-[#c96442] cursor-pointer"
            }
            ${isOpen ? "border-[#c96442]" : ""}
          `}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? undefined : "dropdown-button"}
        >
          <span
            className={selectedOption ? "text-neutral-900" : "text-neutral-500"}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {isOpen ? (
            <FiChevronUp className="w-4 h-4 text-neutral-600 flex-shrink-0" />
          ) : (
            <FiChevronDown className="w-4 h-4 text-neutral-600 flex-shrink-0" />
          )}
        </button>

        {isOpen && (
          <div
            className="
              absolute top-full left-0 right-0 z-50 mt-1
              bg-white border border-neutral-300 rounded-lg shadow-lg
              max-h-60 overflow-y-auto
            "
            role="listbox"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`
                  w-full text-left px-3 py-2 text-sm transition-colors duration-150
                  hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none
                  ${
                    option.value === value
                      ? "bg-neutral-50 text-neutral-900 font-medium"
                      : "text-neutral-700"
                  }
                  first:rounded-t-md last:rounded-b-md
                `}
                onClick={() => handleOptionClick(option.value)}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
