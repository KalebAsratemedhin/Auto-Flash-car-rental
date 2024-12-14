import {Line} from 'react-chartjs-2'

const LineGraph = ({lineChartData, title}: {lineChartData: any, title: string}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <Line
            data={lineChartData}
            options={{
                maintainAspectRatio: true,
                responsive: true,
            }}
            />
        </div>
      )
}

export default LineGraph