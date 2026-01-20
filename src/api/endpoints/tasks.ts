import apiClient from '../client';
import {
  Task,
  CreateTaskData,
  UpdateTaskData,
  UpdateTaskStatusData,
  AssignTaskData,
  RemoveAssigneesData,
  TaskListResponse,
  TaskStatistics,
  TaskFilters,
} from '@/types/task';
import { ApiResponse } from '@/types/api';

export const tasksApi = {
  getMyTasks: async (filters?: TaskFilters): Promise<Task[]> => {
    const { data } = await apiClient.get<ApiResponse<TaskListResponse>>('/tasks/my-tasks', {
      params: filters,
    });
    return data.data.data || data.data;
  },

  getTeamTasks: async (teamId: string, filters?: TaskFilters): Promise<Task[]> => {
    const { data } = await apiClient.get<ApiResponse<TaskListResponse>>(`/tasks/team/${teamId}`, {
      params: filters,
    });
    return data.data.data || data.data;
  },

  getTaskStatistics: async (teamId: string): Promise<TaskStatistics> => {
    const { data } = await apiClient.get<ApiResponse<TaskStatistics>>(`/tasks/team/${teamId}/statistics`);
    return data.data;
  },

  createTask: async (taskData: CreateTaskData): Promise<Task> => {
    const { data } = await apiClient.post<ApiResponse<Task>>('/tasks', taskData);
    return data.data;
  },

  getTask: async (uuid: string): Promise<Task> => {
    const { data } = await apiClient.get<ApiResponse<Task>>(`/tasks/${uuid}`);
    return data.data;
  },

  updateTask: async (uuid: string, taskData: UpdateTaskData): Promise<Task> => {
    const { data } = await apiClient.put<ApiResponse<Task>>(`/tasks/${uuid}`, taskData);
    return data.data;
  },

  updateTaskStatus: async (uuid: string, statusData: UpdateTaskStatusData): Promise<Task> => {
    const { data } = await apiClient.patch<ApiResponse<Task>>(`/tasks/${uuid}/status`, statusData);
    return data.data;
  },

  deleteTask: async (uuid: string): Promise<void> => {
    await apiClient.delete(`/tasks/${uuid}`);
  },

  assignUsers: async (uuid: string, assignData: AssignTaskData): Promise<Task> => {
    const { data } = await apiClient.post<ApiResponse<Task>>(`/tasks/${uuid}/assign`, assignData);
    return data.data;
  },

  removeAssignees: async (uuid: string, removeData: RemoveAssigneesData): Promise<Task> => {
    const { data } = await apiClient.post<ApiResponse<Task>>(`/tasks/${uuid}/remove-assignees`, removeData);
    return data.data;
  },
};
