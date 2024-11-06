import { useCreateRatingMutation, useGetUserRatingQuery } from '@/redux/api/ratingAPI';
import React, { useState } from 'react';
import CustomError from '../utils/CustomError';
import CustomSuccess from '../utils/CustomSuccess';

const StarRating = ({carId}:{carId: string} ) => {
  const [hover, setHover] = useState(0);
  const {isLoading, isSuccess, isError, data, error} = useGetUserRatingQuery(carId)
  const [createRating, {isSuccess: isRatingSuccess, isError: isRatingError }] = useCreateRatingMutation()

  const handleRating = async (score: number) => {
    await createRating({carId, score});
  };

  return (
    <div className="flex">

      {isRatingSuccess && <CustomSuccess message="Created Successfully" /> }
      {isRatingError && <CustomError error={error} /> }

      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-6 h-6 cursor-pointer ${
            
            star <= (isSuccess ? data?.data?.score : hover) ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.286 3.965c.3.921-.755 1.688-1.54 1.118l-3.374-2.455a1 1 0 00-1.176 0l-3.374 2.455c-.784.57-1.84-.197-1.54-1.118l1.286-3.965a1 1 0 00-.364-1.118L2.049 9.392c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;