import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import Searchbar from './Searchbar';
import Notification from './Notification';
import Logo from './Logo';
import { usePathname } from 'next/navigation';
import { useGetCurrentUserQuery } from '@/redux/api/authApi';
import { CustomSerializedError } from '@/types/CustomSerializedError';
import { useDispatch } from 'react-redux'
import { clearAuth } from '@/redux/slices/authSlice'
const Header = () => {
  const path = usePathname()
  const {isLoading, isSuccess, isError, error, data} = useGetCurrentUserQuery()
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if(isError && (error as CustomSerializedError).data.message === "Access denied. No token provided."){
  //     console.log('error', error)
  //     dispatch(clearAuth())
  //   }

  // }, [])

  return (
    <div className="bg-white border-b border-gray-200  z-50  h-20 w-full sticky top-0 flex justify-between px-4  items-center ">
      {path == '/' && <Logo /> }

      <Searchbar />

      <div className='flex flex-row items-center gap-4'>
        <Notification />
        { isSuccess && <Profile user={data.data!} /> }
      </div>
    </div>
  );
};

export default Header;
