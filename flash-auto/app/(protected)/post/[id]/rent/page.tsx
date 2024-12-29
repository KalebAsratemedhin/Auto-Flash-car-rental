'use client';
import CreateRent from '@/app/components/rent/CreateRent'
import { useGetCarByIdQuery } from '@/redux/api/carsApi';
import CustomLoading from '@/app/components/utils/CustomLoading';
import CustomError from '@/app/components/utils/CustomError';

const page = ({params}: {params: {id: string}}) => {
    const {isLoading, isSuccess, isError, error, data} = useGetCarByIdQuery(params.id)
    const car = data?.data;
  
    if (isLoading) return <CustomLoading />;
    if (isError) return <CustomError error={error} />;
  
  
    if (isSuccess){
        return (
            <div className='p-20'>
                <CreateRent car={car} />
            </div>
        )
    }
}

export default page