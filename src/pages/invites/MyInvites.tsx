import { DashboardLayout } from '@/layouts/DashboardLayout';
import { PageContainer } from '@/components/layout/PageContainer';
import { Spinner } from '@/components/common/Spinner';
import { EmptyState } from '@/components/common/EmptyState';
import { InviteCard } from '@/components/features/invites/InviteCard';
import { useMyPendingInvites, useInviteMutations } from '@/hooks/useInvites';
import { Invite } from '@/types/invite';
import { Mail } from 'lucide-react';

export const MyInvites = () => {
  const { data: invites, isLoading } = useMyPendingInvites();
  const { acceptInvitation, declineInvitation, isAccepting, isDeclining } = useInviteMutations();

  const handleAccept = async (invite: Invite) => {
    try {
      await acceptInvitation({ token: invite.token });
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleDecline = async (invite: Invite) => {
    if (confirm('Are you sure you want to decline this invitation?')) {
      try {
        await declineInvitation(invite.token);
      } catch (error) {
        // Error handled in hook
      }
    }
  };

  return (
    <DashboardLayout>
      <PageContainer
        title="My Invitations"
        description="View and manage your team invitations"
      >
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : !invites || invites.length === 0 ? (
          <EmptyState
            icon={Mail}
            title="No pending invitations"
            description="You don't have any pending team invitations at the moment"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {invites.map((invite) => (
              <InviteCard
                key={invite.id}
                invite={invite}
                onAccept={handleAccept}
                onDecline={handleDecline}
                isAccepting={isAccepting}
                isDeclining={isDeclining}
              />
            ))}
          </div>
        )}
      </PageContainer>
    </DashboardLayout>
  );
};
