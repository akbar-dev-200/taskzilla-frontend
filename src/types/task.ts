import { User } from './user';
import { Team } from './team';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  uuid: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: string;
  team_id: string;
  team?: Team;
  created_by: string;
  creator?: User;
  assignees: User[];
  created_at: string;
  updated_at: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  priority: TaskPriority;
  status?: TaskStatus;
  due_date?: string;
  team_id: string;
  assignee_ids?: string[];
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  due_date?: string;
}

export interface UpdateTaskStatusData {
  status: TaskStatus;
}

export interface AssignTaskData {
  user_ids: string[];
}

export interface RemoveAssigneesData {
  user_ids: string[];
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  team_id?: string;
  search?: string;
  due_date_from?: string;
  due_date_to?: string;
}

export interface TaskStatistics {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
  overdue: number;
}

export interface TaskListResponse {
  data: Task[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
