'use client'
import { useState } from 'react';
import { BsStarFill } from 'react-icons/bs';

interface CarRatingProps {
  carId: string;
  initialRating?: number;
}

const CarRating = ({ carId, initialRating = 0 }: CarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleRating = (value: number) => {
    if (!hasRated) {
      setRating(value);
      setHasRated(true);
      // Here you would typically send the rating to your backend
      console.log('Rating submitted:', { carId, rating: value });
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900">Rate this car</h3>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            onMouseEnter={() => !hasRated && setHover(star)}
            onMouseLeave={() => !hasRated && setHover(0)}
            disabled={hasRated}
            className={`p-1 transition-colors duration-200 ${
              hasRated ? 'cursor-default' : 'cursor-pointer'
            }`}
          >
            <BsStarFill
              size={24}
              className={`${
                star <= (hover || rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              } transition-colors duration-200`}
            />
          </button>
        ))}
      </div>
      {hasRated && (
        <p className="text-sm text-green-600">
          Thanks for rating! You gave this car {rating} stars.
        </p>
      )}
    </div>
  );
};

export default CarRating;
