'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import InputField from "../common/Forms/InputField";
import ErrorAlert from "../common/Forms/ErrorAlert";
import Logo from '../layout/Header/Logo';
import Button from '../common/Forms/Button';
import { useForm, SubmitHandler } from 'react-hook-form';

interface SignInFormData {
  email: string;
  password: string;

}

const SignIn = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting, isLoading } } = useForm<SignInFormData>();
  const [error, setError] = useState<string>('');


  const handleGoogleSignIn = async () => {
 
  };

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white shadow-md rounded-lg flex flex-col justify-center py-12 sm:px-6 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Logo />
        <h2 className=" text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account

        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            create a new account
          </Link>
        </p>
      </div>


      <div className="mt-8 sm:mx-auto sm:w-full  sm:max-w-md sm:px-6">
          {error && <ErrorAlert message={error} />}

          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="bg-white text-gray-700 hover:bg-gray-50"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Sign in with Google
          </Button>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>

            <InputField
                id="email"
                label="email"
                type="email"
                placeholder="Enter your email"
                icon={HiOutlineMail}
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
              />

              <InputField
                  id="password"
                  label="Password"
                  type="password"
                  icon={RiLockPasswordLine}
                  error={errors.password?.message}
                  {...register('password', { required: 'Password is required' })}
                />

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
               
                <Button
                  type='submit'
                  disabled={isLoading}
                  className="bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </div>
            </form>
          </div>
      </div>
    </div>
  );
};

export default SignIn;
