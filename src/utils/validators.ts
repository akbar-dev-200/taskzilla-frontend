import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ['password_confirmation'],
});

export const createTeamSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters').max(100),
});

export const updateTeamSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters').max(100),
});

export const createTaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(255),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
  due_date: z.string().optional(),
  team_id: z.string().min(1, 'Team is required'),
  assignee_ids: z.array(z.string()).optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(255).optional(),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
  due_date: z.string().optional(),
});

export const sendInvitationsSchema = z.object({
  team_id: z.string().min(1, 'Team is required'),
  emails: z.array(z.string().email('Invalid email address')).min(1, 'At least one email is required'),
  role: z.string().optional(),
});

export const isValidEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};
