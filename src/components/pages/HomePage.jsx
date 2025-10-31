import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TaskForm from "@/components/molecules/TaskForm";
import TaskList from "@/components/organisms/TaskList";
import FilterBar from "@/components/molecules/FilterBar";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";

const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateTask = async (taskData) => {
    try {
      setSubmitting(true);
      await taskService.create(taskData);
      setRefreshKey(prev => prev + 1);
      toast.success("Task created successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTaskUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveFilter("all");
  };

  const getFilteredTasks = () => {
    if (activeCategory !== "all") {
      return activeCategory;
    }
    return activeFilter;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <CategorySidebar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <ApperIcon name="Menu" className="w-5 h-5" />
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
{activeCategory === "all" ? "All Tasks" : 
                   typeof activeCategory === 'string' ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) : activeCategory}
                </h1>
                <p className="text-gray-600">
                  Stay organized and get things done
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">TaskFlow</p>
                <p className="text-xs text-gray-500">Modern Task Management</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 lg:p-6">
            {/* Task Form */}
<TaskForm 
              onSubmit={handleCreateTask}
              loading={submitting}
            />

            {/* Filters */}
            <FilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {/* Task List */}
            <TaskList
              key={`${refreshKey}-${getFilteredTasks()}`}
              filter={getFilteredTasks()}
              onTaskUpdate={handleTaskUpdate}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;