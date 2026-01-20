import { User } from './user';
import { Team } from './team';

export type InviteStatus = 'pending' | 'accepted' | 'rejected' | 'expired';

export interface Invite {
  id: string;
  team_id: string;
  team?: Team;
  inviter_id: string;
  inviter?: User;
  invitee_email: string;
  invitee_id?: string;
  invitee?: User;
  role: string;
  status: InviteStatus;
  token: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface SendInvitationsData {
  team_id: string;
  emails: string[];
  role?: string;
}

export interface AcceptInvitationData {
  token: string;
}

export interface InviteListResponse {
  data: Invite[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
