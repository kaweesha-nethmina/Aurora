import { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Button, Card, Grid, CircularProgress } from '@mui/material';
import { ArrowDownward, Print } from '@mui/icons-material';
import html2pdf from 'html2pdf.js'; // Import html2pdf.js
import '../../components/Manager/ManagerCss/ReportsStyles.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportsTab = () => {
  const [leaveReportData, setLeaveReportData] = useState<any[]>([]);
  const [showChart, setShowChart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const reportRef = useRef<HTMLDivElement>(null); // Create a ref for the report container

  // Fetch leave report from the backend API
  useEffect(() => {
    const fetchLeaveReport = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/leave-report');
        const data = await response.json();
        setLeaveReportData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load report');
        setLoading(false);
      }
    };

    fetchLeaveReport();
  }, []);

  // Function to convert milliseconds to days
  const convertMsToDays = (ms: number) => Math.ceil(ms / (1000 * 60 * 60 * 24));

  // Prepare data for the chart
  const chartData = {
    labels: leaveReportData.map((employee: any) => employee.employee),
    datasets: [
      {
        label: 'Total Leave Days',
        data: leaveReportData.map((employee: any) => convertMsToDays(employee.totalLeaves)),
        backgroundColor: 'rgba(0, 176, 255, 0.8)',
        borderColor: 'rgba(0, 176, 255, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0, 176, 255, 1)',
        hoverBorderColor: '#00BFFF',
      },
    ],
  };

  // Generate chart by category
  const leaveCategoriesChart = leaveReportData.map((employee: any) => {
    const categories = employee.leaveCategories.map((category: any) => ({
      label: `${employee.employee} - ${category.catagory}`,
      data: convertMsToDays(
        new Date(category.endDate).getTime() - new Date(category.startDate).getTime()
      ),
      backgroundColor: category.catagory === 'casual' ? 'rgba(54, 162, 235, 0.2)' :
        category.catagory === 'annual' ? 'rgba(255, 99, 132, 0.2)' :
        'rgba(255, 206, 86, 0.2)',
      borderColor: category.catagory === 'casual' ? 'rgba(54, 162, 235, 1)' :
        category.catagory === 'annual' ? 'rgba(255, 99, 132, 1)' :
        'rgba(255, 206, 86, 1)',
      borderWidth: 1,
      hoverBackgroundColor: '#f5f5f5',
      hoverBorderColor: '#e5e5e5',
    }));
    return categories;
  }).flat();

  const handleGenerateChart = () => {
    setShowChart(true);
  };

  const handlePrint = () => {
    if (reportRef.current) {
      const element = reportRef.current;
      const opt = {
        margin: 0.5, // Adjust margin as needed
        filename: 'leave-report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      
      html2pdf()
        .from(element)
        .set(opt)
        .save();
    }
  };
  

  if (loading) return <div className="loading"><CircularProgress /></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="reports-container">
      <h2 className="reports-header">Leave Report</h2>

      <div ref={reportRef}> {/* Wrap report content in ref */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleGenerateChart} 
              startIcon={<ArrowDownward />}
            >
              Generate Chart
            </Button>
          </Grid>

          {showChart && (
            <Grid item xs={12}>
              <Card className="chart-card">
                <Bar 
                  data={chartData} 
                  options={{
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context: any) => `${context.raw} days`,
                        },
                      },
                    },
                  }}
                />
              </Card>
            </Grid>
          )}

          {leaveCategoriesChart.length > 0 && leaveCategoriesChart.map((dataset: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="chart-card">
                <h3>{dataset.label}</h3>
                <Bar
                  data={{
                    labels: [dataset.label],
                    datasets: [{
                      label: dataset.label,
                      data: [dataset.data],
                      backgroundColor: [dataset.backgroundColor],
                      borderColor: [dataset.borderColor],
                      borderWidth: 1,
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context: any) => `${context.raw} days`,
                        },
                      },
                    },
                  }}
                />
              </Card>
            </Grid>
          ))}
          
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handlePrint} 
              startIcon={<Print />}
            >
              Print Report
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ReportsTab;
