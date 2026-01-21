import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/common/Button';
import { Spinner } from '@/components/common/Spinner';
import { EmptyState } from '@/components/common/EmptyState';
import { TaskCard } from '@/components/features/tasks/TaskCard';
import { CreateTaskModal } from '@/components/features/tasks/CreateTaskModal';
import { TaskFilters } from '@/components/features/tasks/TaskFilters';
import { useMyTasks, useTaskMutations } from '@/hooks/useTasks';
import { useTeams } from '@/hooks/useTeams';
import { TaskFilters as TaskFiltersType, TaskStatus } from '@/types/task';
import { CheckSquare } from 'lucide-react';

export const MyTasks = () => {
  const [filters, setFilters] = useState<TaskFiltersType>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: tasks, isLoading } = useMyTasks(filters);
  const { teams } = useTeams();
  const { createTask, isCreating, updateTaskStatus } = useTaskMutations();

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await updateTaskStatus(taskId, { status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const pendingTasks = tasks?.filter((t) => t.status === 'pending') || [];
  const inProgressTasks = tasks?.filter((t) => t.status === 'in_progress') || [];
  const completedTasks = tasks?.filter((t) => t.status === 'completed') || [];

  return (
    <DashboardLayout>
      <PageContainer
        title="My Tasks"
        description="View and manage all your assigned tasks"
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
        }
      >
        {showFilters && (
          <TaskFilters filters={filters} onFiltersChange={setFilters} />
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : !tasks || tasks.length === 0 ? (
          <EmptyState
            icon={CheckSquare}
            title="No tasks found"
            description={
              Object.keys(filters).length > 0
                ? 'No tasks match your current filters'
                : "You don't have any tasks assigned yet"
            }
            action={
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Task
              </Button>
            }
          />
        ) : (
          <div>
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{pendingTasks.length}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{inProgressTasks.length}</p>
                <p className="text-sm text-blue-800">In Progress</p>
              </div>
              <div className="bg-green-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{completedTasks.length}</p>
                <p className="text-sm text-green-800">Completed</p>
              </div>
            </div>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <TaskCard 
                  key={task.uuid} 
                  task={task}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>
        )}

        <CreateTaskModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={createTask}
          teams={teams}
          isLoading={isCreating}
        />
      </PageContainer>
    </DashboardLayout>
  );
};
