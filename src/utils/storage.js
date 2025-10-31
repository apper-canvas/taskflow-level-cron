const STORAGE_KEYS = {
  TASKS: "taskflow-tasks",
  CATEGORIES: "taskflow-categories",
  SETTINGS: "taskflow-settings",
};

export const loadFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error loading from localStorage:`, error);
    return null;
  }
};

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage:`, error);
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage:`, error);
  }
};

export const STORAGE = STORAGE_KEYS;