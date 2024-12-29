import React from 'react';
import RentalTable from './RentalTable';
import RentalHistory from './RentalHistory';
import StatsList from '../common/StatsList';
import PopularBrands from './PopularBrands';
import FeaturedCars from './FeaturedCars';
import { useGetUserAnalyticsQuery } from '@/redux/api/userApi';
import CustomLoading from '../utils/CustomLoading';
import CustomError from '../utils/CustomError';

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

            <FeaturedCars />

            <RentalTable />        
          </div>
        </div>
      </div>
    );
};

export default UserDashboard;
