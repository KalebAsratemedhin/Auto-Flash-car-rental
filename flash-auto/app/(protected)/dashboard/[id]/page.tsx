'use client'
import CustomLoading from '@/app/components/utils/CustomLoading';
import CustomError from '@/app/components/utils/CustomError';
import { useSession } from 'next-auth/react';
import Custom404 from '@/app/components/utils/Custom404';
import AdminDashboard from '@/app/components/admin/AdminDashboard';
import UserDashboard from '@/app/components/user/UserDashboard';
import SuperAdminDashboard from '@/app/components/superadmin/SuperAdminDashboard';

const Dashboard = () => {
  const role = 'user';
  // const { data: session, status } = useSession();

  // if (status === 'unauthenticated') {
  //   return <Custom404 />;
  // }
  // if (status === 'loading') {
  //   return <CustomLoading />;
  // }

  // if (status === 'authenticated') {


  switch(role){
    case 'user':
      return <UserDashboard  />
    case 'admin':
      return <AdminDashboard  />
    case 'super-admin':
      return <SuperAdminDashboard  />
    default:
      return <Custom404 />
    }
  
};

export default Dashboard;
