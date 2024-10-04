import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import './BookingReport.css';

interface MonthlyBooking {
  _id: number; // Month
  count: number; // Number of bookings
}

const BookingReport: React.FC = () => {
  const [monthlyBookings, setMonthlyBookings] = useState<MonthlyBooking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonthlyBookings = async () => {
      try {
        const response = await axios.get<MonthlyBooking[]>('http://localhost:5000/api/bookings-per-month');
        setMonthlyBookings(response.data);
      } catch (err) {
        console.error('Error fetching monthly bookings:', err);
        setError('Failed to load booking report. Please try again.');
      }
    };

    fetchMonthlyBookings();
  }, []);

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Monthly Booking Report', 20, 20);
    doc.setFontSize(12);
    doc.text('Month', 20, 40);
    doc.text('Number of Bookings', 100, 40);

    monthlyBookings.forEach((item, index) => {
      const yPosition = 50 + index * 10; // Adjust spacing between rows
      doc.text(String(item._id), 20, yPosition);
      doc.text(String(item.count), 100, yPosition);
    });

    doc.save('Monthly_Booking_Report.pdf');
  };

  return (
    <div className="booking-report-container">
      <h2>Monthly Booking Report</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="booking-report-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Number of Bookings</th>
          </tr>
        </thead>
        <tbody>
          {monthlyBookings.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generatePDF} className="print-button">Print to PDF</button>
    </div>
  );
};

export default BookingReport;
