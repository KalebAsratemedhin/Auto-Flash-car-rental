'use client'
import AuthHeader from './AuthHeader';
import Link from 'next/link';

const Header = () => {
  const token = localStorage.getItem('accessToken');

  return (
    <div className="flex items-center justify-between h-20 bg-white shadow-md px-4">
      <div className="text-2xl text-red-400">
        <h1>AutoFlash</h1>
      </div>

      <nav className='flex justify-between gap-12'>
        <Link className='hover:text-red-400 hover:underline hover:underline-offset-8' href='/post'>post</Link>
        <Link className='hover:text-red-400 hover:underline hover:underline-offset-8' href='/rent'>rent</Link>
        <Link className='hover:text-red-400 hover:underline hover:underline-offset-8' href='/discover'>discover</Link>
     
      </nav>

      {token ? (
        <AuthHeader />
      ) : (
        <div className="flex gap-2">
          <Link href="/signup" className="px-4 py-2 rounded-full bg-red-400 text-white hover:bg-white hover:border hover:border-red-400 hover:text-red-400">
            Signup
          </Link>
          <Link href="/signin" className="px-4 py-2 rounded-full bg-white border border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
            Signin
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
