'use client'
import CustomError from "@/app/components/utils/CustomError";
import CustomLoading from "@/app/components/utils/CustomLoading";
import { useGetRentalByIdQuery } from "@/redux/api/rentalsApi";
import RentDetails from '@/app/components/rent/RentDetails';

const Page = ({params}: {params: {id: string}}) => {
    const id = params.id;
    const {isLoading, isError, isSuccess, data, error} = useGetRentalByIdQuery(id)

    if(isLoading)
        return <CustomLoading />
    
    if(isError)
        return <CustomError error={error} />
    
    if(isSuccess){
        const rent = data.data
        return (
            <div className="flex flex-col gap-4 px-12 my-4 mx-auto max-w-6xl">
              <div className="flex-grow"> 
              <RentDetails rent={rent!}  />
              </div>
            </div>)
        }
}

export default Page;