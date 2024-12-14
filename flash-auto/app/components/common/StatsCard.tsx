import {DashboardStat} from '@/types/user';

const StatsCard = ({stat, color}: {stat: DashboardStat, color: string}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {stat.subtitle}
        </span>
      </div>
      <p className="text-3xl font-bold text-gray-900 mt-4">{stat.value}</p>
      <p className={`text-sm mt-2 ${color}`}>{stat.description}</p>
    </div>
  );
};

export default StatsCard;

