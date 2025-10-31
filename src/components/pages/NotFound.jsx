import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl flex items-center justify-center">
          <ApperIcon name="FileQuestion" className="w-12 h-12 text-primary" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2"
          >
            <ApperIcon name="Home" className="w-4 h-4" />
            Back to Tasks
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => window.history.back()}
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;