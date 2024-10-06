import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import './TransportDailyReport.css';

interface TransportBooking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  vehicle: string;
  status: 'pending' | 'confirmed' | 'canceled' | 'approved' | 'rejected';
  price?: number;
  paymentStatus: 'pending' | 'success' | 'unsuccessful';
}

const TransportDailyReport: React.FC = () => {
  const [bookings, setBookings] = useState<TransportBooking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [filteredBookings, setFilteredBookings] = useState<TransportBooking[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get<TransportBooking[]>('http://localhost:5000/api/TransportBooking/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const filtered = bookings.filter(
        (booking) =>
          new Date(booking.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString() &&
          booking.paymentStatus === 'success'
      );
      setFilteredBookings(filtered);
      const income = filtered.reduce((sum, booking) => sum + (booking.price || 0), 0);
      setTotalIncome(income);
    }
  }, [selectedDate, bookings]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Daily Transport Report', 20, 20);
    doc.setFontSize(12);
    doc.text('Report for: ' + (selectedDate || 'N/A'), 20, 30);

    // Report Summary
    doc.text('Report Summary', 20, 40);
    doc.text(`Total Bookings: ${filteredBookings.length}`, 20, 50);
    doc.text(`Total Income: RS.${totalIncome.toFixed(2)}`, 20, 60);

    // Bookings Table
    let yPos = 70;
    filteredBookings.forEach((booking, index) => {
      doc.text(`${index + 1}. ${booking.name} (${booking.email})`, 20, yPos);
      doc.text(`Pickup: ${booking.pickup}, Dropoff: ${booking.dropoff}, Price: RS.${booking.price?.toFixed(2) || 'N/A'}`, 20, yPos + 10);
      doc.text(`Payment Status: ${booking.paymentStatus}`, 20, yPos + 20);
      yPos += 30;
    });

    doc.save('Daily_Transport_Report.pdf');
  };

  return (
    <div className="report-container-transport">
      <h1 className="report-heading-transport">Daily Transport Report</h1>

      <div className="date-picker-transport">
        <label htmlFor="date" className="date-label-transport">Select Date: </label>
        <input
          type="date"
          id="date"
          className="date-input-transport"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="report-summary-transport">
        <h2>Report Summary for {selectedDate || 'N/A'}</h2>
        <p>Total Bookings: {filteredBookings.length}</p>
        <p>Total Income: RS.{totalIncome.toFixed(2)}</p>
      </div>

      <table className="report-table-transport">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Pickup</th>
            <th>Dropoff</th>
            <th>Vehicle</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.pickup}</td>
                <td>{booking.dropoff}</td>
                <td>{booking.vehicle}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.time}</td>
                <td>RS.{booking.price ? booking.price.toFixed(2) : 'N/A'}</td>
                <td className={`payment-status-transport ${booking.paymentStatus}`}>
                  {booking.paymentStatus}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10}>No bookings available for the selected date.</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={generatePDF} className="print-button-transport">Print to PDF</button>
    </div>
  );
};

export default TransportDailyReport;
