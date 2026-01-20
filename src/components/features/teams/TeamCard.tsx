import { Link } from 'react-router-dom';
import { Users, CheckSquare } from 'lucide-react';
import { Team } from '@/types/team';
import { Card } from '@/components/common/Card';
import { Avatar } from '@/components/common/Avatar';
import { ROUTES } from '@/utils/constants';

interface TeamCardProps {
  team: Team;
}

export const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <Link to={ROUTES.TEAM_DETAILS(team.uuid)}>
      <Card hover padding="lg" className="h-full">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{team.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Lead: {team.lead?.name || 'Unknown'}
              </p>
            </div>
            {team.lead && (
              <Avatar
                src={team.lead.avatar_url}
                name={team.lead.name}
                size="md"
              />
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span className="text-sm">
                {team.members_count || 0} {team.members_count === 1 ? 'member' : 'members'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckSquare className="w-5 h-5" />
              <span className="text-sm">
                {team.tasks_count || 0} {team.tasks_count === 1 ? 'task' : 'tasks'}
              </span>
            </div>
          </div>

          {/* Task breakdown */}
          {(team.pending_tasks_count !== undefined ||
            team.in_progress_tasks_count !== undefined ||
            team.completed_tasks_count !== undefined) && (
            <div className="pt-4 border-t border-gray-100">
              <div className="flex gap-4 text-xs">
                <div>
                  <span className="text-gray-500">Pending:</span>{' '}
                  <span className="font-semibold text-gray-700">
                    {team.pending_tasks_count || 0}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">In Progress:</span>{' '}
                  <span className="font-semibold text-blue-600">
                    {team.in_progress_tasks_count || 0}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Completed:</span>{' '}
                  <span className="font-semibold text-green-600">
                    {team.completed_tasks_count || 0}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};
