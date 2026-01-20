import { Link, useLocation } from 'react-router-dom';
import { Home, Users, CheckSquare, Mail, X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/utils/constants';

const navigation = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: Home },
  { name: 'Teams', href: ROUTES.TEAMS, icon: Users },
  { name: 'My Tasks', href: ROUTES.MY_TASKS, icon: CheckSquare },
  { name: 'Invitations', href: ROUTES.MY_INVITES, icon: Mail },
];

export const Sidebar = () => {
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50 transition-transform duration-300',
          'lg:translate-x-0 lg:static',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Close button (mobile) */}
          <div className="lg:hidden flex justify-end p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                    isActive
                      ? 'bg-gradient-to-r from-primary-600 to-primary-end text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2026 Taskzilla
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
