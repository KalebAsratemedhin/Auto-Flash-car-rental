
import LineGraph from '../common/LineGraph';

const RevenueAndBookingsTrend = ({data}: {data: {revenue: number[], bookings: number[]}}) => {
    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Revenue',
            data: data.revenue,
            borderColor: 'rgb(99, 102, 241)',
            tension: 0.4,
          },
          {
            label: 'Bookings',
            data: data.bookings,
            borderColor: 'rgb(129, 140, 248)',
            tension: 0.4,
          },
        ],
      };

      
  return (
    <LineGraph lineChartData={lineChartData} title="Revenue & Bookings Trend" />
  )
}

export default RevenueAndBookingsTrend