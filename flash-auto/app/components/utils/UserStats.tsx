import React from 'react'
import CustomLoading from './CustomLoading'
import CustomError from './CustomError'
import { useGetUserSummaryQuery } from '@/redux/api/userAPI'
const UserStats = ({id}: {id: string}) => {
  const {isLoading, isError, isSuccess, data, error} = useGetUserSummaryQuery(id)
  

  if(isLoading)
    return <CustomLoading />

  if(isError)
    return <CustomError error={error} />

  if(isSuccess)
    return (
        
        <div className='flex gap-4'>
            <div className='p-12 rounded-md bg-white shadow-md flex flex-col justify-center items-center text-red-500 font-bold text-3xl'>
                <p>Posted Cars</p>
                <p>{data.data.posts}</p>

            </div>
            <div className='p-12 rounded-md bg-white shadow-md flex flex-col justify-center items-center text-red-500 font-bold text-3xl'>
                <p>Rented Cars</p>
                <p>{data.data.rented}</p>

            </div>
            <div className='p-12 rounded-md bg-white shadow-md flex flex-col justify-center items-center text-red-500 font-bold text-3xl'>
                <p>Income</p>
                <p>{data.data.income}ETB</p>

            </div>
        </div>
    )
}

export default UserStats

