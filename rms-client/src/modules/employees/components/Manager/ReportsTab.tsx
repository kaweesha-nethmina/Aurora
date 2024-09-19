
import '../../components/Manager/ManagerCss/ReportsStyles.css';// Import the updated CSS
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { attendanceData } from '../../utils/Manager/attendanceData';
import { printReport } from '../../utils/Manager/reportUtils';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define month days
const monthDays = [
  '2024-08-01', '2024-08-02', '2024-08-03', '2024-08-04', '2024-08-05', '2024-08-06', '2024-08-07', 
  '2024-08-08', '2024-08-09', '2024-08-10', '2024-08-11', '2024-08-12', '2024-08-13', '2024-08-14', 
  '2024-08-15', '2024-08-16', '2024-08-17', '2024-08-18', '2024-08-19', '2024-08-20', '2024-08-21', 
  '2024-08-22', '2024-08-23', '2024-08-24', '2024-08-25', '2024-08-26', '2024-08-27', '2024-08-28', 
  '2024-08-29', '2024-08-30', '2024-08-31'
];

const ReportsTab = () => {
  // Prepare data for the chart
  const chartData = {
    labels: monthDays,
    datasets: attendanceData.map(employee => ({
      label: employee.name,
      data: monthDays.map(date => employee.dates[date] === 'Present' ? 1 : 0),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }))
  };

  const [showChart, setShowChart] = useState(false);

  const handleGenerateChart = () => {
    setShowChart(true);
  };

  const handlePrint = () => {
    printReport();
  };

  return (
    <div className="reports-container">
      <h2 className="reports-header">Reports</h2>
      <button className="report-button" onClick={handleGenerateChart}>Generate Chart</button>
      {showChart && <Bar data={chartData} />}
      <button className="report-button" onClick={handlePrint}>Print Report</button>
    </div>
  );
};

export default ReportsTab;
