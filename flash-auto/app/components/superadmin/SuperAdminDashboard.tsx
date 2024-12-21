import StatsList from '../common/StatsList';
import UserManagementTable from './UserManagementTable';
import RevenueAndBookingsTrend from './RevenueAndBookingsTrend';
import UserDistribution from './UserDistribution';

const superAdminStats = [
  {
    title: "Total Users",
    subtitle: "This Month",
    value: "1,245",
    description: "↑ 85 new users",
    descriptionColor: "text-green-600",
  },
  {
    title: "Active Admins",
    subtitle: "Now",
    value: "12",
    description: "2 pending approval",
    descriptionColor: "text-yellow-600",
  },
  {
    title: "Platform Revenue",
    subtitle: "This Month",
    value: "$89K",
    description: "↑ 22% vs last month",
    descriptionColor: "text-green-600",
  }
];

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

const SuperAdminDashboard = () => {
  

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="pl-64 pt-16">
        <div className="p-8">
        <StatsList stats={superAdminStats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RevenueAndBookingsTrend data={lineGraphData} />  
            <UserDistribution data={userDistribution} />            

          </div>

          <UserManagementTable users={users} />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
