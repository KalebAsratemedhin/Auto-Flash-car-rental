'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import TextField from '../utils/TextField';
import ErrorAlert from "../common/Forms/ErrorAlert";
import Logo from '../layout/Header/Logo';
import Button from '../common/Forms/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSigninMutation} from '@/redux/api/authApi';
import CustomError from '../utils/CustomError';
import { SignInFormData } from '@/types/user';
import { authSelector, setAuth } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";


const SignIn = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignInFormData>();
  const [error, setError] = useState<string>('');
  const [signin, {isLoading, isSuccess, isError, error: signinError, data}] = useSigninMutation();
  const authState = useSelector(authSelector)
  const dispatch = useDispatch()
  const navigate = useRouter()

  const handleGoogleSignIn = async () => {
 
  };

  const onSubmit: SubmitHandler<SignInFormData> = async (data ) => {
    const res = await signin(data)
    
  };


    useEffect(() => {
      if(isSuccess){
          console.log('just success', data)
          dispatch(setAuth(data.data))

      }
      if(authState.id){
          console.log(authState.id, 'email', authState.role)
          navigate.push(`/dashboard/${authState.id}`)
      }

  }, [isSuccess, authState])

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
          {/* {error && <ErrorAlert message={error} />} */}

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
              {isError && <CustomError error={signinError} /> }

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
