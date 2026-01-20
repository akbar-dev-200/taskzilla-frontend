import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { getInitials } from '@/utils/formatters';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar = ({
  src,
  name,
  size = 'md',
  className,
  ...props
}: AvatarProps) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl',
  };

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-bold overflow-hidden',
        'bg-gradient-to-br from-primary-500 to-primary-700 text-white',
        sizes[size],
        className
      )}
      title={name}
      {...props}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        getInitials(name)
      )}
    </div>
  );
};
