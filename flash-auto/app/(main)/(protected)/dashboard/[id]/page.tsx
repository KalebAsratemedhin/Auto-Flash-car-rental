'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '@/types/User';


const Dashboard = ({params}: {params: {id: string}}) => {
  const id = params.id;


  const user = {
    id: "12345",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "90210",
    },
    membershipStatus: "Active",
    joinDate: "2022-01-15",
    bookings: [
      { id: 1, car: "Toyota Camry", startDate: "2023-11-01", endDate: "2023-11-05" },
      { id: 2, car: "Honda Civic", startDate: "2023-11-10", endDate: "2023-11-12" },
    ],
    favoriteCars: [
      { id: 1, name: "Toyota Camry", model: "2023", price: "$40/day" },
      { id: 2, name: "Honda Civic", model: "2022", price: "$35/day" },
    ],
  };
  

  // F

  return (
    <div className="flex px-12">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>


          <div className='flex gap-4'>
            <div className='p-12 rounded-md bg-white shadow-md flex flex-col justify-center items-center text-red-500 font-bold text-3xl'>
                <p>Posted Cars</p>
                <p>43</p>

            </div>
            <div className='p-12 rounded-md bg-white shadow-md flex flex-col justify-center items-center text-red-500 font-bold text-3xl'>
                <p>Rented Cars</p>
                <p>21</p>

            </div>
            <div className='p-12 rounded-md bg-white shadow-md flex flex-col justify-center items-center text-red-500 font-bold text-3xl'>
                <p>Income</p>
                <p>3210ETB</p>

            </div>
          </div>

          {/* User Profile Section */}
          <UserProfile user={user} />

          {/* Cars Available Section */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">Available Cars</h2>
          <CarList />

          {/* Recent Bookings Section */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">Recent Bookings</h2>
          <BookingList userId={id} />
        </div>
    </div>
  );
};

export default Dashboard;



  
  const UserProfile = ({ user }: {user: {name: string, email: string, phone: string}}) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">User Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        {/* Add more user details as necessary */}
      </div>
    );
  };
  

  const CarList = () => {
    // Placeholder data for available cars
    const cars = [
      { id: 1, name: 'Toyota Camry', model: '2023', price: '$40/day' },
      { id: 2, name: 'Honda Civic', model: '2022', price: '$35/day' },
      { id: 3, name: 'Ford Mustang', model: '2023', price: '$60/day' },
      // Add more car data as necessary
    ];
  
    return (
      <div className="grid grid-cols-3 gap-4">
        {cars.map(car => (
          <div key={car.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{car.name}</h3>
            <p>Model: {car.model}</p>
            <p>Price: {car.price}</p>
            <Link href={`/cars/${car.id}`} className="text-blue-500 hover:underline">View Details</Link>
          </div>
        ))}
      </div>
    );
  };

  const BookingList = ({ userId }: {userId: string}) => {
    // Placeholder data for bookings
    const bookings = [
      { id: 1, car: 'Toyota Camry', startDate: '2023-11-01', endDate: '2023-11-05' },
      { id: 2, car: 'Honda Civic', startDate: '2023-11-10', endDate: '2023-11-12' },
      // Add more booking data as necessary
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Recent Bookings</h2>
        <ul>
          {bookings.map(booking => (
            <li key={booking.id} className="mb-2">
              <strong>{booking.car}</strong>: {booking.startDate} to {booking.endDate}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  