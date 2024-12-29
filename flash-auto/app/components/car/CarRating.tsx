'use client'
import { useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { useCreateRatingMutation, useGetOneRatingQuery } from '@/redux/api/reviewsApi';
import CustomError from "@/app/components/utils/CustomError";
import CustomLoading from "@/app/components/utils/CustomLoading";
interface CarRatingProps {
  carId: string;
  initialRating?: number;
}

const CarRating = ({ carId, initialRating = 0 }: CarRatingProps) => {
  const [hover, setHover] = useState(0);
  const {data: rating, isLoading, isError, error, isSuccess} = useGetOneRatingQuery(carId);
  const [rateCar] = useCreateRatingMutation();

  const handleRating = async (value: number) => {
    await rateCar({carId, score: value})
  };

  if(isLoading)
    return <CustomLoading />

  if(isError)
      return <CustomError error={error} />

  if(isSuccess && rating.data && rating.data.score){
    const score = rating.data.score

    return (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Rate this car</h3>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`p-1 transition-colors duration-200 ${
                'cursor-pointer'
              }`}
            >
              <BsStarFill
                size={24}
                className={`${
                  star <= (hover || score)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                } transition-colors duration-200`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  }
};

export default CarRating;
