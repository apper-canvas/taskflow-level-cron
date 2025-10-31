import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TaskCard from "@/components/molecules/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { taskService } from "@/services/api/taskService";

const TaskList = ({ filter, onTaskUpdate }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      
      let data;
      switch (filter) {
        case "completed":
          data = await taskService.getCompleted();
          break;
        case "active":
          data = await taskService.getActive();
          break;
        case "high":
        case "medium":
        case "low":
          data = await taskService.getByPriority(filter);
          break;
        default:
          data = await taskService.getAll();
          break;
      }
      
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Failed to load tasks. Please try again.");
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await taskService.update(taskId, { completed });
      await loadTasks();
      onTaskUpdate?.();
      
      if (completed) {
        toast.success("Task completed! 🎉");
      } else {
        toast.info("Task reopened");
      }
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskService.delete(taskId);
      await loadTasks();
      onTaskUpdate?.();
      toast.success("Task deleted");
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadTasks} />;
  }

  if (tasks.length === 0) {
    const getEmptyMessage = () => {
      switch (filter) {
        case "completed":
          return {
            title: "No completed tasks",
            description: "Complete some tasks to see them here.",
            icon: "CheckCircle"
          };
        case "active":
          return {
            title: "No active tasks",
            description: "All caught up! Add a new task to get started.",
            icon: "Circle"
          };
        case "high":
        case "medium":
        case "low":
          return {
            title: `No ${filter} priority tasks`,
            description: `You don't have any ${filter} priority tasks at the moment.`,
            icon: "Target"
          };
        default:
          return {
            title: "No tasks yet!",
            description: "Create your first task to get started with TaskFlow.",
            icon: "CheckSquare"
          };
      }
    };

    const emptyState = getEmptyMessage();
    return (
      <Empty
        title={emptyState.title}
        description={emptyState.description}
        icon={emptyState.icon}
      />
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard
            key={task.Id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;