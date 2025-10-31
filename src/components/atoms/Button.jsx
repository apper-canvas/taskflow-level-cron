import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
    secondary: "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white active:scale-[0.98]",
    ghost: "text-gray-700 hover:bg-gray-100 active:scale-[0.98]",
    danger: "bg-error text-white hover:bg-error/90 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    default: "px-6 py-3 rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;