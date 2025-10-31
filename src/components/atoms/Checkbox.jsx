import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className,
  checked = false,
  onChange,
  label,
  ...props 
}, ref) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          ref={ref}
          {...props}
        />
        <div
          onClick={() => onChange?.({ target: { checked: !checked } })}
          className={cn(
            "w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 flex items-center justify-center task-checkbox",
            checked 
              ? "bg-success border-success text-white shadow-sm" 
              : "border-gray-300 hover:border-primary",
            className
          )}
        >
          {checked && (
            <ApperIcon name="Check" className="w-3 h-3" />
          )}
        </div>
      </div>
      {label && (
        <label className={cn(
          "text-sm cursor-pointer transition-colors duration-200",
          checked ? "text-gray-500 line-through" : "text-gray-700"
        )}>
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;