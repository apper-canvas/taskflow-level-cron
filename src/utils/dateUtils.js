import { format, parseISO, isToday, isTomorrow, isPast } from "date-fns";

export const formatDueDate = (dateString) => {
  if (!dateString) return "";
  
  const date = parseISO(dateString);
  
  if (isToday(date)) {
    return "Today";
  }
  
  if (isTomorrow(date)) {
    return "Tomorrow";
  }
  
  return format(date, "MMM d");
};

export const getDueDateColor = (dateString) => {
  if (!dateString) return "bg-gray-100 text-gray-600";
  
  const date = parseISO(dateString);
  
  if (isPast(date) && !isToday(date)) {
    return "bg-error/10 text-error border-error/20";
  }
  
  if (isToday(date)) {
    return "bg-warning/10 text-warning border-warning/20";
  }
  
  if (isTomorrow(date)) {
    return "bg-info/10 text-info border-info/20";
  }
  
  return "bg-gray-100 text-gray-600 border-gray-200";
};

export const isOverdue = (dateString) => {
  if (!dateString) return false;
  const date = parseISO(dateString);
  return isPast(date) && !isToday(date);
};