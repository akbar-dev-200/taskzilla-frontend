import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/common/Modal';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { createTeamSchema } from '@/utils/validators';
import { CreateTeamData } from '@/types/team';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTeamData) => Promise<void>;
  isLoading?: boolean;
}

export const CreateTeamModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: CreateTeamModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTeamData>({
    resolver: zodResolver(createTeamSchema),
  });

  const handleFormSubmit = async (data: CreateTeamData) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Team" size="md">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Team Name"
          placeholder="Marketing Team"
          error={errors.name?.message}
          {...register('name')}
        />

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Create Team
          </Button>
        </div>
      </form>
    </Modal>
  );
};
