'use client'
import {ActiveRental} from '@/types/rent';

const RentalsTable = ({activeRentals}: {activeRentals: ActiveRental[]}) => {

  const handleConfirmReturn = (rentalId: string) => {
      
  };

    
  return (

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Rentals</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="pb-3 font-semibold text-gray-600">Car</th>
              <th className="pb-3 font-semibold text-gray-600">Renter</th>
              <th className="pb-3 font-semibold text-gray-600">Start Date</th>
              <th className="pb-3 font-semibold text-gray-600">Expected Return</th>
              <th className="pb-3 font-semibold text-gray-600">Status</th>
              <th className="pb-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeRentals.map((rental) => (
              <tr key={rental._id} className="border-b border-gray-100">
                <td className="py-4">{rental.car.make + rental.car.model}</td>
                <td className="py-4">{rental.renter.name}</td>
                <td className="py-4">{rental.startDate}</td>
                <td className="py-4">{rental.endDate}</td>
                <td className="py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    rental.status === 'Active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {rental.status}
                  </span>
                </td>
                <td className="py-4">
                  {rental.status === 'Active' && (
                    <button
                      onClick={() => handleConfirmReturn(rental._id)}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Confirm Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default RentalsTable

