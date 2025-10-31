import tasksData from "@/services/mockData/tasks.json";
import { STORAGE, loadFromStorage, saveToStorage } from "@/utils/storage";

class TaskService {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    const savedTasks = loadFromStorage(STORAGE.TASKS);
    if (!savedTasks) {
      saveToStorage(STORAGE.TASKS, tasksData);
    }
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = loadFromStorage(STORAGE.TASKS) || tasksData;
        resolve([...tasks]);
      }, 200);
    });
  }

  async getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = loadFromStorage(STORAGE.TASKS) || tasksData;
        const task = tasks.find(t => t.Id === parseInt(id));
        resolve(task ? { ...task } : null);
      }, 150);
    });
  }

  async create(taskData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = loadFromStorage(STORAGE.TASKS) || tasksData;
        const maxId = Math.max(...tasks.map(t => t.Id), 0);
        const newTask = {
          Id: maxId + 1,
          ...taskData,
          completed: false,
          createdAt: new Date().toISOString(),
          completedAt: null
        };
        const updatedTasks = [...tasks, newTask];
        saveToStorage(STORAGE.TASKS, updatedTasks);
        resolve({ ...newTask });
      }, 300);
    });
  }

  async update(id, updateData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = loadFromStorage(STORAGE.TASKS) || tasksData;
        const taskIndex = tasks.findIndex(t => t.Id === parseInt(id));
        if (taskIndex !== -1) {
          const updatedTask = { 
            ...tasks[taskIndex], 
            ...updateData,
            completedAt: updateData.completed && !tasks[taskIndex].completed ? new Date().toISOString() : 
                        !updateData.completed && tasks[taskIndex].completed ? null : 
                        tasks[taskIndex].completedAt
          };
          tasks[taskIndex] = updatedTask;
          saveToStorage(STORAGE.TASKS, tasks);
          resolve({ ...updatedTask });
        } else {
          resolve(null);
        }
      }, 250);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = loadFromStorage(STORAGE.TASKS) || tasksData;
        const updatedTasks = tasks.filter(t => t.Id !== parseInt(id));
        saveToStorage(STORAGE.TASKS, updatedTasks);
        resolve(true);
      }, 200);
    });
  }

  async getByCategory(categoryId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = loadFromStorage(STORAGE.TASKS) || tasksData;
        const filteredTasks = tasks.filter(t => t.categoryId === categoryId);
        resolve([...filteredTasks]);
      }, 200);
    });
  }

  async getByPriority(priority) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = loadFromStorage(STORAGE.TASKS) || tasksData;
        const filteredTasks = tasks.filter(t => t.priority === priority);
        resolve([...filteredTasks]);
      }, 200);
    });
  }

  async getCompleted() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = loadFromStorage(STORAGE.TASKS) || tasksData;
        const completedTasks = tasks.filter(t => t.completed);
        resolve([...completedTasks]);
      }, 200);
    });
  }

  async getActive() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = loadFromStorage(STORAGE.TASKS) || tasksData;
        const activeTasks = tasks.filter(t => !t.completed);
        resolve([...activeTasks]);
      }, 200);
    });
  }
}

export const taskService = new TaskService();