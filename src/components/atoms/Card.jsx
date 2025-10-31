import { cn } from "@/utils/cn";

const Card = ({ 
  children, 
  className,
  hover = false,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-200",
        hover && "hover:shadow-md hover:-translate-y-1 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;