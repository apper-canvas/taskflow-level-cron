import categoriesData from "@/services/mockData/categories.json";
import { STORAGE, loadFromStorage, saveToStorage } from "@/utils/storage";

class CategoryService {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    const savedCategories = loadFromStorage(STORAGE.CATEGORIES);
    if (!savedCategories) {
      saveToStorage(STORAGE.CATEGORIES, categoriesData);
    }
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = loadFromStorage(STORAGE.CATEGORIES) || categoriesData;
        resolve([...categories]);
      }, 150);
    });
  }

  async getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = loadFromStorage(STORAGE.CATEGORIES) || categoriesData;
        const category = categories.find(c => c.Id === id);
        resolve(category ? { ...category } : null);
      }, 100);
    });
  }

  async create(categoryData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = loadFromStorage(STORAGE.CATEGORIES) || categoriesData;
        const newCategory = {
          Id: Date.now().toString(),
          ...categoryData,
          taskCount: 0
        };
        const updatedCategories = [...categories, newCategory];
        saveToStorage(STORAGE.CATEGORIES, updatedCategories);
        resolve({ ...newCategory });
      }, 250);
    });
  }

  async update(id, updateData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = loadFromStorage(STORAGE.CATEGORIES) || categoriesData;
        const categoryIndex = categories.findIndex(c => c.Id === id);
        if (categoryIndex !== -1) {
          const updatedCategory = { ...categories[categoryIndex], ...updateData };
          categories[categoryIndex] = updatedCategory;
          saveToStorage(STORAGE.CATEGORIES, updatedCategories);
          resolve({ ...updatedCategory });
        } else {
          resolve(null);
        }
      }, 200);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = loadFromStorage(STORAGE.CATEGORIES) || categoriesData;
        const updatedCategories = categories.filter(c => c.Id !== id);
        saveToStorage(STORAGE.CATEGORIES, updatedCategories);
        resolve(true);
      }, 200);
    });
  }

  async updateTaskCount(categoryId, count) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = loadFromStorage(STORAGE.CATEGORIES) || categoriesData;
        const categoryIndex = categories.findIndex(c => c.Id === categoryId);
        if (categoryIndex !== -1) {
          categories[categoryIndex].taskCount = count;
          saveToStorage(STORAGE.CATEGORIES, categories);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 100);
    });
  }
}

export const categoryService = new CategoryService();