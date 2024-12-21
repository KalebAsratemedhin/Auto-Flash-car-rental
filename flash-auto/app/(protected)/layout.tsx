'use client'

import Sidebar from '@/app/components/layout/Sidebar'
import Footer from '@/app/components/layout/Footer'
import Header from '@/app/components/layout/Header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, getAuth } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
import { isLoggedIn } from '@/utils/authUtils'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const authState = useSelector(authSelector)
    const dispatch = useDispatch()
    const navigate = useRouter()


    useEffect(() => {

      const loggedIn = isLoggedIn()

      if(!loggedIn){
        navigate.push('/')
      }
      
      if(loggedIn)(
        dispatch(getAuth())
      )

    }, [isLoggedIn])


    return (
      <div className="flex">
        <div className=" border-gray-200 border-r">
          <Sidebar />
        </div>
  
        <div className="max-h-screen  bg-lavender dark:bg-black dark:text-white overflow-y-auto">
          <Header />
          <div className="">{children}</div>
          <Footer />
        </div>
      </div>
    );
  
}

export default layout