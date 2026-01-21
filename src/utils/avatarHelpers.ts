/**
 * Avatar Helper Functions
 * Use these to debug and test avatar functionality
 */

import { storage } from './storage';
import { AUTH_USER_KEY } from './constants';
import { User } from '@/types/user';

/**
 * Get the full avatar URL from a potentially relative path
 */
export const getFullAvatarUrl = (avatarUrl?: string): string | null => {
  if (!avatarUrl) return null;

  // If it's already a full URL (http:// or https://), return as is
  if (avatarUrl.startsWith('http://') || avatarUrl.startsWith('https://')) {
    return avatarUrl;
  }

  // If it's a data URL, return as is
  if (avatarUrl.startsWith('data:')) {
    return avatarUrl;
  }

  // If it's a relative URL starting with /, prepend the backend base URL
  if (avatarUrl.startsWith('/')) {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8002/api';
    const baseUrl = apiUrl.replace('/api', ''); // Remove /api from the end
    return `${baseUrl}${avatarUrl}`;
  }

  // Otherwise assume it's a relative path and prepend base URL
  const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8002/api';
  const baseUrl = apiUrl.replace('/api', '');
  return `${baseUrl}/${avatarUrl}`;
};

/**
 * Get placeholder avatar URL from UI Avatars service
 */
export const getPlaceholderAvatar = (name: string, bgColor = '7c3aed'): string => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bgColor}&color=fff&size=128&bold=true`;
};

/**
 * Debug function - Log current user's avatar information
 */
export const debugUserAvatar = (): void => {
  const user = storage.get<User>(AUTH_USER_KEY);
  const zustandAuth = storage.get<any>('taskzilla-auth');

  console.group('🎨 Avatar Debug Information');
  console.log('User from localStorage:', user);
  console.log('Avatar URL (raw):', user?.avatar_url);
  console.log('Avatar URL (full):', getFullAvatarUrl(user?.avatar_url));
  console.log('Zustand Auth Store:', zustandAuth?.state?.user);
  console.log('Placeholder URL:', getPlaceholderAvatar(user?.name || 'User'));
  console.groupEnd();
};

/**
 * Test function - Set a test avatar URL
 */
export const setTestAvatar = (url: string): void => {
  const user = storage.get<User>(AUTH_USER_KEY);
  if (user) {
    user.avatar_url = url;
    storage.set(AUTH_USER_KEY, user);
    
    // Also update Zustand store
    const zustandAuth = storage.get<any>('taskzilla-auth');
    if (zustandAuth?.state?.user) {
      zustandAuth.state.user.avatar_url = url;
      storage.set('taskzilla-auth', zustandAuth);
    }
    
    console.log('✅ Test avatar set to:', url);
    console.log('🔄 Refresh the page to see changes');
  } else {
    console.error('❌ No user found in localStorage');
  }
};

// Export for window debugging in development
if (process.env.NODE_ENV === 'development') {
  (window as any).avatarDebug = {
    debug: debugUserAvatar,
    setTest: setTestAvatar,
    getFullUrl: getFullAvatarUrl,
    getPlaceholder: getPlaceholderAvatar,
  };
  
  console.log('🔧 Avatar Debug Tools Available:');
  console.log('  window.avatarDebug.debug()       - Show avatar info');
  console.log('  window.avatarDebug.setTest(url)  - Set test avatar URL');
  console.log('  window.avatarDebug.getFullUrl(url) - Convert to full URL');
}
