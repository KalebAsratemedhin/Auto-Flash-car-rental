'use client'
import { useState } from 'react';
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';

// Mock data for rentals
const mockRentals = [
  {
    id: '1',
    car: {
      make: 'Tesla',
      model: 'Model S',
      photo: 'https://images.unsplash.com/photo-1617788138017-80ad40651399',
    },
    startDate: '2024-01-15',
    endDate: '2024-01-20',
    status: 'active',
    location: 'New York, NY',
    price: 750,
  },
  {
    id: '2',
    car: {
      make: 'BMW',
      model: 'M4',
      photo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
    },
    startDate: '2024-02-01',
    endDate: '2024-02-05',
    status: 'upcoming',
    location: 'Los Angeles, CA',
    price: 1000,
  },
];

const RentalsPage = () => {
  const [filter, setFilter] = useState('all');

  const filteredRentals = mockRentals.filter(rental => {
    if (filter === 'all') return true;
    return rental.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Rentals</h1>
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Rentals</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredRentals.map((rental) => (
            <div
              key={rental.id}
              className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6"
            >
              <div className="w-full md:w-48 h-32">
                <img
                  src={rental.car.photo}
                  alt={`${rental.car.make} ${rental.car.model}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {rental.car.make} {rental.car.model}
                    </h3>
                    <div className="flex items-center text-gray-500 mt-1">
                      <FiMapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{rental.location}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    rental.status === 'active' ? 'bg-green-100 text-green-800' :
                    rental.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center text-gray-500">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {rental.startDate} - {rental.endDate}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <FiClock className="w-4 h-4 mr-2" />
                    <span className="text-sm">5 days</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-gray-900">
                    <span className="font-semibold">${rental.price}</span>
                    <span className="text-gray-500 text-sm"> total</span>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredRentals.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No rentals found</h3>
              <p className="text-gray-500">You don't have any {filter !== 'all' ? filter : ''} rentals yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalsPage;
