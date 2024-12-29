'use client';
import { useState } from 'react';
import { FiSearch, FiSliders, FiMapPin } from 'react-icons/fi';
import CarCard from '@/app/components/car/CarCard';
import { useGetCarsQuery } from '@/redux/api/carsApi';

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transmission, setTransmission] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { isLoading, isError, isSuccess, error, data } = useGetCarsQuery({
    page: currentPage,
    limit,
    filter: 'all',
  });

  const filteredCars = data?.data?.cars.filter((car) => {
    const matchesSearch = (car.make + car.model)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice = priceRange === 'all' || car.price <= parseInt(priceRange);
    const matchesTransmission = transmission === 'all' || car.transmission === transmission;
    return matchesSearch && matchesPrice && matchesTransmission;
  });

  const totalPages = data?.data?.totalPages;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
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
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">all</option>
                <option value="automatic">automatic</option>
                <option value="manual">manual</option>
              </select>
            </div>

            <div className="relative">
              <FiSliders className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Prices</option>
                <option value={100}>below 100 ETB</option>
                <option value={200}>below 200 ETB</option>
                <option value={400}>below 400 ETB</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cars Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars && filteredCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>

        {filteredCars && filteredCars.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 mx-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
