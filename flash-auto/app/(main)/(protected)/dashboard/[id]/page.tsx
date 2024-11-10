'use client'
import RentalsTable from '@/app/components/rent/RentalsTable';
import CarList from '@/app/components/post/CarList';
import CustomLoading from '@/app/components/utils/CustomLoading';
import CustomError from '@/app/components/utils/CustomError';
import { useGetUserByIdQuery } from '@/redux/api/userAPI';
import UserStats from '@/app/components/utils/UserStats';
import UserCarList from '@/app/components/post/UserCarList';
import RentalsList from '@/app/components/rent/RentalsList';


const Dashboard = ({params}: {params: {id: string}}) => {
  const id = params.id;
  const {isLoading, isError, isSuccess, data, error} = useGetUserByIdQuery(id)
  

  if(isLoading)
    return <CustomLoading />

  if(isError)
    return <CustomError error={error} />

  if(isSuccess)
  
  
  return (
    <div className=" mx-20">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Welcome, {data.data.fullName}</h1>

          <div className='my-8'>
            <UserStats id={id} />
          </div>
          <div className='my-8'>
            <RentalsList />
          </div>
          <div className='my-8'>
            <UserCarList id={id} />
          </div>
 
         
        </div>
    </div>
  );
};

export default Dashboard;
