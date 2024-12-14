'use client'
import CarImage from '@/app/components/car/CarImage';
import CarDetails from '@/app/components/car/CarDetails';
import CarActions from '@/app/components/car/CarActions';
import Comments from '@/app/components/car/Comments';
import CarRating from '@/app/components/car/CarRating';

// Mock car data
const mockCarData = {
  _id: '1',
  make: 'Tesla',
  model: 'Model S',
  price: 150,
  age: 2,
  count: 3,
  description: 'Luxury electric vehicle with advanced autopilot features. Perfect for both city driving and long trips. Includes premium sound system and full self-driving capability.',
  photo: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
  reviews: 5
};

const Page = ({params}: {params: {id: string}}) => {
  const car = mockCarData;  // Using mock data instead of Redux query
  
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CarImage photo={car.photo} make={car.make} model={car.model} />
          <div className="space-y-6">
            <CarDetails
              make={car.make}
              model={car.model}
              age={car.age}
              count={car.count}
              price={car.price}
              description={car.description}
              reviews={car.reviews}
            />
            <CarRating carId={car._id} />
            <CarActions carId={car._id} />
          </div>
        </div>

        {/* Comments Section */}
        <Comments carId={params.id} />
      </div>
    </div>
  );
}

export default Page;