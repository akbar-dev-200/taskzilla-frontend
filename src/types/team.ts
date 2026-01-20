import { User } from './user';

export interface Team {
  uuid: string;
  name: string;
  lead_id: string;
  lead?: User;
  created_at: string;
  updated_at: string;
  members?: TeamMember[];
  members_count?: number;
  tasks_count?: number;
  pending_tasks_count?: number;
  in_progress_tasks_count?: number;
  completed_tasks_count?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  role?: 'lead' | 'admin' | 'member';
  joined_at?: string;
}

export interface CreateTeamData {
  name: string;
}

export interface UpdateTeamData {
  name: string;
}

export interface TeamListResponse {
  data: Team[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
