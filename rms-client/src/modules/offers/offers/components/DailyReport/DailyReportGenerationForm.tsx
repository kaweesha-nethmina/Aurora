import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import jsPDF from 'jspdf'; // Import for PDF generation
import '../DailyReport/DailyReport.css';

interface Booking {
  date: string; // assuming the date field is available in your booking data
}

interface MonthlyBookingData {
  month: string;
  count: number;
}

const DailyReportGenerationForm = () => {
  const [data, setData] = useState<MonthlyBookingData[]>([]);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/offerbookings'); // Modify based on your API
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const bookings: Booking[] = await response.json();

        // Group bookings by month
        const groupedByMonth: { [key: string]: number } = {};
        bookings.forEach((booking) => {
          const bookingDate = new Date(booking.date);
          const month = bookingDate.toLocaleString('default', { month: 'long' }); // e.g., 'January', 'February'
          groupedByMonth[month] = (groupedByMonth[month] || 0) + 1;
        });

        const formattedData = Object.entries(groupedByMonth).map(([month, count]) => ({
          month,
          count,
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load booking report. Please try again.');
      }
    };

    fetchBookings();
  }, []);

  const handleReportGeneration = () => {
    setGenerated(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Monthly Bookings Report', 20, 20);
    doc.setFontSize(12);
    doc.text('Month', 20, 40);
    doc.text('Number of Bookings', 100, 40);

    data.forEach((item, index) => {
      const yPosition = 50 + index * 10; // Adjust spacing between rows
      doc.text(item.month, 20, yPosition);
      doc.text(String(item.count), 100, yPosition);
    });

    doc.save('Monthly_Bookings_Report.pdf');
  };

  return (
    <div className="report-containerw">
      <h1 className="report-title">Monthly Bookings Report</h1>
      <button className="btn-report" onClick={handleReportGeneration}>
        Generate Report
      </button>
      {generated && (
        <div>
          <BarChart width={500} height={300} data={data} id="chart" className="chart">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
          <button className="btn-save" onClick={generatePDF}>
            Save as PDF
          </button>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DailyReportGenerationForm;
