import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '@/api/endpoints/tasks';
import {
  CreateTaskData,
  UpdateTaskData,
  UpdateTaskStatusData,
  AssignTaskData,
  RemoveAssigneesData,
  TaskFilters,
} from '@/types/task';
import toast from 'react-hot-toast';

export const useMyTasks = (filters?: TaskFilters) => {
  return useQuery({
    queryKey: ['tasks', 'my-tasks', filters],
    queryFn: () => tasksApi.getMyTasks(filters),
  });
};

export const useTeamTasks = (teamId: string, filters?: TaskFilters) => {
  return useQuery({
    queryKey: ['tasks', 'team', teamId, filters],
    queryFn: () => tasksApi.getTeamTasks(teamId, filters),
    enabled: !!teamId,
  });
};

export const useTaskStatistics = (teamId: string) => {
  return useQuery({
    queryKey: ['tasks', 'statistics', teamId],
    queryFn: () => tasksApi.getTaskStatistics(teamId),
    enabled: !!teamId,
  });
};

export const useTask = (uuid: string) => {
  return useQuery({
    queryKey: ['tasks', uuid],
    queryFn: () => tasksApi.getTask(uuid),
    enabled: !!uuid,
  });
};

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: tasksApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task created successfully!');
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateTaskData }) =>
      tasksApi.updateTask(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task updated successfully!');
    },
  });

  const updateTaskStatusMutation = useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateTaskStatusData }) =>
      tasksApi.updateTaskStatus(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task status updated!');
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: tasksApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted successfully!');
    },
  });

  const assignUsersMutation = useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: AssignTaskData }) =>
      tasksApi.assignUsers(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Users assigned successfully!');
    },
  });

  const removeAssigneesMutation = useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: RemoveAssigneesData }) =>
      tasksApi.removeAssignees(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Assignees removed successfully!');
    },
  });

  return {
    createTask: (data: CreateTaskData) => createTaskMutation.mutateAsync(data),
    updateTask: (uuid: string, data: UpdateTaskData) =>
      updateTaskMutation.mutateAsync({ uuid, data }),
    updateTaskStatus: (uuid: string, data: UpdateTaskStatusData) =>
      updateTaskStatusMutation.mutateAsync({ uuid, data }),
    deleteTask: (uuid: string) => deleteTaskMutation.mutateAsync(uuid),
    assignUsers: (uuid: string, data: AssignTaskData) =>
      assignUsersMutation.mutateAsync({ uuid, data }),
    removeAssignees: (uuid: string, data: RemoveAssigneesData) =>
      removeAssigneesMutation.mutateAsync({ uuid, data }),
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
  };
};
