import { useEffect, useState } from 'react';

import Button from 'components/shared/Button';
import Link from 'next/link';
import { useAuth } from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useToast } from 'hooks/useToast';

interface LoginData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();
  const { addToast } = useToast();
  const { user, signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      push('/dashboard');
    }
  }, [user, push]);

  const onSubmit = (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    signIn(data).then((response: { error?: { message: string } }) => {
      setIsLoading(false);
      if (response?.error) {
        setError(response.error);
      } else {
        push('/dashboard');
        addToast({
          title: 'Welcome back!👋',
          description: 'You are successfully signed in.',
          type: 'success',
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error?.message && (
        <div className="p-2 mb-4 text-center text-red-500 border border-red-600 border-dashed rounded">
          <span>{error.message}</span>
        </div>
      )}
      <div className="rounded-md">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="email"
            className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            type="email"
            name="email"
            {...register('email', {
              required: 'Please enter an email',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Not a valid email',
              },
            })}
          />
          {errors.email && (
            <div className="mt-2 text-xs text-red-600">
              {errors.email.message}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="password"
            className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            type="password"
            name="password"
            {...register('password', {
              required: 'Please enter a password',
              minLength: {
                value: 6,
                message: 'Should have at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <div className="mt-2 text-xs text-red-600">
              {errors.password.message}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-end mt-4">
        <div className="text-sm leading-5">
          <Link href="/reset-password">
            <a
              href="#"
              className="font-medium transition duration-150 ease-in-out text-royal-blue-600 hover:text-royal-blue-500 focus:outline-none focus:underline"
            >
              Forgot your password?
            </a>
          </Link>
        </div>
      </div>

      <div className="mt-4">
        <span className="block w-full rounded-md shadow-sm">
          <Button title="Login" type="submit" isLoading={isLoading} />
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
