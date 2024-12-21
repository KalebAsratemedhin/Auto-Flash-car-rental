import Rent from '../models/rent.js'

export const getUserAnalytics = async (userId) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    console.log('userId', userId)

    const monthlyRentals = await Rent.aggregate([
      {
        $match: {
          renter: userId,
          createdAt: { $gte: oneYearAgo },
        },
      },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          count: { $sum: 1 }, 
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }, 
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          count: 1,
        },
      },
    ]);
  
    // Aggregate data for car brand distribution
    const carBrandDistribution = await Rent.aggregate([
      {
        $match: {
          renter: userId,
          createdAt: { $gte: oneYearAgo },
        },
      },
      {
        $lookup: {
          from: 'cars', 
          localField: 'car',
          foreignField: '_id',
          as: 'carDetails',
        },
      },
      {
        $unwind: '$carDetails', 
      },
      {
        $group: {
          _id: '$carDetails.brand', 
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          brand: '$_id',
          count: 1,
        },
      },
      {
        $sort: { count: -1 }, 
      },
    ]);
  
    // const months = Array.from({ length: 12 }, (_, i) => i + 1); // Months from 1 to 12
    // const monthlySummary = months.map((month) => {
    //   const rental = monthlyRentals.find((r) => r.month === month);
    //   return { month, count: rental ? rental.count : 0 };
    // });                                                                                                                                                                                                                                                      

    console.log('analytics', monthlyRentals, carBrandDistribution)
    return {
      lineGraphData: monthlyRentals,
      pieChartData: carBrandDistribution,
    };

}

export const getAdminAnalytics = async(userId) => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);


  const monthlyRentals = await Rent.aggregate([
    {
      $match: {
        renter: userId,
        createdAt: { $gte: oneYearAgo },
      },
    },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 }, 
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }, 
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        month: '$_id.month',
        count: 1,
      },
    },
  ]);

  // Aggregate data for car brand distribution
  const carBrandDistribution = await Rent.aggregate([
    {
      $match: {
        renter: userId,
        createdAt: { $gte: oneYearAgo },
      },
    },
    {
      $lookup: {
        from: 'cars', 
        localField: 'car',
        foreignField: '_id',
        as: 'carDetails',
      },
    },
    {
      $unwind: '$carDetails', 
    },
    {
      $group: {
        _id: '$carDetails.brand', 
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        brand: '$_id',
        count: 1,
      },
    },
    {
      $sort: { count: -1 }, 
    },
  ]);

  // const months = Array.from({ length: 12 }, (_, i) => i + 1); // Months from 1 to 12
  // const monthlySummary = months.map((month) => {
  //   const rental = monthlyRentals.find((r) => r.month === month);
  //   return { month, count: rental ? rental.count : 0 };
  // });                                                                                                                                                                                                                                                      

  console.log('analytics', monthlyRentals, carBrandDistribution)
  return {
    lineGraphData: monthlyRentals,
    pieChartData: carBrandDistribution,
  };
    
}

export const getSuperAdminAnalytics = (id) => {
    
}