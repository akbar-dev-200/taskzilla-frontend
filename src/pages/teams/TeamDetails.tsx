import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Mail, Edit, Trash2, Plus } from 'lucide-react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Spinner } from '@/components/common/Spinner';
import { Badge } from '@/components/common/Badge';
import { Avatar } from '@/components/common/Avatar';
import { TeamMembersList } from '@/components/features/teams/TeamMembersList';
import { TaskCard } from '@/components/features/tasks/TaskCard';
import { InviteModal } from '@/components/features/invites/InviteModal';
import { CreateTaskModal } from '@/components/features/tasks/CreateTaskModal';
import { useTeam, useTeams } from '@/hooks/useTeams';
import { useTeamTasks, useTaskMutations } from '@/hooks/useTasks';
import { useInviteMutations } from '@/hooks/useInvites';
import { ROUTES } from '@/utils/constants';
import { EmptyState } from '@/components/common/EmptyState';
import { CheckSquare } from 'lucide-react';

export const TeamDetails = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const { data: team, isLoading } = useTeam(uuid!);
  const { data: tasks, isLoading: tasksLoading } = useTeamTasks(uuid!);
  const { teams } = useTeams();
  const { deleteTeam, isDeleting } = useTeams();
  const { createTask, isCreating } = useTaskMutations();
  const { sendInvitations, isSending } = useInviteMutations();

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'tasks'>('overview');

  const handleDeleteTeam = async () => {
    if (!uuid) return;
    if (confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      await deleteTeam(uuid);
      navigate(ROUTES.TEAMS);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <PageContainer>
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        </PageContainer>
      </DashboardLayout>
    );
  }

  if (!team) {
    return (
      <DashboardLayout>
        <PageContainer>
          <EmptyState
            title="Team not found"
            description="The team you're looking for doesn't exist or you don't have access to it."
          />
        </PageContainer>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageContainer>
        {/* Team Header */}
        <Card padding="lg" className="mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-600 to-primary-end flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{team.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  {team.lead && (
                    <>
                      <Avatar src={team.lead.avatar_url} name={team.lead.name} size="xs" />
                      <span className="text-sm text-gray-600">Led by {team.lead.name}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowInviteModal(true)}
              >
                <Mail className="w-4 h-4 mr-2" />
                Invite
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={handleDeleteTeam}
                isLoading={isDeleting}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-6">
            {(['overview', 'members', 'tasks'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card padding="lg">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{team.members_count || 0}</p>
                <p className="text-gray-600 mt-1">Members</p>
              </div>
            </Card>
            <Card padding="lg">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{team.in_progress_tasks_count || 0}</p>
                <p className="text-gray-600 mt-1">In Progress</p>
              </div>
            </Card>
            <Card padding="lg">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{team.completed_tasks_count || 0}</p>
                <p className="text-gray-600 mt-1">Completed</p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'members' && (
          <div>
            {team.members && team.members.length > 0 ? (
              <TeamMembersList members={team.members} />
            ) : (
              <EmptyState
                icon={Users}
                title="No members yet"
                description="Invite team members to start collaborating"
                action={
                  <Button onClick={() => setShowInviteModal(true)}>
                    <Mail className="w-4 h-4 mr-2" />
                    Invite Members
                  </Button>
                }
              />
            )}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div>
            <div className="flex justify-end mb-4">
              <Button onClick={() => setShowCreateTaskModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </div>

            {tasksLoading ? (
              <div className="flex justify-center py-12">
                <Spinner />
              </div>
            ) : tasks && tasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                  <TaskCard key={task.uuid} task={task} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={CheckSquare}
                title="No tasks yet"
                description="Create your first task to get started"
                action={
                  <Button onClick={() => setShowCreateTaskModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Task
                  </Button>
                }
              />
            )}
          </div>
        )}

        <InviteModal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          onSubmit={sendInvitations}
          teamId={uuid!}
          isLoading={isSending}
        />

        <CreateTaskModal
          isOpen={showCreateTaskModal}
          onClose={() => setShowCreateTaskModal(false)}
          onSubmit={createTask}
          teams={teams}
          defaultTeamId={uuid}
          isLoading={isCreating}
        />
      </PageContainer>
    </DashboardLayout>
  );
};
