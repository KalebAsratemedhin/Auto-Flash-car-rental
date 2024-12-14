'use client'

interface CarImageProps {
  photo: string;
  make: string;
  model: string;
}

const CarImage = ({ photo, make, model }: CarImageProps) => {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        <img
          src={photo}
          alt={`${make} ${model}`}
          className="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default CarImage;
