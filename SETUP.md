# Taskzilla Frontend - Setup Guide

This guide will help you set up and run the Taskzilla frontend application.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- A running instance of the Taskzilla Laravel backend

## Installation Steps

### 1. Install Dependencies

```bash
cd taskzilla-frontend
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### 2. Configure Environment Variables

The `.env` file should already exist with the default configuration:

```env
VITE_API_URL=http://127.0.0.1:8002/api
VITE_APP_NAME=Taskzilla
```

**Important:** Make sure the `VITE_API_URL` matches your Laravel backend URL.

### 3. Start the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
taskzilla-frontend/
├── public/              # Static assets
├── src/
│   ├── api/            # API client and endpoints
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Page layouts
│   ├── pages/          # Application pages
│   ├── store/          # Zustand state management
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Application entry point
│   └── router.tsx      # Route definitions
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Features Implemented

✅ **Authentication**
- Login with email and password
- User registration
- Persistent sessions with JWT tokens
- Protected routes

✅ **Team Management**
- View all teams
- Create new teams
- View team details with members and tasks
- Delete teams (admin only)

✅ **Task Management**
- Create tasks with title, description, priority, status, and due date
- View all assigned tasks
- Filter tasks by status, priority, and due date
- Task cards with visual priority and status indicators
- Overdue task warnings

✅ **Team Invitations**
- Send email invitations to team members
- View pending invitations
- Accept/decline invitations
- Notification badge for pending invites

✅ **Dashboard**
- Welcome message with user info
- Statistics cards (teams, tasks, in progress, completed)
- Quick access to teams and recent tasks
- Activity overview

✅ **Modern UI/UX**
- Responsive design (mobile, tablet, desktop)
- Gradient accents and soft shadows
- Smooth animations and transitions
- Loading states and empty states
- Toast notifications for user feedback

## Default Credentials

For testing, you can use these credentials (if seeded in your backend):

```
Email: admin@example.com
Password: password
```

## Troubleshooting

### Backend Connection Issues

If you're getting network errors:

1. Verify the backend is running at `http://127.0.0.1:8002`
2. Check CORS settings in your Laravel backend
3. Ensure `.env` has the correct `VITE_API_URL`

### Build Errors

If you encounter build errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. You can also specify a custom port in `vite.config.ts`:

```typescript
server: {
  port: 3000, // Your preferred port
}
```

## Production Build

To create a production-ready build:

```bash
npm run build
```

The optimized files will be in the `dist/` directory. You can preview the production build:

```bash
npm run preview
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Zustand** - State management
- **TanStack Query (React Query)** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Framer Motion** - Animations
- **Headless UI** - Accessible components
- **React Hot Toast** - Toast notifications

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify the backend is running and accessible
3. Check the network tab in DevTools for API responses
4. Ensure all dependencies are installed correctly

---

**Happy coding! 🦖**
