'use client'
import RentalsTable from '@/app/components/rent/RentalsTable';
import CustomLoading from '@/app/components/utils/CustomLoading';
import CustomError from '@/app/components/utils/CustomError';
import { useGetUserByIdQuery } from '@/redux/api/userAPI';
import UserStats from '@/app/components/utils/UserStats';
import UserCarList from '@/app/components/post/UserCarList';


const Page = ({params}: {params: {id: string}}) => {
  const id = params.id;
  const {isLoading, isError, isSuccess, data, error} = useGetCarDetailsQuery(id)
  

  if(isLoading)
    return <CustomLoading />

  if(isError)
    return <CustomError error={error} />

  if(isSuccess)
  
  
  return (
    <div className="flex px-12">
        <div>

        </div>
        <div>
            
        </div>
        
    </div>
  );
};

export default Page;
