'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from '@/app/components/layout/Sidebar'
import Footer from '@/app/components/layout/Footer'
import Header from '@/app/components/layout/Header/Header'


const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    return (
      <div className="grid grid-cols-11">
        <div className="col-span-2 bg-white border-gray-200 border-r">
          <Sidebar />
        </div>
  
        <div className="col-span-9 max-h-screen bg-lavender dark:bg-black dark:text-white overflow-y-auto">
          <Header />
          <div className="">{children}</div>
          <Footer />
        </div>
      </div>
    );
  
}

export default layout