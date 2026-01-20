import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invitesApi } from '@/api/endpoints/invites';
import { SendInvitationsData, AcceptInvitationData } from '@/types/invite';
import toast from 'react-hot-toast';

export const useMyPendingInvites = () => {
  return useQuery({
    queryKey: ['invites', 'my-pending'],
    queryFn: invitesApi.getMyPendingInvitations,
  });
};

export const useTeamInvites = (teamId: string) => {
  return useQuery({
    queryKey: ['invites', 'team', teamId],
    queryFn: () => invitesApi.getTeamInvitations(teamId),
    enabled: !!teamId,
  });
};

export const useInviteMutations = () => {
  const queryClient = useQueryClient();

  const sendInvitationsMutation = useMutation({
    mutationFn: invitesApi.sendInvitations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invites'] });
      toast.success('Invitations sent successfully!');
    },
  });

  const acceptInvitationMutation = useMutation({
    mutationFn: invitesApi.acceptInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invites'] });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast.success('Invitation accepted!');
    },
  });

  const revokeInvitationMutation = useMutation({
    mutationFn: invitesApi.revokeInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invites'] });
      toast.success('Invitation revoked!');
    },
  });

  return {
    sendInvitations: (data: SendInvitationsData) => sendInvitationsMutation.mutateAsync(data),
    acceptInvitation: (data: AcceptInvitationData) => acceptInvitationMutation.mutateAsync(data),
    revokeInvitation: (inviteId: string) => revokeInvitationMutation.mutateAsync(inviteId),
    isSending: sendInvitationsMutation.isPending,
    isAccepting: acceptInvitationMutation.isPending,
    isRevoking: revokeInvitationMutation.isPending,
  };
};
