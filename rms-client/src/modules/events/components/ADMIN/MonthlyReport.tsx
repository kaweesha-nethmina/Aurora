import React, { useEffect, useState } from 'react';
import './MonthlyReport.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface EventBooking {
  _id: string;
  eventId: string;
  date: string;
  timeSlot: string;
  participantCount: number;
  totalCharge: number;
  userId?: string;
  status: string;
}

const MonthlyReport: React.FC = () => {
  const [bookings, setBookings] = useState<EventBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [totalCharge, setTotalCharge] = useState<number>(0);
  const [chartData, setChartData] = useState<{ date: string; totalCharge: number }[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/eventbookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data: EventBooking[] = await response.json();
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        // Filter bookings for the current month and year
        const monthlyBookings = data.filter((booking: EventBooking) => {
          const bookingDate = new Date(booking.date);
          return (
            bookingDate.getMonth() === currentMonth &&
            bookingDate.getFullYear() === currentYear
          );
        });

        // Calculate total bookings and total charge
        const total = monthlyBookings.length;
        const charge = monthlyBookings.reduce((acc: number, booking: EventBooking) => {
          return acc + booking.totalCharge;
        }, 0);

        // Prepare data for the chart
        const chargeData = monthlyBookings.map((booking) => ({
          date: new Date(booking.date).toLocaleDateString(),
          totalCharge: booking.totalCharge,
        }));

        setBookings(monthlyBookings);
        setTotalBookings(total);
        setTotalCharge(charge);
        setChartData(chargeData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handlePrintToPDF = async () => {
    const input = document.getElementById('monthly-report');
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // Adjust as needed
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('monthly_report.pdf');
    }
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="monthly-report" id="monthly-report">
      <h2 className="report-title">Monthly Report</h2>
      <div className="report-summary">
        <p>Total Bookings: {totalBookings}</p>
        <p>Total Charge: ${totalCharge.toFixed(2)}</p>
      </div>

      {/* Chart Section */}
      <h3>Charge Over Time</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalCharge" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <h3>Event Bookings for the Month</h3>
      <table className="report-table">
        <thead>
          <tr className="table-header">
            <th className="header-cell">Event ID</th>
            <th className="header-cell">Date</th>
            <th className="header-cell">Time Slot</th>
            <th className="header-cell">Participant Count</th>
            <th className="header-cell">Total Charge</th>
            <th className="header-cell">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="table-row">
              <td className="table-cell">{booking.eventId}</td>
              <td className="table-cell">{new Date(booking.date).toLocaleDateString()}</td>
              <td className="table-cell">{booking.timeSlot}</td>
              <td className="table-cell">{booking.participantCount}</td>
              <td className="table-cell">${booking.totalCharge.toFixed(2)}</td>
              <td className="table-cell">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Print Button */}
      <button className="print-button" onClick={handlePrintToPDF}>Print to PDF</button>
    </div>
  );
};

export default MonthlyReport;
