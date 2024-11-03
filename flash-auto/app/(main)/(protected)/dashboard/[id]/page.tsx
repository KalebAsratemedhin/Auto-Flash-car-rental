'use client'
import RentalsTable from '@/app/components/rent/RentalsTable';
import CarList from '@/app/components/post/CarList';
import CustomLoading from '@/app/components/utils/CustomLoading';
import CustomError from '@/app/components/utils/CustomError';
import { useGetUserByIdQuery } from '@/redux/api/userAPI';
import UserStats from '@/app/components/utils/UserStats';


const Dashboard = ({params}: {params: {id: string}}) => {
  const id = params.id;
  const {isLoading, isError, isSuccess, data, error} = useGetUserByIdQuery(id)
  

  if(isLoading)
    return <CustomLoading />

  if(isError)
    return <CustomError error={error} />

  if(isSuccess)
  
  
  return (
    <div className="flex px-12">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Welcome, {data.user.fullName}</h1>
          
          <UserStats id={id} />
          <RentalsTable />
          <CarList id={id} />
 
         
        </div>
    </div>
  );
};

export default Dashboard;
