import { useState } from "react";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Button from "@/components/atoms/Button";
import PrioritySelect from "@/components/molecules/PrioritySelect";
import CategorySelect from "@/components/molecules/CategorySelect";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const TaskForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    categoryId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    await onSubmit(formData);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      categoryId: "",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Title"
          placeholder="What needs to be done?"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          required
        />

        <Textarea
          label="Description (Optional)"
          placeholder="Add more details about this task..."
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={2}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
          />

          <PrioritySelect
            label="Priority"
            value={formData.priority}
            onChange={(value) => handleInputChange("priority", value)}
          />

          <CategorySelect
            label="Category"
            value={formData.categoryId}
            onChange={(value) => handleInputChange("categoryId", value)}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={!formData.title.trim() || loading}
            className="min-w-32"
          >
            {loading ? (
              <>
                <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ApperIcon name="Plus" className="w-4 h-4" />
                Add Task
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default TaskForm;