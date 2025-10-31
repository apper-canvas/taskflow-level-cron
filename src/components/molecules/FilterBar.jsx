import Button from "@/components/atoms/Button";

const FilterBar = ({ activeFilter, onFilterChange, priorities }) => {
  const filters = [
    { key: "all", label: "All Tasks" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  const priorityFilters = [
    { key: "high", label: "High" },
    { key: "medium", label: "Medium" },
    { key: "low", label: "Low" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? "primary" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      
      <div className="w-px h-6 bg-gray-200" />
      
      <div className="flex flex-wrap gap-2">
        {priorityFilters.map((priority) => (
          <Button
            key={priority.key}
            variant={activeFilter === priority.key ? "primary" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(priority.key)}
          >
            {priority.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;