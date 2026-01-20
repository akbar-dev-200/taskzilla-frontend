import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/common/Modal';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { Select } from '@/components/common/Select';
import { Button } from '@/components/common/Button';
import { createTaskSchema } from '@/utils/validators';
import { CreateTaskData } from '@/types/task';
import { Team } from '@/types/team';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskData) => Promise<void>;
  teams: Team[];
  defaultTeamId?: string;
  isLoading?: boolean;
}

export const CreateTaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  teams,
  defaultTeamId,
  isLoading = false,
}: CreateTaskModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      team_id: defaultTeamId || '',
      priority: 'medium',
      status: 'pending',
    },
  });

  const handleFormSubmit = async (data: CreateTaskData) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Task" size="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Task Title"
          placeholder="Implement user authentication"
          error={errors.title?.message}
          {...register('title')}
        />

        <Textarea
          label="Description"
          placeholder="Detailed description of the task..."
          rows={4}
          error={errors.description?.message}
          {...register('description')}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Team"
            options={[
              { value: '', label: 'Select a team' },
              ...teams.map((team) => ({
                value: team.uuid,
                label: team.name,
              })),
            ]}
            error={errors.team_id?.message}
            {...register('team_id')}
          />

          <Select
            label="Priority"
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
            error={errors.priority?.message}
            {...register('priority')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Status"
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
            ]}
            error={errors.status?.message}
            {...register('status')}
          />

          <Input
            label="Due Date"
            type="date"
            error={errors.due_date?.message}
            {...register('due_date')}
          />
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};
