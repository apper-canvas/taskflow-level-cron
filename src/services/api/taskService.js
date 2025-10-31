import { getApperClient } from '@/services/apperClient';
import { toast } from 'react-toastify';

class TaskService {
  constructor() {
    this.tableName = 'task_c';
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
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "category_id_c" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "completed_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "CreatedOn" } }
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
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
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
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "category_id_c" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "completed_c" } },
          { field: { Name: "completed_at_c" } }
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error("Error fetching task:", error);
      return null;
    }
  }

  async create(taskData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        toast.error('Failed to initialize ApperClient');
        return null;
      }

      // Only include Updateable fields
      const params = {
        records: [{
          Name: taskData.title_c || taskData.Name || "Untitled Task",
          title_c: taskData.title_c,
          description_c: taskData.description_c || "",
          due_date_c: taskData.due_date_c || null,
          priority_c: taskData.priority_c || "",
          category_id_c: taskData.category_id_c ? parseInt(taskData.category_id_c) : null,
          completed_c: false,
          completed_at_c: null
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
          console.error(`Failed to create task:`, failed);
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
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
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

      if (updateData.title_c !== undefined) recordUpdate.title_c = updateData.title_c;
      if (updateData.description_c !== undefined) recordUpdate.description_c = updateData.description_c;
      if (updateData.due_date_c !== undefined) recordUpdate.due_date_c = updateData.due_date_c;
      if (updateData.priority_c !== undefined) recordUpdate.priority_c = updateData.priority_c;
      if (updateData.category_id_c !== undefined) recordUpdate.category_id_c = updateData.category_id_c ? parseInt(updateData.category_id_c) : null;
      if (updateData.completed_c !== undefined) {
        recordUpdate.completed_c = updateData.completed_c;
        recordUpdate.completed_at_c = updateData.completed_c ? new Date().toISOString() : null;
      }

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
          console.error(`Failed to update task:`, failed);
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
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
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
          console.error(`Failed to delete task:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
      return false;
    }
  }

  async getByCategory(categoryId) {
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
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "category_id_c" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "completed_c" } },
          { field: { Name: "completed_at_c" } }
        ],
        where: [{
          FieldName: "category_id_c",
          Operator: "EqualTo",
          Values: [parseInt(categoryId)]
        }]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks by category:", error);
      return [];
    }
  }

  async getByPriority(priority) {
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
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "category_id_c" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "completed_c" } },
          { field: { Name: "completed_at_c" } }
        ],
        where: [{
          FieldName: "priority_c",
          Operator: "EqualTo",
          Values: [priority]
        }]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks by priority:", error);
      return [];
    }
  }

  async getCompleted() {
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
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "category_id_c" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "completed_c" } },
          { field: { Name: "completed_at_c" } }
        ],
        where: [{
          FieldName: "completed_c",
          Operator: "EqualTo",
          Values: [true]
        }]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
      return [];
    }
  }

  async getActive() {
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
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "category_id_c" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "completed_c" } },
          { field: { Name: "completed_at_c" } }
        ],
        where: [{
          FieldName: "completed_c",
          Operator: "EqualTo",
          Values: [false]
        }]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching active tasks:", error);
      return [];
    }
  }
}

export const taskService = new TaskService();