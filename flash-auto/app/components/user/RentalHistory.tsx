import React from 'react'
import LineGraph from '../common/LineGraph';

const MonthlyRevenue = ({data}: {data: number[]}) => {
  const lineChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
          {
          label: 'Rental History',
          data: data,
          borderColor: 'rgb(99, 102, 241)',
          tension: 0.4,
          },
      ],
      };

      
  return (
    <LineGraph lineChartData={lineChartData} title="Rental History" />
  )
}

export default MonthlyRevenue