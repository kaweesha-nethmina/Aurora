import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransportBookings.css';

interface TransportBooking {
  id: number; // Add an ID to identify bookings
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'canceled';
}

const TransportBookings: React.FC = () => {
  const [bookings, setBookings] = useState<TransportBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get<TransportBooking[]>('http://localhost:5000/api/TransportBooking/bookings');
        setBookings(response.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await axios.patch(`http://localhost:5000/api/TransportBooking/bookings/${id}`, { status: 'confirmed' });
      setBookings((prev) => prev.map(booking => booking.id === id ? { ...booking, status: 'confirmed' } : booking));
    } catch (err) {
      console.error('Approve error:', err);
      setError('Failed to approve booking');
    }
  };

  const handleReject = async (id: number) => {
    try {
      await axios.patch(`http://localhost:5000/api/TransportBooking/bookings/${id}`, { status: 'canceled' });
      setBookings((prev) => prev.map(booking => booking.id === id ? { ...booking, status: 'canceled' } : booking));
    } catch (err) {
      console.error('Reject error:', err);
      setError('Failed to reject booking');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="Bcontainer">
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Pickup</th>
            <th>Dropoff</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th> {/* New column for buttons */}
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.pickup}</td>
                <td>{booking.dropoff}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.time}</td>
                <td className={`status ${booking.status}`}>{booking.status}</td>
                <td>
                  {booking.status === 'pending' && (
                    <>
                      <button onClick={() => handleApprove(booking.id)}>Approve</button>
                      <button onClick={() => handleReject(booking.id)}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>No bookings available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransportBookings;
