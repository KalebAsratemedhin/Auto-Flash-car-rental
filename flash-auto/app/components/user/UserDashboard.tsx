import React from 'react';
import RentalTable from './RentalTable';
import RentalHistory from './RentalHistory';
import StatsList from '../common/StatsList';
import PopularBrands from './PopularBrands';
import FeaturedCars from './FeaturedCars';
const cars = [
  {
    _id: '1',
    make: 'BMW',
    model: 'X5',
    photo: 'https://images.unsplash.com/photo-1617469767053-8f0899a7ef7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: '$120/day',
    rating: 4.8,
    status: 'Available',
  },
  {
    _id: '2',
    make: 'Mercedes',
    model: 'X5',
    photo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: '$150/day',
    rating: 4.9,
    status: 'Rented',
  },

];
const data = [3, 5, 2, 8, 4, 6];
  const pieChartData = {
    labels: ['BMW', 'Mercedes', 'Audi', 'Tesla', 'Toyota'],
    frequency: [30, 25, 20, 15, 10],

  };

const rental = [
  {
    car: {
      _id: '1',
      make: 'BMW',
      model: 'B6',
      photo: 'https://images.unsplash.com/photo-1617469767053-8f0899a7ef7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '$120/day',
      rating: 4.8,
      status: 'Available',
    },
    startDate: '2023-08-01',
    endDate: '2023-08-05',
    status: 'Active',
    totalCost: 480,
    _id: '1'
  }
]

const userStats = [
  {
    title: "Total Rentals",
    subtitle: "This Month",
    value: "28",
    description: "↑ 12% from last month",
  },
  {
    title: "Total Spent",
    subtitle: "This Month",
    value: "$2,890",
    description: "↓ 3% from last month",
    
  },
  {
    title: "Active Rentals",
    subtitle: "Today",
    value: "3",
    description: "2 due this week",
  },
];
const UserDashboard = () => {
  
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <div className="p-8">
          <StatsList stats={userStats}/>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RentalHistory data={data} />  
            <PopularBrands data={pieChartData}   />
          </div>

          <FeaturedCars cars={cars} />

          <RentalTable rental={rental} />        
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
