import { Calendar, Flag, Clock } from 'lucide-react';
import { Task } from '@/types/task';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Avatar } from '@/components/common/Avatar';
import { formatDate, isOverdue } from '@/utils/formatters';
import {
  TASK_STATUS_LABELS,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_COLORS,
  TASK_PRIORITY_COLORS,
} from '@/utils/constants';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const isTaskOverdue = task.due_date && task.status !== 'completed' && isOverdue(task.due_date);

  return (
    <Card hover padding="md" onClick={onClick}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-gray-900 text-lg flex-1">{task.title}</h3>
          <Badge className={TASK_PRIORITY_COLORS[task.priority]}>
            <Flag className="w-3 h-3 mr-1" />
            {TASK_PRIORITY_LABELS[task.priority]}
          </Badge>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>
        )}

        {/* Status & Date */}
        <div className="flex items-center gap-3 text-sm">
          <Badge className={TASK_STATUS_COLORS[task.status]}>
            {TASK_STATUS_LABELS[task.status]}
          </Badge>
          {task.due_date && (
            <div
              className={`flex items-center gap-1 ${
                isTaskOverdue ? 'text-red-600' : 'text-gray-500'
              }`}
            >
              {isTaskOverdue ? (
                <Clock className="w-4 h-4" />
              ) : (
                <Calendar className="w-4 h-4" />
              )}
              <span className={isTaskOverdue ? 'font-medium' : ''}>
                {isTaskOverdue ? 'Overdue: ' : ''}
                {formatDate(task.due_date)}
              </span>
            </div>
          )}
        </div>

        {/* Team & Assignees */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {task.team && (
            <span className="text-xs text-gray-500">{task.team.name}</span>
          )}
          {task.assignees && task.assignees.length > 0 && (
            <div className="flex -space-x-2">
              {task.assignees.slice(0, 3).map((assignee) => (
                <Avatar
                  key={assignee.id}
                  src={assignee.avatar_url}
                  name={assignee.name}
                  size="sm"
                />
              ))}
              {task.assignees.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold border-2 border-white">
                  +{task.assignees.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
