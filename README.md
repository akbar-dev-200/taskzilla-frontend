# Taskzilla Frontend 🦖

A modern, professional task management application built with React, TypeScript, and Tailwind CSS.

## Features

- 🔐 **Authentication** - Secure login and registration
- 👥 **Team Management** - Create and manage teams
- ✅ **Task Management** - Create, assign, and track tasks
- 📧 **Invitations** - Invite team members via email
- 📊 **Dashboard** - Overview of tasks and teams
- 🎨 **Modern UI** - Beautiful, responsive design
- 🌙 **Dark Mode Ready** - Prepared for theme switching
- ♿ **Accessible** - WCAG compliant components

## Tech Stack

- **React 18+** with TypeScript
- **Vite** - Lightning fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Zustand** - State management
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Framer Motion** - Animations
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://127.0.0.1:8002/api
VITE_APP_NAME=Taskzilla
```

## Project Structure

```
src/
├── api/              # API layer
├── assets/           # Static assets
├── components/       # Reusable components
│   ├── common/      # Generic UI components
│   ├── layout/      # Layout components
│   └── features/    # Feature-specific components
├── hooks/           # Custom React hooks
├── layouts/         # Page layouts
├── pages/           # Route pages
├── store/           # Global state
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The frontend connects to the Laravel backend API. Make sure the backend is running at `http://127.0.0.1:8002`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - feel free to use this project for learning or production.

---

Built with ❤️ for productive teams
