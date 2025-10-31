import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  className, 
  title = "No tasks yet!",
  description = "Create your first task to get started with TaskFlow.",
  actionLabel = "Add Your First Task",
  onAction,
  icon = "CheckSquare",
  ...props 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6", className)} {...props}>
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
          <ApperIcon name={icon} className="w-10 h-10 text-primary" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>

        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 font-semibold"
          >
            <ApperIcon name="Plus" className="w-5 h-5" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Empty;