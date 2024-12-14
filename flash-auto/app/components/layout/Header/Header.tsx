import React, { useState } from 'react';
import Profile from './Profile';
import Searchbar from './Searchbar';
import Notification from './Notification';
import Logo from './Logo';

const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200  z-50  h-16 w-full sticky top-0 flex justify-around px-4  items-center ">


      <Searchbar />

      <Notification />
      <Profile /> 
    </div>
  );
};

export default Header;
