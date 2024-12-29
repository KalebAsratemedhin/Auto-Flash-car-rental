'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useGetRentalsQuery } from '@/redux/api/rentalsApi';
import CustomError from "@/app/components/utils/CustomError";
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import CustomLoading from "@/app/components/utils/CustomLoading";


const RentalsPage = () => {
  const {isLoading, isError, error, isSuccess, data} = useGetRentalsQuery();
  const [filter, setFilter] = useState('all');

    if(isLoading)
        return <CustomLoading />

    if(isError)
        return <CustomError error={error} />

    if(isSuccess && data.data){
        const filteredRentals = data.data
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
                    key={rental._id}
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
                            <span className="text-sm px-3 py-1 rounded-full bg-orange-100 text-orange-800">{rental.insuranceOption}</span>
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
                            {new Date(rental.startDate).toDateString()} - {new Date(rental.endDate).toDateString()}
                            </span>
                        </div>
                        <div className="flex items-center text-gray-500">
                            <FiClock className="w-4 h-4 mr-2" />
                            <span className="text-sm">{new Date(rental.endDate).getDay() - new Date(rental.startDate).getDay()} day/s</span>
                        </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-gray-900">
                            <span className="font-semibold">${rental.totalCost}</span>
                            <span className="text-gray-500 text-sm"> total</span>
                        </div>
                        <Link href={`/rent/${rental._id}`} className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                            View Details
                        </Link>
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
    }
};

export default RentalsPage;
