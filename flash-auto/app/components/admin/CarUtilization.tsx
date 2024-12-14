import React from 'react'
import PieChart from '../common/PieChart'

const CarUtilization = ({data}: {data: number[]}) => {
    const pieChartData = {
        labels: ['In Use', 'Available', 'Maintenance'],
        datasets: [
          {
            data: data,
            backgroundColor: [
              'rgb(99, 102, 241)',
              'rgb(129, 140, 248)',
              'rgb(165, 180, 252)',
            ],
          },
        ],
      };
  return (
    <div>
        <PieChart pieChartData={pieChartData} title="Car Utilization" />

    </div>
  )
}

export default CarUtilization