export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile extends User {
  teams_count?: number;
  tasks_count?: number;
}
