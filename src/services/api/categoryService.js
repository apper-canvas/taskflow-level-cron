import { getApperClient } from '@/services/apperClient';
import { toast } from 'react-toastify';

class CategoryService {
  constructor() {
    this.tableName = 'category_c';
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        toast.error('Failed to initialize ApperClient');
        return [];
      }

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "name_c" } },
          { field: { Name: "color_c" } },
          { field: { Name: "icon_c" } },
          { field: { Name: "task_count_c" } }
        ]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        toast.error('Failed to initialize ApperClient');
        return null;
      }

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "name_c" } },
          { field: { Name: "color_c" } },
          { field: { Name: "icon_c" } },
          { field: { Name: "task_count_c" } }
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error("Error fetching category:", error);
      return null;
    }
  }

  async create(categoryData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        toast.error('Failed to initialize ApperClient');
        return null;
      }

      // Only include Updateable fields
      const params = {
        records: [{
          Name: categoryData.name_c || categoryData.Name || "Untitled Category",
          name_c: categoryData.name_c,
          color_c: categoryData.color_c || "#6366F1",
          icon_c: categoryData.icon_c || "Folder",
          task_count_c: 0
        }]
      };

      const response = await apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create category:`, failed);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error.message}`));
            }
            if (record.message) toast.error(record.message);
          });
          return null;
        }

        const successful = response.results.find(r => r.success);
        return successful?.data || null;
      }

      return null;
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
      return null;
    }
  }

  async update(id, updateData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        toast.error('Failed to initialize ApperClient');
        return null;
      }

      // Only include Updateable fields that are being updated
      const recordUpdate = {
        Id: parseInt(id)
      };

      if (updateData.name_c !== undefined) recordUpdate.name_c = updateData.name_c;
      if (updateData.color_c !== undefined) recordUpdate.color_c = updateData.color_c;
      if (updateData.icon_c !== undefined) recordUpdate.icon_c = updateData.icon_c;
      if (updateData.task_count_c !== undefined) recordUpdate.task_count_c = updateData.task_count_c;

      const params = {
        records: [recordUpdate]
      };

      const response = await apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update category:`, failed);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error.message}`));
            }
            if (record.message) toast.error(record.message);
          });
          return null;
        }

        const successful = response.results.find(r => r.success);
        return successful?.data || null;
      }

      return null;
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        toast.error('Failed to initialize ApperClient');
        return false;
      }

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete category:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
      return false;
    }
  }

  async updateTaskCount(categoryId, count) {
    return this.update(categoryId, { task_count_c: count });
  }
}

export const categoryService = new CategoryService();