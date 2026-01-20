import apiClient from '../client';
import { Invite, SendInvitationsData, AcceptInvitationData, InviteListResponse } from '@/types/invite';
import { ApiResponse } from '@/types/api';

export const invitesApi = {
  sendInvitations: async (inviteData: SendInvitationsData): Promise<Invite[]> => {
    const { data } = await apiClient.post<ApiResponse<Invite[]>>('/invites', inviteData);
    return data.data;
  },

  acceptInvitation: async (acceptData: AcceptInvitationData): Promise<void> => {
    await apiClient.post('/invites/accept', acceptData);
  },

  revokeInvitation: async (inviteId: string): Promise<void> => {
    await apiClient.delete(`/invites/${inviteId}`);
  },

  getTeamInvitations: async (teamId: string): Promise<Invite[]> => {
    const { data } = await apiClient.get<ApiResponse<InviteListResponse>>(`/invites/team/${teamId}`);
    return data.data.data || data.data;
  },

  getMyPendingInvitations: async (): Promise<Invite[]> => {
    const { data } = await apiClient.get<ApiResponse<InviteListResponse>>('/invites/my-pending');
    return data.data.data || data.data;
  },
};
