import React from 'react'
import PieChart from '../common/PieChart'

const PopularBrands = ({data}: {data: {labels: string[], frequency: number[]}}) => {
  const colors = ['rgb(99, 102, 241)', 'rgb(129, 140, 248)', 'rgb(165, 180, 252)', 'rgb(199, 210, 254)', 'rgb(224, 231, 255)']
  let backgrounds = []
    
  for (let i=0;i <= data.frequency.length; i++) {
    backgrounds.push(colors[i % colors.length])
  }
  
  const pieChartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.frequency,
        backgroundColor: backgrounds,
      },
    ],
  };
  return (
    <div>
        <PieChart pieChartData={pieChartData} title="Popular Car Brands" />

    </div>
  )
}

export default PopularBrands