import React from "react";
import { cn } from "../../../../../utils/cn";
import Icon from "../../../../../components/AppIcon";

const InputWithIcon = ({
  type = "text",
  placeholder,
  value,
  onChange,
  icon: LeftIcon,
  rightIcon: RightIcon,
  onRightIconClick,
  error,
  required = false,
  disabled = false,
  className,
  ...props
}) => {
  const handleChange = (e) => {
    onChange?.(e?.target?.value);
  };

  return (
    <div className="relative">
      <div className="relative">
        {/* Left Icon */}
        {LeftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <LeftIcon size={20} />
          </div>
        )}

        {/* Input Field */}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          className={cn(
            "w-full h-12 px-4 border rounded-lg text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
            LeftIcon && "pl-11",
            RightIcon && "pr-11",
            error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 bg-white hover:border-gray-400",
            disabled && "opacity-50 cursor-not-allowed bg-gray-100",
            className
          )}
          {...props}
        />

        {/* Right Icon */}
        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <RightIcon size={20} />
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputWithIcon;
