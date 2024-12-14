'use client'
import { BsStarFill, BsSpeedometer2, BsFuelPump, BsGearFill } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';
import { useState } from 'react';

interface CarDetailsProps {
  make: string;
  model: string;
  age: number;
  count: number;
  price: number;
  description: string;
  reviews: number;
}

const CarDetails = ({ make, model, age, count, price, description, reviews }: CarDetailsProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold text-gray-900">{make} {model}</h1>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-full transition-colors duration-300 ${
                isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <FiHeart size={24} className={isLiked ? 'fill-current' : ''} />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <BsStarFill key={index} className={index < reviews ? "" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-gray-600">({reviews} reviews)</span>
          </div>

          <div className="flex items-center justify-between py-4 border-t border-b border-gray-100">
            <div className="text-center">
              <BsSpeedometer2 className="mx-auto text-blue-500 text-xl mb-1" />
              <p className="text-sm text-gray-600">Age: {age} years</p>
            </div>
            <div className="text-center">
              <BsFuelPump className="mx-auto text-green-500 text-xl mb-1" />
              <p className="text-sm text-gray-600">Count: {count}</p>
            </div>
            <div className="text-center">
              <BsGearFill className="mx-auto text-purple-500 text-xl mb-1" />
              <p className="text-sm text-gray-600">Model: {model}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-blue-600">${price}<span className="text-lg text-gray-500">/day</span></h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
