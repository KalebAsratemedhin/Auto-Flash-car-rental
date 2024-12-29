import React from 'react'
import PieChart from '../common/PieChart'

const PopularBrands = ({data}: {data: {brands: string[], frequencies: number[]}}) => {
  const colors = ['rgb(99, 102, 241)', 'rgb(129, 140, 248)', 'rgb(165, 180, 252)', 'rgb(199, 210, 254)', 'rgb(224, 231, 255)']
  let backgrounds = []
    
  for (let i=0;i <= data.frequencies.length; i++) {
    backgrounds.push(colors[i % colors.length])
  }
  
  const pieChartData = {
    labels: data.brands,
    datasets: [
      {
        data: data.frequencies,
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