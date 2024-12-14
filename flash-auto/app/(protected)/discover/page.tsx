'use client'
import { useState } from 'react';
import { FiSearch, FiSliders, FiMapPin } from 'react-icons/fi';
import CarCard from '@/app/components/car/CarCard';

const mockCars = [
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
  {
    id: '3',
    make: 'Porsche',
    model: '911',
    year: 2022,
    price: 300,
    photo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    rating: 4.7,
    location: 'Miami, FL'
  },
  {
    id: '4',
    make: 'Mercedes',
    model: 'AMG GT',
    year: 2023,
    price: 250,
    photo: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8',
    rating: 4.9,
    location: 'Chicago, IL'
  },
];

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  const filteredCars = mockCars.filter(car => {
    const matchesSearch = (car.make + car.model)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation = location === '' || car.location.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <FiSliders className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Prices</option>
                <option value="0-100">$0 - $100</option>
                <option value="100-200">$100 - $200</option>
                <option value="200+">$200+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
