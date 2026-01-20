import { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { Spinner } from '@/components/common/Spinner';
import { TeamCard } from '@/components/features/teams/TeamCard';
import { CreateTeamModal } from '@/components/features/teams/CreateTeamModal';
import { useTeams } from '@/hooks/useTeams';
import { Users } from 'lucide-react';

export const Teams = () => {
  const { teams, isLoading, createTeam, isCreating } = useTeams();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <DashboardLayout>
      <PageContainer
        title="Teams"
        description="Manage your teams and collaborate with your colleagues"
        actions={
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Team
          </Button>
        }
      >
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : teams.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No teams yet"
            description="Create your first team to start collaborating with your colleagues"
            action={
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Team
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <TeamCard key={team.uuid} team={team} />
            ))}
          </div>
        )}

        <CreateTeamModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={createTeam}
          isLoading={isCreating}
        />
      </PageContainer>
    </DashboardLayout>
  );
};
