import { HTMLAttributes, useState } from 'react';
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
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl',
  };

  // Helper to construct full image URL
  const getImageUrl = (url: string | undefined) => {
    if (!url) return null;
    
    // If it's already a full URL (http:// or https://), return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // If it's a relative URL starting with /, prepend the API base URL
    if (url.startsWith('/')) {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8002/api';
      const baseUrl = apiUrl.replace('/api', ''); // Remove /api from the end
      return `${baseUrl}${url}`;
    }
    
    // Otherwise return as is (might be a data URL or relative path)
    return url;
  };

  const imageUrl = getImageUrl(src);
  const showImage = imageUrl && !imageError;

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    if (src && !imageUrl) {
      console.log('Avatar Debug - Invalid URL:', { src, name });
    }
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-bold overflow-hidden flex-shrink-0',
        'bg-gradient-to-br from-primary-500 to-primary-700 text-white',
        sizes[size],
        className
      )}
      title={name}
      {...props}
    >
      {showImage ? (
        <>
          {/* Show initials while loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              {getInitials(name)}
            </div>
          )}
          {/* Image */}
          <img
            src={imageUrl}
            alt={name}
            className={cn(
              'w-full h-full object-cover',
              !imageLoaded && 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              console.warn(`Failed to load avatar image: ${imageUrl}`);
              setImageError(true);
            }}
            crossOrigin="anonymous" // Handle CORS for external images
          />
        </>
      ) : (
        getInitials(name)
      )}
    </div>
  );
};
