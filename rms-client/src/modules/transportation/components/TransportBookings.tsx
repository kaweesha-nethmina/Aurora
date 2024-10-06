import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransportBookings.css';

interface TransportBooking {
  _id: string; // Use _id to align with MongoDB
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  vehicle: string;
  status: 'pending' | 'confirmed' | 'canceled' | 'approved' | 'rejected';
  price?: number; // Add price property
  paymentStatus: 'pending' | 'success' | 'unsuccessful'; // Add payment status property
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

  // Approve booking
  const handleApprove = async (id: string) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/TransportBooking/approve/${id}`);
      console.log('Booking approved:', response.data);
      // Update state after approval
      setBookings((prev) =>
        prev.map((booking) => (booking._id === id ? { ...booking, status: 'approved' } : booking))
      );
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  // Reject booking
  const handleReject = async (id: string) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/TransportBooking/reject/${id}`);
      console.log('Booking rejected:', response.data);
      // Update state after rejection
      setBookings((prev) =>
        prev.map((booking) => (booking._id === id ? { ...booking, status: 'rejected' } : booking))
      );
    } catch (error) {
      console.error('Error rejecting booking:', error);
    }
  };

  // Delete booking
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`http://localhost:5000/api/TransportBooking/bookings/${id}`);
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Failed to delete booking.');
      }
    }
  };

  // Set price based on KM input
  const handleSetPrice = async (id: string) => {
    const km = prompt("Enter the kilometers traveled:");
    if (km !== null) {
      const parsedKm = parseFloat(km);
      if (!isNaN(parsedKm) && parsedKm > 0) {
        const pricePerKm = 100; // Define your rate per KM here
        const price = parsedKm * pricePerKm;

        try {
          const response = await axios.put(`http://localhost:5000/api/TransportBooking/setPrice/${id}`, { price });
          console.log('Price set:', response.data);
          // Update state after setting price
          setBookings((prev) =>
            prev.map((booking) => (booking._id === id ? { ...booking, price } : booking))
          );
        } catch (error) {
          console.error('Error setting price:', error);
        }
      } else {
        alert('Please enter a valid number for kilometers.');
      }
    }
  };

  return (
    <div className="BcontainerT">
      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="bookings-tablet">
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
              <th>Status</th>
              <th>Price</th> {/* New Price Column */}
              <th>Payment Status</th> {/* New Payment Status Column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.pickup}</td>
                  <td>{booking.dropoff}</td>
                  <td>{booking.vehicle}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.time}</td>
                  <td className={`status ${booking.status}`}>{booking.status}</td>
                  <td>{booking.price !== undefined ? `RS.${booking.price}` : 'N/A'}</td> {/* Price Display */}
                  <td className={`payment-status ${booking.paymentStatus}`}>{booking.paymentStatus}</td> {/* Payment Status Display */}
                  <td>
                    {booking.status === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(booking._id)}>Approve</button>
                        <button onClick={() => handleReject(booking._id)}>Reject</button>
                      </>
                    )}
                    <button onClick={() => handleDelete(booking._id)}>Delete</button>
                    <button onClick={() => handleSetPrice(booking._id)}>Set Price</button> {/* New Set Price Button */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12}>No bookings available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransportBookings;
