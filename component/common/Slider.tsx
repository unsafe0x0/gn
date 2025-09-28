import React from "react";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
  disabled?: boolean;
}

const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  className = "",
  disabled = false,
}: SliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col justify-start items-start w-full">
      {label && (
        <label className="block text-base font-medium mb-1">{label}</label>
      )}
      <div className={`relative w-full ${className}`}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`
            w-full h-2 bg-neutral-200 rounded-md appearance-none cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-[#c96442] focus:ring-opacity-50
            ${disabled ? "cursor-not-allowed opacity-50" : ""}
          `}
          style={{
            background: `linear-gradient(to right, #c96442 0%, #c96442 ${percentage}%, transparent ${percentage}%, transparent 100%)`,
          }}
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #c96442;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #c96442;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          input[type="range"]::-webkit-slider-track {
            height: 8px;
            border-radius: 4px;
            background: transparent;
          }
          input[type="range"]::-moz-range-track {
            height: 8px;
            border-radius: 4px;
            background: transparent;
            border: none;
          }
          input[type="range"]:disabled::-webkit-slider-thumb {
            background: #9ca3af;
            cursor: not-allowed;
          }
          input[type="range"]:disabled::-moz-range-thumb {
            background: #9ca3af;
            cursor: not-allowed;
          }
        `}</style>

        <div className="flex justify-between text-xs text-neutral-600 mt-1">
          <span>{min}</span>
          <span className="font-medium text-[#c96442]">{value}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};

export default Slider;
