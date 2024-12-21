import StatsList from '../common/StatsList';
import UserManagementTable from './UserManagementTable';
import RevenueAndBookingsTrend from './RevenueAndBookingsTrend';
import UserDistribution from './UserDistribution';


const lineGraphData = {
  revenue: [8000, 12000, 15000, 14000, 18000, 22000],
  bookings: [40, 60, 75, 70, 90, 110]
}

const userDistribution = [70, 20, 10];

const users = [
  {
    name: 'John Doe',
    phone: '0987654',
    email: 'fhkafj',
    _id: '123',
    role: 'User',
    status: 'Suspended',
    joinDate: '2024-01-15'
  }
]

const SuperAdminDashboard = ({id}: {id: string}) => {
  

  return (
    <div className="min-h-screen bg-gray-50">

        <div className="p-8">
        <StatsList id={id} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RevenueAndBookingsTrend data={lineGraphData} />  
            <UserDistribution data={userDistribution} />            

          </div>

          <UserManagementTable users={users} />
        </div>
    </div>
  );
};

export default SuperAdminDashboard;
