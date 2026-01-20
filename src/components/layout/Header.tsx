import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, LogOut, User, Settings, Menu as MenuIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUIStore } from '@/store/uiStore';
import { Avatar } from '@/components/common/Avatar';
import { Badge } from '@/components/common/Badge';
import { APP_NAME } from '@/utils/constants';
import { useMyPendingInvites } from '@/hooks/useInvites';

export const Header = () => {
  const { user, logout } = useAuth();
  const { toggleSidebar } = useUIStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: pendingInvites } = useMyPendingInvites();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Logo & Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-end flex items-center justify-center">
              <span className="text-white font-bold text-lg">🦖</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-end bg-clip-text text-transparent">
              {APP_NAME}
            </span>
          </Link>
        </div>

        {/* Right: Notifications & User */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Link
            to="/invites"
            className="relative text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Bell className="w-6 h-6" />
            {pendingInvites && pendingInvites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {pendingInvites.length}
              </span>
            )}
          </Link>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
            >
              <Avatar src={user?.avatar_url} name={user?.name || 'User'} size="sm" />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
