import { useGetUserPostsQuery } from '@/redux/api/postAPI'
import React from 'react'
import CustomLoading from '../utils/CustomLoading'
import CustomError from '../utils/CustomError'
import Car from './Car'
import { SiDatadog } from 'react-icons/si'
import { Post } from '@/types/Post'

const CarList = ({cars}: {cars: Post[]}) => {
  
  return (
    <div className='my-4' >
      <div className='m-4 flex flex-wrap gap-6'>
        {
          cars.map((car) => {
            return <Car key={car._id} car={car} />
          })

        }
      </div>
    </div>
  )
}

export default CarList