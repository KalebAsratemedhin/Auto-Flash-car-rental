'use client'
import { FiCalendar, FiMessageCircle } from 'react-icons/fi';
import Link from 'next/link';

interface CarActionsProps {
  carId: string;
}

const CarActions = ({ carId }: CarActionsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Link href={`/post/${carId}/rent`} className="w-full">
        <button className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2">
          <FiCalendar />
          <span>Rent Now</span>
        </button>
      </Link>
      <button className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center space-x-2">
        <FiMessageCircle />
        <span>Contact Seller</span>
      </button>
    </div>
  );
};

export default CarActions;
