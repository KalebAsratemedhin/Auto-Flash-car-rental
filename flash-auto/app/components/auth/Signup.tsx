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

import {useRegisterMutation} from '@/redux/api/authApi';
import TextField from '../utils/TextField';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignUpFormData>();
  const [error, setError] = useState<string>('');
  const [signup, {isLoading, isSuccess, isError, error: signupError, data}] = useRegisterMutation();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      console.log('signup', data)
      // register()
      await signup(data)
    } catch (err) {
      setError(error);
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

              <TextField
                label="FirstName"
                id="firstName"
                type="text"
                placeholder="First name"
                icon={HiOutlineUser}
                register={register}
                validation={{ required: "First name is required" }}
                error={errors.firstName?.message}
              />

              <TextField
                label="Last Name"
                id="lastName"
                type="text"
                placeholder="Last name"
                icon={HiOutlineUser}
                register={register}
                validation={{ required: "Last name is required" }}
                error={errors.lastName?.message}
              />      

              </div>

              <TextField
                label="Email"
                id="email"
                type="email"
                register={register}
                validation={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email"
                  }
                }}
                error={errors.email?.message}
                placeholder="Enter your email"
                icon={HiOutlineMail}
                
              />

              <TextField
                label="Phone Number"
                id="phoneNumber"
                type="text"
                register={register}
                validation={{ 
                  required: "Phone Number is required",
                  validate: (value: string) => {
                    return (value as string).length >= 10 || 'Phone number must be at least 10 digits';
                  }  
                 }}
                error={errors.phoneNumber?.message}
                
                placeholder="Enter your phone"
                icon={HiOutlineMail}

              />

              <TextField
                label="Password"
                id="password"
                type="password"
                register={register}
                validation={{
                  required: "Password is required",
                  validate: (value: string) => {
                    if (value.length < 6) return "Password should not be shorter than six characters.";
                    return /[a-zA-Z]{1,}/.test(value) || 'Password must contain at least one letter';
                  }
                }}
                placeholder="Create a password"
                icon={RiLockPasswordLine}
                error={errors.password?.message}
              />


          
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                icon={RiLockPasswordLine}
                error={errors.confirmPassword?.message}
                register={register}
                validation={{
                  required: 'Confirm password is required',
                  validate: (value: string) => {value === watch('password') || 'Passwords do not match'}
                }}
              />

              <Checkbox
                id="agreeToTerms"
                label="I agree to the terms and conditions"
                link="/terms"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
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

