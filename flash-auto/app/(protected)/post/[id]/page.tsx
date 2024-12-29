'use client'
import CarImage from '@/app/components/car/CarImage';
import CarDetails from '@/app/components/car/CarDetails';
import CarActions from '@/app/components/car/CarActions';
import Comments from '@/app/components/car/Comments';
import CarRating from '@/app/components/car/CarRating';
import { useGetCarByIdQuery } from '@/redux/api/carsApi';
import CustomLoading from '@/app/components/utils/CustomLoading';
import CustomError from '@/app/components/utils/CustomError';

const Page = ({params}: {params: {id: string}}) => {
  const {isLoading, isSuccess, isError, error, data} = useGetCarByIdQuery(params.id)
  const car = data?.data;

  if (isLoading) return <CustomLoading />;
  if (isError) return <CustomError error={error} />;


  if (isSuccess){
 
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CarImage photo={car.photo} make={car.make} model={car.model} />
          <div className="space-y-6">
            <CarDetails
              car={car}
            />
            <CarRating carId={car._id} />
            <CarActions carId={car._id} />
          </div>
        </div>

        <Comments carId={params.id} />
      </div>
    </div>
  );
}
}

export default Page;