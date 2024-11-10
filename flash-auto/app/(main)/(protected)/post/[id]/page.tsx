'use client'
import CustomLoading from '@/app/components/utils/CustomLoading';
import CustomError from '@/app/components/utils/CustomError';
import { FiHeart, FiMessageCircle, FiShare2 } from 'react-icons/fi';
import { BsStarFill } from 'react-icons/bs';
import { useGetCarDetailsQuery } from '@/redux/api/postAPI';
import StarRating from '@/app/components/rating/Rating';
import CreateComment from '@/app/components/comment/CreateComment';
import CommentSection from '@/app/components/comment/CommentList';
import Link from 'next/link';



const Page = ({params}: {params: {id: string}}) => {
  const id = params.id;
  const {isLoading, isError, isSuccess, data, error} = useGetCarDetailsQuery(id)
  

  if(isLoading)
    return <CustomLoading />

  if(isError)
    return <CustomError error={error} />

  if(isSuccess){
    const car = data.data
    const isLiked = false;
  
  
  return (
    <div className="flex flex-col gap-4 px-12 my-4 mx-auto max-w-6xl">
        <div className='w-full flex gap-4  '>
          <img
            key={id}
            src={car.photo}
            alt={`Car`}
            className=" rounded-lg max-w-lg"
            
          />

          <div className=" bg-lavender shadow-[#D9D5D0] rounded-md p-4 flex-grow">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold text-gray-800">{car.make} {car.model}</h1>
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <BsStarFill key={index} className={index < 5 ? "text-yellow-400" : "text-gray-300"} />
                ))}
                <span className="ml-2 text-gray-600">({5} reviews)</span>
              </div>
              <h2 className="text-3xl font-semibold text-gray-800">${car.price}/day</h2>
            </div>
          
            <div className="flex flex-col gap-4 mt-8">
              <button
                onClick={() => {}}
                className={`p-3 flex items-center justify-center rounded-full shadow-lg ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <FiHeart size={24} />
                {/* <span className="ml-2">{isLiked ? 'Liked' : 'Like'}</span> */}
              </button>
              <button className="p-3 flex items-center justify-center rounded-full shadow-lg bg-gray-100 text-gray-700">
                <FiShare2 size={24} />
                <span className="ml-2">Share</span>
              </button>
              <button className="p-3 flex items-center justify-center rounded-full shadow-lg bg-gray-100 text-gray-700">
                <FiMessageCircle size={24} />
                <span className="ml-2">Contact Seller</span>
              </button>
              <button className="p-3 flex items-center justify-center rounded-full shadow-lg bg-gray-100 text-gray-700">
                <FiMessageCircle size={24} />
                <Link href={`/rent/${car._id}`}>Rent Car</Link>
              </button>
            </div>
            
          </div>
          

        </div>
          
        <div className="bg-lavender shadow-[#D9D5D0] p-6 rounded-lg space-y-2 text-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800">Car Specifications</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <li><span className="font-semibold">Make:</span> {car.make}</li>
            <li><span className="font-semibold">Year:</span> {car.model}</li>
            <li><span className="font-semibold">Age:</span> {car.age}</li>
            <li><span className="font-semibold">Count:</span> {car.count}</li>
            <li><span className="font-semibold">Description:</span> {car.description}</li>
            
          </ul> 
        </div>
        <div className='w-full flex gap-2 '>
          
          <div className="bg-gray-200 p-6 rounded-lg space-y-2 text-gray-700 flex-grow h-[500px]">
            <CommentSection carId={id} />
          </div>
          <div className="bg-gray-200 p-6 rounded-lg space-y-2 text-gray-700 flex-grow h-[400px]">
            <CreateComment carId={id} />
          </div>
        </div>
        
    </div>
  );}
}


export default Page;