import StatsCard from './StatsCard';
import {DashboardStat} from '@/types/user';

const StatsList = ({stats}: {stats: DashboardStat[]}) => {
    const role: string = 'user'

    

    const colors = [ 'text-gray-600', 'text-yellow-600', 'text-green-600', 'text-red-600' ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
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