import React from 'react'
import PieChart from '../common/PieChart'

const UserDistribution = ({data}: {data: number[]}) => {
  const colors = ['rgb(99, 102, 241)', 'rgb(129, 140, 248)', 'rgb(165, 180, 252)']
  let backgrounds = []
    
  for (let i=0;i <= data.length; i++) {
    backgrounds.push(colors[i % colors.length])
  }
  
    const pieChartData = {
        labels: ['Users', 'Admins', 'Suspended'],
        datasets: [
          {
            data: data,
            backgroundColor: backgrounds
          },
        ],
      };
      
  return (
    <div>
        <PieChart pieChartData={pieChartData} title="UserDistribution" />

    </div>
  )
}

export default UserDistribution