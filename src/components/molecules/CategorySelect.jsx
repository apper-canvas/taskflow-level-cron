import { useState, useEffect } from "react";
import Select from "@/components/atoms/Select";
import { categoryService } from "@/services/api/categoryService";

const CategorySelect = ({ value, onChange, ...props }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    loadCategories();
  }, []);

  return (
    <Select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      {...props}
    >
      <option value="">Select Category</option>
      {categories.map((category) => (
        <option key={category.Id} value={category.Id}>
          {category.name}
        </option>
      ))}
    </Select>
  );
};

export default CategorySelect;