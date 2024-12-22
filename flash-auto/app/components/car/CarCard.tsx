'use client'
import Link from 'next/link';
import { FiHeart, FiStar } from 'react-icons/fi';
import { useState } from 'react';
import { Car } from '@/types/car';


const CarCard = ({car}: {car: Car}) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <Link href={`/post/${car._id}`}>
          <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
            <img
              src={car.photo}
              alt={`${car.make} ${car.model}`}
              
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <FiHeart
            className={`w-5 h-5 ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {car.make} {car.model}
          </h3>
          <div className="flex items-center space-x-1">
            <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{car.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{car.year}</span>
          <span className="mx-2">•</span>
          <span>{car.transmission}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-blue-600">${car.price}</span>
            <span className="text-sm text-gray-500">/day</span>
          </div>
          <Link
            href={`/post/${car._id}`}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
