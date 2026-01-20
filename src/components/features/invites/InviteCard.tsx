import { Mail, Calendar, User } from 'lucide-react';
import { Invite } from '@/types/invite';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Avatar } from '@/components/common/Avatar';
import { formatDate } from '@/utils/formatters';

interface InviteCardProps {
  invite: Invite;
  onAccept?: (invite: Invite) => void;
  onDecline?: (invite: Invite) => void;
  isAccepting?: boolean;
  isDeclining?: boolean;
}

export const InviteCard = ({
  invite,
  onAccept,
  onDecline,
  isAccepting = false,
  isDeclining = false,
}: InviteCardProps) => {
  return (
    <Card padding="md">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">
              {invite.team?.name || 'Team Invitation'}
            </h3>
            {invite.inviter && (
              <div className="flex items-center gap-2 mt-2">
                <Avatar
                  src={invite.inviter.avatar_url}
                  name={invite.inviter.name}
                  size="xs"
                />
                <p className="text-sm text-gray-600">
                  Invited by {invite.inviter.name}
                </p>
              </div>
            )}
          </div>
          <Badge variant="info">
            {invite.role}
          </Badge>
        </div>

        {/* Details */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{invite.invitee_email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Expires: {formatDate(invite.expires_at)}</span>
          </div>
        </div>

        {/* Actions */}
        {onAccept && onDecline && (
          <div className="flex gap-3 pt-3 border-t border-gray-100">
            <Button
              size="sm"
              onClick={() => onAccept(invite)}
              isLoading={isAccepting}
              disabled={isDeclining}
            >
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDecline(invite)}
              isLoading={isDeclining}
              disabled={isAccepting}
            >
              Decline
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
