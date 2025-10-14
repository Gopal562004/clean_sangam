import React from "react";
import { cn } from "../../../../../utils/cn";
import Icon from "../../../../../components/AppIcon";

const InputWithIcon = ({
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  rightIcon,
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
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon name={icon} size={20} />
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
            "w-full h-12 px-4 border rounded-lg text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            icon && "pl-11",
            rightIcon && "pr-11",
            error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 bg-white hover:border-gray-400",
            disabled && "opacity-50 cursor-not-allowed bg-gray-100",
            className
          )}
          {...props}
        />

        {/* Right Icon */}
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <Icon name={rightIcon} size={20} />
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputWithIcon;
