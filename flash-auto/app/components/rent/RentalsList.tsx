import CustomLoading from '../utils/CustomLoading'
import { useGetCurrentUserRentsQuery } from '@/redux/api/userAPI'
import CustomError from '../utils/CustomError'
import RentalsTable from '../admin/RentalsTable'
import { useSession } from 'next-auth/react'

const RentalsList = () => {
    const auth = useSession()

    const {isLoading, isError, isSuccess, data, error} = useGetCurrentUserRentsQuery()

    if(isLoading)
      return <CustomLoading />
  
    if(isError)
      return <CustomError error={error} />
  
    if(isSuccess ){
      const rents = data.data
      const currUser = auth.data?.user!
      const filtered = currUser.role === "admin" ? (
        rents.filter(rent => {
          rent.renter === currUser.id
        })
      ) : (
        rents.filter(rent => {
          rent.rentee === currUser.id
        })

      )
  return (
    <div className=''>        
        <div>
            <h1 className='text-3xl font-bold  my-4'>Rent History</h1>
            <RentalsTable rents={filtered} />
        </div>
       
    </div>
  )
}}

export default RentalsList