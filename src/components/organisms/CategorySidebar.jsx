import { useState, useEffect } from "react";
import CategorySidebarItem from "@/components/molecules/CategorySidebarItem";
import ApperIcon from "@/components/ApperIcon";
import { categoryService } from "@/services/api/categoryService";
import { taskService } from "@/services/api/taskService";

const CategorySidebar = ({ 
  activeCategory, 
  onCategoryChange, 
  isOpen, 
  onClose 
}) => {
  const [categories, setCategories] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});

  const loadCategories = async () => {
    try {
      const categoryData = await categoryService.getAll();
      const taskData = await taskService.getAll();
      
      // Calculate task counts for each category
      const counts = {};
      categoryData.forEach(category => {
        counts[category.Id] = taskData.filter(task => 
          task.categoryId === category.Id && !task.completed
        ).length;
      });
      counts["all"] = taskData.filter(task => !task.completed).length;
      
      setCategories(categoryData);
      setTaskCounts(counts);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const allTasksItem = {
    Id: "all",
    name: "All Tasks",
    color: "#6366F1",
    icon: "List"
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-0
        w-80 bg-white border-r border-gray-100
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                  <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
                  <p className="text-sm text-gray-500">Stay organized</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {/* All Tasks */}
              <CategorySidebarItem
                category={allTasksItem}
                isActive={activeCategory === "all"}
                onClick={() => {
                  onCategoryChange("all");
                  onClose?.();
                }}
                taskCount={taskCounts["all"] || 0}
              />

              {/* Categories */}
              {categories.length > 0 && (
                <>
                  <div className="pt-4 pb-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4">
                      Categories
                    </h3>
                  </div>
                  {categories.map((category) => (
                    <CategorySidebarItem
                      key={category.Id}
                      category={category}
                      isActive={activeCategory === category.Id}
                      onClick={() => {
                        onCategoryChange(category.Id);
                        onClose?.();
                      }}
                      taskCount={taskCounts[category.Id] || 0}
                    />
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Made with ❤️ for productivity
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySidebar;