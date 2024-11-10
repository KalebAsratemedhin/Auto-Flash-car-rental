import CustomLoading from '../utils/CustomLoading'
import { useGetCurrentUserRentsQuery } from '@/redux/api/rentAPI'
import CustomError from '../utils/CustomError'
import RentalsTable from './RentalsTable'
import { useSession } from 'next-auth/react'

const RentalsList = () => {
    const auth = useSession()

    const {isLoading, isError, isSuccess, data, error} = useGetCurrentUserRentsQuery()

    if(isLoading)
      return <CustomLoading />
  
    if(isError)
      return <CustomError error={error} />
  
    if(isSuccess ){
  return (
    <div>        
        <div>
            <h1 className='text-3xl font-bold  my-4'>Renter History</h1>
            <RentalsTable rents={data?.data.filter((rent) => rent.renter == auth.data?.user.id )} />
        </div>

        <div>
            <h1 className='text-3xl font-bold  my-4'>Rentee History</h1>
            <RentalsTable rents={data?.data.filter((rent) => rent.rentee == auth.data?.user.id )} />

        </div>
        
    </div>
  )
}}

export default RentalsList