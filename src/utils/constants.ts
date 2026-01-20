export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Taskzilla';
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8002/api';

export const AUTH_TOKEN_KEY = 'auth_token';
export const AUTH_USER_KEY = 'auth_user';

export const TASK_STATUS = {
  PENDING: 'pending' as const,
  IN_PROGRESS: 'in_progress' as const,
  COMPLETED: 'completed' as const,
};

export const TASK_PRIORITY = {
  LOW: 'low' as const,
  MEDIUM: 'medium' as const,
  HIGH: 'high' as const,
};

export const TASK_STATUS_LABELS = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export const TASK_PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const TASK_STATUS_COLORS = {
  pending: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

export const TASK_PRIORITY_COLORS = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  TEAMS: '/teams',
  TEAM_DETAILS: (uuid: string) => `/teams/${uuid}`,
  MY_TASKS: '/tasks/my-tasks',
  TEAM_TASKS: (teamId: string) => `/tasks/team/${teamId}`,
  TASK_DETAILS: (uuid: string) => `/tasks/${uuid}`,
  MY_INVITES: '/invites',
  ACCEPT_INVITE: '/invites/accept',
};
