import Rent from '../models/rent.js'
import Car from '../models/car.js'
import User from '../models/user.js'

export const getUserSummary = async (userId) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
    const summary = await Rent.aggregate([
      {
        $match: {
          rentee: userId,
          createdAt: { $gte: oneMonthAgo },
        },
      },
      {
        $group: {
          _id: null,
          totalRentals: { $sum: 1 },
          totalSpent: { $sum: '$totalCost' }, 
        },
      },
      {
        $project: {
          _id: 0,
          totalRentals: 1,
          totalSpent: 1,
        },
      },
    ]);
  
    const activeRentalsCount = await Rent.countDocuments({
      rentee: userId,
      status: 'active',
    });
  
    return ([{
      title: "Total Rentals",
      subtitle: "This Month", 
      value: summary[0]?.totalRentals || 0,
      description: "↑ 12% from last month",
    },
    {
      title: "Total Spent",
      subtitle: "This Month",
      value: summary[0]?.totalSpent || 0,
      description: "↓ 3% from last month",
      
    },
    {
      title: "Active Rentals",
      subtitle: "Today",
      value: activeRentalsCount,
      description: "2 due this week",
    }])
  };
  
  
  export const getAdminSummary = async(userId) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
    const carCounts = await Car.countDocuments({owner: userId});
    const availableCarCounts = await Car.countDocuments({owner: userId, status: 'available'});

  
  
    const rentSummary = await Rent.aggregate([
      {
        $match: {
          renter: userId,
          createdAt: { $gte: oneMonthAgo },
        },
      },
      {
        $group: {
          _id: null,
          totalRentals: { $sum: 1 },
          totalEarnings: { $sum: '$totalCost' }, 
        },
      },
      {
        $project: {
          _id: 0,
          totalRentals: 1,
          totalEarnings: 1,
        },
      },
    ]);
  
    const activeRentalsCount = await Rent.countDocuments({
      renter: userId,
      status: 'active',
    });

  
    return [
      {
        title: "Total Cars",
        subtitle: "This Month",
        value: carCounts ,
        description: "↑ 5 new listings",
      },
      {
        title: "Active Rentals",
        subtitle: "Today",
        value: activeRentalsCount,
        description: "12 due this week",
      },
      {
        title: "Total Earnings",
        subtitle: "This Month",
        value: rentSummary.totalEarnings || 0,
        description: "↑ 18% vs last month",
      },
      {
        title: "Available Cars",
        subtitle: "Now",
        value: availableCarCounts,
        description: "38% of fleet",
      },
    ];
  
  }
  
 export const getSuperAdminSummary = async(id) => {
  
    const totalUsers = await User.countDocuments({_id: id})
    const activeAdmins = await User.countDocuments({role: 'admin'})
  
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
    const summary = await Rent.aggregate([
      {
        $match: {
          createdAt: { $gte: oneMonthAgo },
        },
      },
      {
        $group: {
          _id: null,
          platformRevenue: { $sum: '$totalCost' }, 
        },
      }
      
    ]);
  
  
    return [
      {
        title: "Total Users",
        subtitle: "This Month",
        value: totalUsers,
        description: "↑ 85 new users",
        descriptionColor: "text-green-600",
      },
      {
        title: "Active Admins",
        subtitle: "Now",
        value: activeAdmins,
        description: "2 pending approval",
        descriptionColor: "text-yellow-600",
      },
      {
        title: "Platform Revenue",
        subtitle: "This Month",
        value: summary[0]?.platformRevenue || 0,
        description: "↑ 22% vs last month",
        descriptionColor: "text-green-600",
      }
    ];
  }
  