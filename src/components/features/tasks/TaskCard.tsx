import { useState } from 'react';
import { Calendar, Flag, Clock, ChevronDown, CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import { Task, TaskStatus } from '@/types/task';
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
import { useAuth } from '@/hooks/useAuth';
import { useTaskMutations } from '@/hooks/useTasks';
import toast from 'react-hot-toast';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  canChangeStatus?: boolean;
}

export const TaskCard = ({ task, onClick, onStatusChange, canChangeStatus = true }: TaskCardProps) => {
  const { user } = useAuth();
  const { updateTaskStatus } = useTaskMutations();
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const isTaskOverdue = task.due_date && task.status !== 'completed' && isOverdue(task.due_date);

  // Check if user can change status (creator, team lead, or assignee)
  const isAssignee = task.assignees?.some((assignee) => assignee.id === user?.id);
  const isCreator = task.created_by === user?.id;
  const isTeamLead = task.team?.lead_id === user?.id;
  
  // Allow status change if user is creator, team lead, OR assignee
  const userCanChangeStatus = canChangeStatus && user && (
    isCreator || isTeamLead || isAssignee
  );

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('TaskCard Permission Check:', {
      taskId: task.uuid,
      taskTitle: task.title,
      userId: user?.id,
      createdBy: task.created_by,
      teamLeadId: task.team?.lead_id,
      isAssignee,
      isCreator,
      isTeamLead,
      hasOnStatusChange: !!onStatusChange,
      canChange: userCanChangeStatus,
    });
  }

  const statusOptions: { value: TaskStatus; label: string; icon: any; color: string }[] = [
    { value: 'pending', label: 'Pending', icon: Circle, color: 'text-gray-600' },
    { value: 'in_progress', label: 'In Progress', icon: PlayCircle, color: 'text-blue-600' },
    { value: 'completed', label: 'Completed', icon: CheckCircle2, color: 'text-green-600' },
  ];

  const handleStatusClick = (e: React.MouseEvent) => {
    if (userCanChangeStatus) {
      e.stopPropagation();
      setShowStatusMenu(!showStatusMenu);
    }
  };

  const handleStatusChange = async (e: React.MouseEvent, newStatus: TaskStatus) => {
    e.stopPropagation();
    
    try {
      // Use callback if provided, otherwise use hook directly
      if (onStatusChange) {
        await onStatusChange(task.uuid, newStatus);
      } else {
        // Fallback: use the mutation directly
        await updateTaskStatus(task.uuid, { status: newStatus });
        toast.success('Task status updated!');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update task status');
    }
    
    setShowStatusMenu(false);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Card hover padding="md" onClick={handleCardClick}>
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
          {/* Status Badge with Dropdown */}
          <div className="relative">
            <button
              onClick={handleStatusClick}
              disabled={!userCanChangeStatus}
              title={userCanChangeStatus ? 'Click to change status' : 'You cannot change this task status'}
              className={`${
                userCanChangeStatus 
                  ? 'cursor-pointer hover:opacity-80 hover:scale-105 transition-all' 
                  : 'cursor-default'
              }`}
            >
              <Badge className={`${TASK_STATUS_COLORS[task.status]} flex items-center gap-1 ${
                userCanChangeStatus ? 'ring-2 ring-offset-1 ring-transparent hover:ring-primary-300' : ''
              }`}>
                {TASK_STATUS_LABELS[task.status]}
                {userCanChangeStatus && <ChevronDown className="w-3 h-3 ml-1" />}
              </Badge>
            </button>

            {/* Status Dropdown */}
            {showStatusMenu && userCanChangeStatus && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowStatusMenu(false);
                  }}
                />
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  {statusOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={(e) => handleStatusChange(e, option.value)}
                        disabled={option.value === task.status}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors ${
                          option.value === task.status ? 'bg-gray-50 cursor-default' : ''
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${option.color}`} />
                        <span className={option.value === task.status ? 'font-medium' : ''}>
                          {option.label}
                        </span>
                        {option.value === task.status && (
                          <CheckCircle2 className="w-4 h-4 ml-auto text-primary-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

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
