import Link from 'next/link';
import { useGetFavoritesQuery } from '@/redux/api/carsApi';
import CustomLoading from '../utils/CustomLoading';
import CustomError from '../utils/CustomError';

const FeaturedCars = () => {
    const {isLoading, isSuccess, isError, error, data} = useGetFavoritesQuery()

    if (isLoading) return <CustomLoading />;
    if (isError){
        return <CustomError error={error} />;
    }

    if (isSuccess) {
        const favs = data.data
        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Cars</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favs?.map((fav) => (
                    <div key={fav.carId._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <img src={fav.carId.photo} alt={fav.carId.make + fav.carId.model} className="w-full h-48 object-cover" />
                        <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                            <h4 className="text-lg font-semibold text-gray-900">{fav.carId.make + fav.carId.model}</h4>
                            <p className="text-indigo-600 font-medium">{fav.carId.price}</p>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${fav.carId.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {fav.carId.status}
                            </span>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(fav.score) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            <span className="ml-2 text-sm text-gray-600">{fav.score}/5.0</span>
                            </div>
                        </div>
                        <Link
                            href={`/post/${fav.carId._id}`}
                            className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            View Details
                        </Link>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          )
    }    
  
}

export default FeaturedCars