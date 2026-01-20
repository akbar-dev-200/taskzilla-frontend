import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { Dashboard } from '@/pages/dashboard/Dashboard';
import { Teams } from '@/pages/teams/Teams';
import { TeamDetails } from '@/pages/teams/TeamDetails';
import { MyTasks } from '@/pages/tasks/MyTasks';
import { MyInvites } from '@/pages/invites/MyInvites';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { ROUTES } from '@/utils/constants';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.TEAMS,
    element: (
      <ProtectedRoute>
        <Teams />
      </ProtectedRoute>
    ),
  },
  {
    path: '/teams/:uuid',
    element: (
      <ProtectedRoute>
        <TeamDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.MY_TASKS,
    element: (
      <ProtectedRoute>
        <MyTasks />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.MY_INVITES,
    element: (
      <ProtectedRoute>
        <MyInvites />
      </ProtectedRoute>
    ),
  },
]);
