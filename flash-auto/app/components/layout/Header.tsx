'use client'
import { useSession } from 'next-auth/react';
import AuthHeader from './AuthHeader';
import Link from 'next/link';
import { FiMenu } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { toggle } from '@/redux/slices/sideBarSlice';

const Header = () => {
  const session = useSession()
  const dispatch = useDispatch()

  return (
    <div className="flex items-center justify-between h-20 bg-white shadow-md px-4">
      <div className='flex gap-4 items-center'>
        <FiMenu onClick={() => dispatch(toggle())} className='w-8 h-8 hover:cursor-pointer' />
        <div className="text-2xl text-red-400">
          <img src="/logo-1.ico" className='w-20 h-20' alt="" />
        </div>
      </div>

      <nav className='flex justify-between gap-12'>
        <Link className='hover:text-red-400 hover:underline hover:underline-offset-8' href='/post'>post</Link>
        <Link className='hover:text-red-400 hover:underline hover:underline-offset-8' href='/rent'>rent</Link>
        <Link className='hover:text-red-400 hover:underline hover:underline-offset-8' href='/discover'>discover</Link>
     
      </nav>

      { session.status === 'authenticated' ? (
        <AuthHeader />
      ) : (
        <div className="flex gap-2">
          <Link href="/auth/signup" className="px-4 py-2 rounded-full bg-red-400 text-white hover:bg-white hover:border hover:border-red-400 hover:text-red-400">
            Signup
          </Link>
          <Link href="/auth/signin" className="px-4 py-2 rounded-full bg-white border border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
            Signin
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
