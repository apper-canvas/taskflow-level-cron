import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  className, 
  message = "Something went wrong while loading your tasks.", 
  onRetry,
  ...props 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6", className)} {...props}>
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 bg-error/10 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-error" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
          >
            <ApperIcon name="RefreshCcw" className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;