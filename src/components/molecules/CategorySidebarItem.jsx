import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const CategorySidebarItem = ({ 
  category, 
  isActive, 
  onClick,
  taskCount = 0
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-left group",
        isActive
          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      <div className="flex items-center gap-3">
        <div 
          className={cn(
            "w-2 h-2 rounded-full transition-colors duration-200",
            isActive ? "bg-white" : "bg-current opacity-60"
          )}
          style={{ backgroundColor: isActive ? "white" : category.color }}
        />
        <span className="font-medium">{category.name}</span>
      </div>
      
      {taskCount > 0 && (
        <span
          className={cn(
            "text-xs px-2 py-1 rounded-full transition-colors duration-200",
            isActive
              ? "bg-white/20 text-white"
              : "bg-gray-200 text-gray-600 group-hover:bg-gray-300"
          )}
        >
          {taskCount}
        </span>
      )}
    </button>
  );
};

export default CategorySidebarItem;