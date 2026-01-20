import { format, formatDistanceToNow, isAfter, parseISO } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'MMM dd, yyyy');
  } catch {
    return 'Invalid date';
  }
};

export const formatDateTime = (date: string | Date): string => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'MMM dd, yyyy h:mm a');
  } catch {
    return 'Invalid date';
  }
};

export const formatRelativeTime = (date: string | Date): string => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  } catch {
    return 'Invalid date';
  }
};

export const isOverdue = (dueDate: string | Date): boolean => {
  try {
    const parsedDate = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
    return isAfter(new Date(), parsedDate);
  } catch {
    return false;
  }
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const pluralize = (count: number, singular: string, plural?: string): string => {
  if (count === 1) return `${count} ${singular}`;
  return `${count} ${plural || singular + 's'}`;
};
