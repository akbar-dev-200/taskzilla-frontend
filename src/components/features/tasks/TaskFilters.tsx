import { Select } from '@/components/common/Select';
import { Input } from '@/components/common/Input';
import { TaskFilters as TaskFiltersType } from '@/types/task';

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: TaskFiltersType) => void;
}

export const TaskFilters = ({ filters, onFiltersChange }: TaskFiltersProps) => {
  const handleFilterChange = (key: keyof TaskFiltersType, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  return (
    <div className="bg-white p-4 rounded-card border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search tasks..."
          value={filters.search || ''}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />

        <Select
          options={[
            { value: '', label: 'All Status' },
            { value: 'pending', label: 'Pending' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'completed', label: 'Completed' },
          ]}
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        />

        <Select
          options={[
            { value: '', label: 'All Priority' },
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          value={filters.priority || ''}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        />

        <Input
          type="date"
          placeholder="Due date"
          value={filters.due_date_from || ''}
          onChange={(e) => handleFilterChange('due_date_from', e.target.value)}
        />
      </div>
    </div>
  );
};
