'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '../layout/Header/Logo';
import ErrorAlert from '../common/Forms/ErrorAlert';
import Checkbox from '../common/Forms/Checkbox';
import InputField from '../common/Forms/InputField';
import Button from '../common/Forms/Button';

import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail, HiOutlineUser } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

import { useForm, SubmitHandler } from 'react-hook-form';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignUpFormData>();
  const [error, setError] = useState<string>('');

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      // Submit logic here
      console.log(data);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleGoogleSignUp = async () => {
  };

  return (
    <div className="min-h-screen bg-white shadow-md rounded-lg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Logo />
        <h2 className=" text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-10">
          <ErrorAlert message={error} />

          <Button
            onClick={handleGoogleSignUp}
            disabled={isSubmitting}
            className="bg-white text-gray-700 hover:bg-gray-50"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Sign up with Google
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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InputField
                  id="firstName"
                  label="firstName"
                  type="text"
                  placeholder="First name"
                  icon={HiOutlineUser}
                  error={errors.firstName?.message}
                  {...register('firstName', { required: 'First name is required' })}
                />
                <InputField
                  id="lastName"
                  label="lastName"
                  type="text"
                  placeholder="Last name"
                  icon={HiOutlineUser}
                  error={errors.lastName?.message}
                  {...register('lastName', { required: 'Last name is required' })}
                />
              </div>

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
                id="phone"
                label="Phone"
                type="text"
                placeholder="Enter your phone"
                icon={HiOutlineMail}
                error={errors.email?.message}
                {...register('phone', {
                  required: 'Phone number is required',
                  validate: (value) => {
                    return (value as string).length >= 10 || 'Phone number must be at least 10 digits';
                  }
                })}
              />

              <InputField
                id="password"
                label="password"
                type="password"
                placeholder="Create a password"
                icon={RiLockPasswordLine}
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
              />
              <InputField
                id="confirmPassword"
                label="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                icon={RiLockPasswordLine}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (value) => value === watch('password') || 'Passwords do not match',
                })}
              />

              <Checkbox
                id="agreeToTerms"
                label="I agree to the"
                link="/terms"
                checked={false}
                error={errors.agreeToTerms?.message}
                {...register('agreeToTerms', { required: 'You must agree to the terms' })}
              />

              <Button
                type='submit'
                disabled={isSubmitting}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </div>
      </div>
    </div>
  );
};

export default SignUp;

