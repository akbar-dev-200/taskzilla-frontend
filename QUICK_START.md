# 🚀 Taskzilla Frontend - Quick Start Guide

## Installation & Running

### 1️⃣ Install Dependencies
```bash
cd /Users/muhammadakbar/workspace/taskzilla-frontend
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
```
http://localhost:5173
```

## 📋 Prerequisites Checklist

- [ ] Node.js v18+ installed
- [ ] Backend running at `http://127.0.0.1:8002`
- [ ] Backend CORS configured for `http://localhost:5173`

## 🎯 Test the Application

### Register a New Account
1. Go to http://localhost:5173
2. Click "Sign up"
3. Fill in the registration form
4. You'll be auto-logged in and redirected to the dashboard

### Create Your First Team
1. Click "Create Team" button
2. Enter team name
3. Submit

### Invite Team Members
1. Open team details
2. Click "Invite" button
3. Enter email addresses
4. Send invitations

### Create a Task
1. Click "New Task" button
2. Fill in task details:
   - Title (required)
   - Description
   - Priority (Low/Medium/High)
   - Status (Pending/In Progress/Completed)
   - Due date
   - Team (required)
3. Submit

## 🔧 Configuration

### Environment Variables (`.env`)
```env
VITE_API_URL=http://127.0.0.1:8002/api
VITE_APP_NAME=Taskzilla
```

**Note:** If your backend runs on a different port, update `VITE_API_URL`

## 📱 Features to Explore

### Dashboard
- View statistics (teams, tasks, status counts)
- Quick access to teams and recent tasks

### Teams Page
- View all teams in a grid
- Create new teams
- Access team details

### Team Details
- View team members
- See team statistics
- Create tasks for the team
- Invite new members

### My Tasks
- View all assigned tasks
- Filter by status, priority, due date
- Search tasks
- See overdue warnings

### Invitations
- View pending invitations
- Accept team invitations
- See invitation expiry dates

## 🎨 UI Features

- **Responsive Design** - Works on mobile, tablet, and desktop
- **Loading States** - Spinners while data loads
- **Empty States** - Helpful messages when no data
- **Toast Notifications** - Success/error messages
- **Form Validation** - Inline error messages
- **Smooth Animations** - Transitions and hover effects

## 🐛 Troubleshooting

### Backend Connection Error
```
Error: Network Error
```
**Fix:** Make sure backend is running at `http://127.0.0.1:8002`

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Fix:** Add this to your Laravel backend `.env`:
```
FRONTEND_URL=http://localhost:5173
```

And in `config/cors.php`:
```php
'allowed_origins' => [
    env('FRONTEND_URL', 'http://localhost:5173'),
],
```

### Port Already in Use
```
Port 5173 is already in use
```
**Fix:** Vite will automatically use the next available port (5174, 5175, etc.)

### Module Not Found
```
Cannot find module...
```
**Fix:** Delete and reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📊 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

## 🔐 Default Test Credentials

If your backend has seed data, try:
```
Email: admin@example.com
Password: password
```

## 📁 Project Structure

```
src/
├── api/              # API client & endpoints
├── components/       # UI components
├── hooks/           # Custom React hooks
├── layouts/         # Page layouts
├── pages/           # Route pages
├── store/           # State management
├── types/           # TypeScript types
└── utils/           # Utilities
```

## 🎯 Key Files

- `src/App.tsx` - Main app component
- `src/router.tsx` - Route definitions
- `src/api/client.ts` - Axios configuration
- `src/store/authStore.ts` - Authentication state
- `tailwind.config.js` - Design system

## 💡 Pro Tips

1. **Use DevTools** - React DevTools and Redux DevTools for debugging
2. **Check Network Tab** - See API requests/responses
3. **Hot Module Replacement** - Changes update instantly
4. **TypeScript** - Hover over variables to see types
5. **Tailwind** - Use IntelliSense for class suggestions

## 🚢 Production Deployment

### Build
```bash
npm run build
```

### Deploy
Upload the `dist/` folder to your hosting service:
- Netlify
- Vercel
- AWS S3
- DigitalOcean App Platform
- GitHub Pages

### Environment Variables
Set these on your hosting platform:
```
VITE_API_URL=https://your-api-domain.com/api
VITE_APP_NAME=Taskzilla
```

## 📚 Documentation

- `README.md` - Project overview
- `SETUP.md` - Detailed setup instructions
- `PROJECT_OVERVIEW.md` - Complete feature list

## 🎉 You're All Set!

Your Taskzilla frontend is ready to use. Start by:
1. Registering an account
2. Creating a team
3. Inviting members
4. Creating tasks
5. Managing your workflow

**Enjoy using Taskzilla! 🦖**
