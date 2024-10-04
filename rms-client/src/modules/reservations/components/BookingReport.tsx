import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    </div>
  );
};

export default BookingReport;
