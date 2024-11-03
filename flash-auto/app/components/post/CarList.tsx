import { useGetUserPostsQuery } from '@/redux/api/postAPI'
import React from 'react'
import CustomLoading from '../utils/CustomLoading'
import CustomError from '../utils/CustomError'
import Car from './Car'
import { SiDatadog } from 'react-icons/si'

const CarList = ({id}: {id: string}) => {
  const {isLoading, isError, isSuccess, data, error} = useGetUserPostsQuery(id)

  if(isLoading)
    return <CustomLoading />

  if(isError)
    return <CustomError error={error} />

  if(isSuccess )
  return (
    <div className='my-4' >
      <h1 className='text-3xl font-bold'>Your cars</h1>
      <div className='m-4 flex flex-wrap gap-6'>
      {
        data.data.map((car) => {
          return <Car key={car._id} car={car} />
        })

      }


    </div>
    </div>
  )
}

export default CarList