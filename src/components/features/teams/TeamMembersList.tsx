import { TeamMember } from '@/types/team';
import { Avatar } from '@/components/common/Avatar';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { formatRelativeTime } from '@/utils/formatters';

interface TeamMembersListProps {
  members: TeamMember[];
}

export const TeamMembersList = ({ members }: TeamMembersListProps) => {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'lead':
        return 'info';
      case 'admin':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-3">
      {members.map((member) => (
        <Card key={member.id} padding="md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                src={member.avatar_url}
                name={member.name}
                size="md"
              />
              <div>
                <p className="font-medium text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
                {member.joined_at && (
                  <p className="text-xs text-gray-400 mt-1">
                    Joined {formatRelativeTime(member.joined_at)}
                  </p>
                )}
              </div>
            </div>
            <Badge variant={getRoleBadgeVariant(member.role || 'member')}>
              {member.role ? member.role.charAt(0).toUpperCase() + member.role.slice(1) : 'Member'}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};
