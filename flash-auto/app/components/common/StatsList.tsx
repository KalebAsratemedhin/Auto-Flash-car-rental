import StatsCard from './StatsCard';
import { useGetUserSummaryQuery } from '@/redux/api/userApi';
import CustomLoading from '../utils/CustomLoading';
import CustomError from '../utils/CustomError';

const StatsList = ({id}: {id: string}) => {
  const {isLoading, isSuccess, isError, error, data} = useGetUserSummaryQuery(id)
  const colors = [ 'text-gray-600', 'text-yellow-600', 'text-green-600', 'text-red-600' ]

  if (isLoading) return <CustomLoading />;
  if (isError) return <CustomError error={error} />;


  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {data && data?.data?.map((stat, index) => (
            <StatsCard
                key={index}
                stat={stat}
                color={colors[index]}
            />
        ))}
    </div>
  )
}

export default StatsList