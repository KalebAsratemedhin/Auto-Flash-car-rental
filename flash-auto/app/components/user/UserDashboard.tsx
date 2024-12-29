import React from 'react';
import RentalTable from './RentalTable';
import RentalHistory from './RentalHistory';
import StatsList from '../common/StatsList';
import PopularBrands from './PopularBrands';
import FeaturedCars from './FeaturedCars';
import { useGetUserAnalyticsQuery } from '@/redux/api/userApi';
import CustomLoading from '../utils/CustomLoading';
import CustomError from '../utils/CustomError';

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
const rentalHistory = [3, 5, 2, 8, 4, 6];
  const pieChartData = {
    labels: ['BMW', 'Mercedes', 'Audi', 'Tesla', 'Toyota'],
    frequency: [30, 25, 20, 15, 10],

  };



const UserDashboard = ({id}: {id: string}) => {
  const {isLoading, isSuccess, isError, error, data: analyticsData} = useGetUserAnalyticsQuery(id)

  if (isLoading) return <CustomLoading />;
  if (isError) return <CustomError error={error} />;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="">
          <div className="p-8">
            <StatsList id={id}/>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <RentalHistory data={analyticsData?.data?.lineGraphData!} />  
              <PopularBrands data={analyticsData?.data?.pieChartData!}   />
            </div>

            <FeaturedCars cars={cars} />

            <RentalTable />        
          </div>
        </div>
      </div>
    );
};

export default UserDashboard;
