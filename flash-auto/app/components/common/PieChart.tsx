import {Pie} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );


const PieChart = ({pieChartData, title}: {pieChartData: any, title: string}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <Pie
            data={pieChartData}
            options={{
                maintainAspectRatio: true,
                responsive: true,
            }}
            />
        </div>
    )
}

export default PieChart