import React from "react";
import { cn } from "@/utils/cn";

const Select = React.forwardRef(({ 
  className, 
  children,
  label,
  error,
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        className={cn(
          "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer",
          error && "border-error focus:border-error focus:ring-error/20",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;