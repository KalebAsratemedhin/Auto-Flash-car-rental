'use client'
import { useState } from 'react';
import CarCard from '@/app/components/car/CarCard';
import { FiGrid, FiList } from 'react-icons/fi';

// Mock data for favorite cars
const mockFavorites = [
  {
    id: '1',
    make: 'Tesla',
    model: 'Model S',
    year: 2023,
    price: 150,
    photo: 'https://images.unsplash.com/photo-1617788138017-80ad40651399',
    rating: 4.8,
    location: 'New York, NY'
  },
  {
    id: '2',
    make: 'BMW',
    model: 'M4',
    year: 2023,
    price: 200,
    photo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
    rating: 4.9,
    location: 'Los Angeles, CA'
  },
];

const FavoritesPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
          <div className="flex gap-2 bg-white rounded-lg p-1 border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FiGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FiList className="w-5 h-5" />
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFavorites.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {mockFavorites.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg shadow-sm p-4 flex gap-6"
              >
                <img
                  src={car.photo}
                  alt={`${car.make} ${car.model}`}
                  className="w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {car.make} {car.model}
                      </h3>
                      <p className="text-gray-500">{car.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        ${car.price}
                        <span className="text-sm font-normal text-gray-500">/day</span>
                      </div>
                      <div className="text-sm text-gray-500">{car.year}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-gray-700">{car.rating}</span>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {mockFavorites.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-500">Start exploring cars to add to your favorites!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
