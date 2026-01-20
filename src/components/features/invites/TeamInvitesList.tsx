import { Mail, Calendar, X, Clock } from 'lucide-react';
import { Invite } from '@/types/invite';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { Spinner } from '@/components/common/Spinner';
import { formatDate } from '@/utils/formatters';

interface TeamInvitesListProps {
  teamId: string;
  invites?: Invite[];
  isLoading?: boolean;
  onRevoke?: (inviteId: string) => void;
  isRevoking?: boolean;
}

export const TeamInvitesList = ({
  invites,
  isLoading = false,
  onRevoke,
  isRevoking = false,
}: TeamInvitesListProps) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'success';
      case 'rejected':
      case 'expired':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!invites || invites.length === 0) {
    return (
      <EmptyState
        icon={Mail}
        title="No invitations sent"
        description="Send invitations to add members to your team"
      />
    );
  }

  return (
    <div className="space-y-3">
      {invites.map((invite) => (
        <Card key={invite.id} padding="md">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{invite.invitee_email}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Sent {formatDate(invite.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Expires {formatDate(invite.expires_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant={getStatusBadgeVariant(invite.status)}>
                {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
              </Badge>
              
              {invite.role && (
                <Badge variant="info">
                  {invite.role.charAt(0).toUpperCase() + invite.role.slice(1)}
                </Badge>
              )}
              
              {invite.status === 'pending' && onRevoke && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRevoke(invite.id)}
                  isLoading={isRevoking}
                  title="Revoke invitation"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
