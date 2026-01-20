import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamsApi } from '@/api/endpoints/teams';
import { CreateTeamData, UpdateTeamData } from '@/types/team';
import toast from 'react-hot-toast';

export const useTeams = () => {
  const queryClient = useQueryClient();

  const teamsQuery = useQuery({
    queryKey: ['teams'],
    queryFn: teamsApi.getTeams,
  });

  const createTeamMutation = useMutation({
    mutationFn: teamsApi.createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast.success('Team created successfully!');
    },
  });

  const updateTeamMutation = useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateTeamData }) =>
      teamsApi.updateTeam(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast.success('Team updated successfully!');
    },
  });

  const deleteTeamMutation = useMutation({
    mutationFn: teamsApi.deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast.success('Team deleted successfully!');
    },
  });

  return {
    teams: teamsQuery.data || [],
    isLoading: teamsQuery.isLoading,
    error: teamsQuery.error,
    createTeam: (data: CreateTeamData) => createTeamMutation.mutateAsync(data),
    updateTeam: (uuid: string, data: UpdateTeamData) =>
      updateTeamMutation.mutateAsync({ uuid, data }),
    deleteTeam: (uuid: string) => deleteTeamMutation.mutateAsync(uuid),
    isCreating: createTeamMutation.isPending,
    isUpdating: updateTeamMutation.isPending,
    isDeleting: deleteTeamMutation.isPending,
  };
};

export const useTeam = (uuid: string) => {
  return useQuery({
    queryKey: ['teams', uuid],
    queryFn: () => teamsApi.getTeam(uuid),
    enabled: !!uuid,
  });
};
