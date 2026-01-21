import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema } from '@/utils/validators';
import { RegisterData } from '@/types/auth';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ROUTES } from '@/utils/constants';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      await registerUser(data);
      // Show success message and navigate to login
      toast.success('🎉 Account created successfully! Please login to continue.', {
        duration: 4000,
      });
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 2000); // Give user time to see the success message
    } catch (error: any) {
      console.error('Registration error:', error);
      // Show error toast for validation errors
      if (error?.message) {
        toast.error(error.message);
      } else if (error?.errors) {
        // Show first validation error
        const firstError = Object.values(error.errors)[0] as string[];
        if (firstError?.[0]) {
          toast.error(firstError[0]);
        }
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
          <p className="mt-2 text-gray-600">Join Taskzilla today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            helperText="At least 6 characters"
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.password_confirmation?.message}
            {...register('password_confirmation')}
          />

          <Button type="submit" fullWidth isLoading={isLoading}>
            Create account
          </Button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};
