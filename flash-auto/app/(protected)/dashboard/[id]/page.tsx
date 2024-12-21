'use client'
import CustomLoading from '@/app/components/utils/CustomLoading';
import CustomError from '@/app/components/utils/CustomError';
import { useEffect } from 'react';
import Custom404 from '@/app/components/utils/Custom404';
import AdminDashboard from '@/app/components/admin/AdminDashboard';
import UserDashboard from '@/app/components/user/UserDashboard';
import SuperAdminDashboard from '@/app/components/superadmin/SuperAdminDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const authState = useSelector(authSelector)

  switch(authState.role){
    case 'user':
      return <UserDashboard id={authState.id!}  />
    case 'admin':
      return <AdminDashboard id={authState.id!} />
    case 'super-admin':
      return <SuperAdminDashboard id={authState.id!}  />
    default:
      return <Custom404 />
    }
  
};

export default Dashboard;
