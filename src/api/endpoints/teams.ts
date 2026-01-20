import apiClient from '../client';
import { Team, CreateTeamData, UpdateTeamData, TeamListResponse } from '@/types/team';
import { ApiResponse } from '@/types/api';

export const teamsApi = {
  getTeams: async (): Promise<Team[]> => {
    const { data } = await apiClient.get<ApiResponse<TeamListResponse>>('/teams');
    return data.data.data || data.data;
  },

  createTeam: async (teamData: CreateTeamData): Promise<Team> => {
    const { data } = await apiClient.post<ApiResponse<Team>>('/teams', teamData);
    return data.data;
  },

  getTeam: async (uuid: string): Promise<Team> => {
    const { data } = await apiClient.get<ApiResponse<Team>>(`/teams/${uuid}`);
    return data.data;
  },

  updateTeam: async (uuid: string, teamData: UpdateTeamData): Promise<Team> => {
    const { data } = await apiClient.put<ApiResponse<Team>>(`/teams/${uuid}`, teamData);
    return data.data;
  },

  deleteTeam: async (uuid: string): Promise<void> => {
    await apiClient.delete(`/teams/${uuid}`);
  },
};
