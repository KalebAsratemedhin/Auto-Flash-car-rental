
import Car from './Car'
import { Post } from '@/types/Post'

const CarList = ({cars}: {cars: Post[]}) => {
  
  return (
    <div className='my-4' >
      <div className='m-4 flex flex-wrap gap-6'>
        {
          cars?.map((car) => {
            return <Car key={car._id} car={car} />
          })

        }
      </div>
    </div>
  )
}

export default CarList