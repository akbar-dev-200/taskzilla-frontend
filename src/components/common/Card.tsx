import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({
  children,
  hover = false,
  padding = 'md',
  className,
  ...props
}: CardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-card border border-gray-100 shadow-soft',
        hover && 'hover:shadow-soft-lg hover:scale-[1.02] transition-all cursor-pointer',
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
