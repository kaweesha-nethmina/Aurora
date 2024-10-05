import React, { useEffect, useState } from 'react';
import './EventBookingTable.css';

interface EventBooking {
  _id: string; // Assuming MongoDB ID
  eventId: string;
  date: string; // Store as ISO string from MongoDB
  timeSlot: string;
  participantCount: number;
  totalCharge: number;
  userId?: string; // Optional: User's ID who made the booking
  status: string;
}

const EventBookingTable: React.FC = () => {
  const [bookings, setBookings] = useState<EventBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/eventbookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this booking?');
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/eventbookings/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete booking');
        }
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
      } catch (error: any) {
        setError(error.message);
      }
    }
  };
  

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="event-booking-table">
      <h2 className="table-title">Event Bookings</h2>
      <table className="booking-table">
        <thead>
          <tr className="table-header">
            <th className="header-cell">Event ID</th>
            <th className="header-cell">Date</th>
            <th className="header-cell">Time Slot</th>
            <th className="header-cell">Participant Count</th>
            <th className="header-cell">Total Charge</th>
            <th className="header-cell">Payment Status</th>
            <th className="header-cell">Action</th> {/* New Action column */}
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
              <td className="table-cell">
                <button onClick={() => handleDelete(booking._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventBookingTable;
