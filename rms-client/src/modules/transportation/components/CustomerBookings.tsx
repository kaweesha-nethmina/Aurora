import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransportBookingsC.css';
import CreditCardModal from './CreditCardModal';
import Header from '../../core/components/Header';
import Navbar from './TNavbar';

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

const CustomerBookings: React.FC = () => {
  const [bookings, setBookings] = useState<TransportBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

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

  const handlePay = (id: string) => {
    setSelectedBookingId(id);
    setShowModal(true);
  };

  const handlePaymentSuccess = async () => {
    if (!selectedBookingId) return;

    try {
      // Call the new endpoint to update payment status
      const response = await axios.put(`http://localhost:5000/api/TransportBooking/pay/${selectedBookingId}`);
      console.log('Payment updated:', response.data);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === selectedBookingId ? { ...booking, paymentStatus: 'success' } : booking
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Failed to update payment status.');
    }
  };

  return (
    <div className="BcontainerC">
      <Header activeTab={'transportation'} />
      <Navbar />
      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <table className="bookings-tableC">
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
                <th>Price</th>
                <th>Payment Status</th>
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
                    <td>{booking.price !== undefined ? `RS.${booking.price}` : 'N/A'}</td>
                    <td className={`payment-status ${booking.paymentStatus}`}>{booking.paymentStatus}</td>
                    <td>
                      <button onClick={() => handleDelete(booking._id)}>Delete</button>
                      <button onClick={() => handlePay(booking._id)}>Pay</button>
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
          {showModal && (
            <CreditCardModal
              onClose={() => setShowModal(false)}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CustomerBookings;
