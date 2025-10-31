import Select from "@/components/atoms/Select";

const PrioritySelect = ({ value, onChange, ...props }) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      {...props}
    >
      <option value="">Select Priority</option>
      <option value="high">High Priority</option>
      <option value="medium">Medium Priority</option>
      <option value="low">Low Priority</option>
    </Select>
  );
};

export default PrioritySelect;