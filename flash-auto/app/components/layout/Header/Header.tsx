import React, { useState } from 'react';
import Profile from './Profile';
import Searchbar from './Searchbar';
import Notification from './Notification';
import Logo from './Logo';
import { usePathname } from 'next/navigation';
const Header = () => {
  const path = usePathname()
  return (
    <div className="bg-white border-b border-gray-200  z-50  h-16 w-full sticky top-0 flex justify-between px-4  items-center ">
      {path == '/' && <Logo /> }

      <Searchbar />

      <div className='flex flex-row items-center gap-4'>
        <Notification />
        <Profile /> 
      </div>
    </div>
  );
};

export default Header;
