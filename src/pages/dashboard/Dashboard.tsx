import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, CheckSquare, Clock, CheckCircle2 } from 'lucide-react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { Spinner } from '@/components/common/Spinner';
import { TeamCard } from '@/components/features/teams/TeamCard';
import { TaskCard } from '@/components/features/tasks/TaskCard';
import { CreateTeamModal } from '@/components/features/teams/CreateTeamModal';
import { useAuth } from '@/hooks/useAuth';
import { useTeams } from '@/hooks/useTeams';
import { useMyTasks, useTaskMutations } from '@/hooks/useTasks';
import { ROUTES } from '@/utils/constants';
import { TaskStatus } from '@/types/task';

export const Dashboard = () => {
  const { user } = useAuth();
  const { teams, isLoading: teamsLoading, createTeam, isCreating } = useTeams();
  const { data: myTasks, isLoading: tasksLoading } = useMyTasks();
  const { updateTaskStatus } = useTaskMutations();
  
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await updateTaskStatus(taskId, { status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const stats = [
    {
      title: 'Total Teams',
      value: teams.length,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      link: ROUTES.TEAMS,
    },
    {
      title: 'My Tasks',
      value: myTasks?.length || 0,
      icon: CheckSquare,
      color: 'from-purple-500 to-purple-600',
      link: ROUTES.MY_TASKS,
    },
    {
      title: 'In Progress',
      value: myTasks?.filter((t) => t.status === 'in_progress').length || 0,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Completed',
      value: myTasks?.filter((t) => t.status === 'completed').length || 0,
      icon: CheckCircle2,
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <DashboardLayout>
      <PageContainer>
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your tasks today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Link key={stat.title} to={stat.link || '#'}>
              <Card hover padding="lg" className="h-full">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Teams */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">My Teams</h2>
              <Button
                size="sm"
                onClick={() => setShowCreateTeamModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Team
              </Button>
            </div>

            {teamsLoading ? (
              <Card padding="lg">
                <Spinner />
              </Card>
            ) : teams.length === 0 ? (
              <Card padding="none">
                <EmptyState
                  icon={Users}
                  title="No teams yet"
                  description="Create your first team to start collaborating"
                  action={
                    <Button onClick={() => setShowCreateTeamModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Team
                    </Button>
                  }
                />
              </Card>
            ) : (
              <div className="space-y-4">
                {teams.slice(0, 3).map((team) => (
                  <TeamCard key={team.uuid} team={team} />
                ))}
                {teams.length > 3 && (
                  <Link to={ROUTES.TEAMS}>
                    <Button variant="outline" fullWidth>
                      View All Teams ({teams.length})
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Recent Tasks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Tasks</h2>
              <Link to={ROUTES.MY_TASKS}>
                <Button size="sm" variant="ghost">
                  View All
                </Button>
              </Link>
            </div>

            {tasksLoading ? (
              <Card padding="lg">
                <Spinner />
              </Card>
            ) : !myTasks || myTasks.length === 0 ? (
              <Card padding="none">
                <EmptyState
                  icon={CheckSquare}
                  title="No tasks assigned"
                  description="You don't have any tasks assigned yet"
                />
              </Card>
            ) : (
              <div className="space-y-4">
                {myTasks.slice(0, 5).map((task) => (
                  <TaskCard 
                    key={task.uuid} 
                    task={task}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </PageContainer>

      <CreateTeamModal
        isOpen={showCreateTeamModal}
        onClose={() => setShowCreateTeamModal(false)}
        onSubmit={createTeam}
        isLoading={isCreating}
      />
    </DashboardLayout>
  );
};
