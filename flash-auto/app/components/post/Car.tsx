import { Post } from '@/types/Post';
import Link from 'next/link';
import React from 'react'

const Car = ({car}:{car: Post}) => {
  // Sample car data

  function handleViewDetails(id: string) {
    // Logic to view car details
    console.log("Viewing details for car ID:", id);
  }
  

  return(
    <div className="w-64 rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        src={car.photo}
        alt={`${car.model} image`}
      />
      <div className="p-4 bg-slate-100">
        <h3 className="text-xl font-semibold text-gray-800">{car.make}</h3>

        <h3 className="text-xl font-semibold text-gray-600">{car.model}</h3>
        <p className="text-gray-600 mt-2">
          <span className="font-medium">Price: </span>${car.price}/day
        </p>
        {/* <p className={`mt-2 ${c ? 'text-green-600' : 'text-red-600'}`}>
          {car.isAvailable ? 'Available' : 'Not Available'}
        </p> */}
        <div className="mt-4 flex justify-end">
          <Link
            className="text-blue-500 px-4 py-2 rounded-lg hover:text-blue-600 transition duration-200"
            href={`/post/${car._id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )

}

export default Car