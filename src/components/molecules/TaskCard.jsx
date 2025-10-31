import { motion } from "framer-motion";
import { useState } from "react";
import Card from "@/components/atoms/Card";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { formatDueDate, getDueDateColor, isOverdue } from "@/utils/dateUtils";
import ConfettiAnimation from "@/components/molecules/ConfettiAnimation";

const TaskCard = ({ task, onToggleComplete, onDelete }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleToggleComplete = (e) => {
    const isCompleted = e.target.checked;
onToggleComplete(task.Id, isCompleted);
    
    if (isCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 600);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "high";
      case "medium": return "medium";
      case "low": return "low";
      default: return "default";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <Card className="p-6 hover:shadow-md transition-all duration-200">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
            />
            {showConfetti && (
              <ConfettiAnimation />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
<h3 className={`font-semibold text-lg leading-snug ${
                task.completed_c ? "text-gray-500 line-through" : "text-gray-900"
              }`}>
                {task.title_c || task.Name}
              </h3>
              
              <div className="flex items-center gap-2 flex-shrink-0">
<Badge variant={getPriorityColor(task.priority_c)} size="sm">
                  {task.priority_c}
                </Badge>
                
{task.due_date_c && (
                  <Badge 
                    className={getDueDateColor(task.due_date_c)}
                    size="sm"
                  >
                    {formatDueDate(task.due_date_c)}
                  </Badge>
                )}
              </div>
            </div>

{task.description_c && (
              <p className={`text-gray-600 mb-4 leading-relaxed ${
                task.completed_c ? "line-through" : ""
              }`}>
                {task.description_c}
              </p>
            )}

            <div className="flex items-center justify-between">
<div className="flex items-center gap-2">
                {isOverdue(task.due_date_c) && !task.completed_c && (
                  <div className="flex items-center gap-1 text-error text-sm">
                    <ApperIcon name="AlertCircle" className="w-4 h-4" />
                    <span>Overdue</span>
                  </div>
                )}
              </div>
              
              <Button
                variant="ghost"
size="sm"
                onClick={() => onDelete(task.Id)}
                className="text-gray-400 hover:text-error hover:bg-error/10"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskCard;