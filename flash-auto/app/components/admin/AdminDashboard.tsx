import StatsList from '../common/StatsList';
import RentalsTable from './RentalsTable';
import MonthlyRevenue from './MonthlyRevenue';
import CarUtilization from './CarUtilization';

const activeRentals = [
  {
    _id: '1',
    
    car: {
      _id: '1',
      make: 'BMW',
      model: 'B6',
      photo: 'https://images.unsplash.com/photo-1617469767053-8f0899a7ef7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '$120/day',
      rating: 4.8,
      status: 'Available',
    },
    renter: {
      name: 'John Doe',
      phone: '0987654',
      email: 'fhkafj',
      _id: '123',
      role: 'User',
      status: 'Suspended',
      joinDate: '2024-01-15'
    },
    startDate: '2024-01-15',
    endDate: '2024-01-20',
    expectedReturn: '2024-01-20',
    totalCost: 234,
    status: 'Active'
  },
  {
    _id: '2',
    car: {
      _id: '1',
      make: 'BMW',
      model: 'B6',
      photo: 'https://images.unsplash.com/photo-1617469767053-8f0899a7ef7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '$120/day',
      rating: 4.8,
      status: 'Available',
    },
    renter: {
      name: 'John Doe',
      phone: '0987654',
      email: 'fhkafj',
      _id: '123',
      role: 'User',
      status: 'Suspended',
      joinDate: '2024-01-15'
    },
    startDate: '2024-01-15',
    endDate: '2024-01-17',
    expectedReturn: '2024-01-20',
    totalCost: 234,
    status: 'Active'
  },
];

const adminStats = [
  {
    title: "Total Cars",
    subtitle: "This Month",
    value: '45',
    description: "↑ 5 new listings",
  },
  {
    title: "Active Rentals",
    subtitle: "Today",
    value: '28',
    description: "12 due this week",
  },
  {
    title: "Total Earnings",
    subtitle: "This Month",
    value: '25000',
    description: "↑ 18% vs last month",
  },
  {
    title: "Available Cars",
    subtitle: "Now",
    value: '17',
    description: "38% of fleet",
  },
];

const revenueData = [4000, 3000, 5000, 4500, 6000, 7000];
const carUtilization = [70, 20, 10];

const AdminDashboard = () => {

  return (
    <div className="min-h-screen bg-gray-50">
        
      <div className="pl-64 pt-16">
        <div className="p-8">
          <StatsList stats={adminStats}/>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <MonthlyRevenue data={revenueData} />
            <CarUtilization data={carUtilization}/>
          </div>

          <RentalsTable activeRentals={activeRentals} />
          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
