import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyBookings.css'; // Ensure you have your own styling
import Header from '../../core/components/Header';
import Navbar from './nav/EesNavbar';

interface CustomBooking {
  _id: string;
  fullName: string;
  phoneNumber: string;
  guestCount: number;
  perPersonCharge: number;
  additionalResources: string[];
  totalAmount: number;
  bookingDate: string;
  status: string;
}

interface EventBooking {
  _id: string;
  eventId: string;
  date: string;
  timeSlot: string;
  participantCount: number;
  totalCharge: number;
  status: string;
}

type Booking = CustomBooking | EventBooking;

const MyBookings: React.FC = () => {
  const [customBookings, setCustomBookings] = useState<CustomBooking[]>([]);
  const [eventBookings, setEventBookings] = useState<EventBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentBooking, setPaymentBooking] = useState<Booking | null>(null);
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiration: '', cvv: '' });

  // Fetch custom bookings
  const fetchCustomBookings = async () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userProfile = JSON.parse(userData);
      const fullName = `${userProfile.firstName || ''} ${userProfile.lastName || ''}`;
      try {
        const response = await axios.get<{ bookings: CustomBooking[] }>(`http://localhost:5000/api/customBookings?fullName=${encodeURIComponent(fullName)}`);
        const filteredBookings = response.data.bookings.filter(booking => booking.fullName === fullName);
        setCustomBookings(filteredBookings);
      } catch (err) {
        console.error('Error fetching custom bookings:', err);
        setError('Failed to fetch custom bookings');
      }
    } else {
      setError('User not logged in');
    }
  };

  // Fetch event bookings
  const fetchEventBookings = async () => {
    try {
      const response = await axios.get<EventBooking[]>('http://localhost:5000/api/eventbookings');
      setEventBookings(response.data);
    } catch (err) {
      console.error('Error fetching event bookings:', err);
      setError('Failed to fetch event bookings');
    }
  };

  // Fetch both bookings
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      await Promise.all([fetchCustomBookings(), fetchEventBookings()]);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  // Open payment popup
  const handlePayment = (booking: Booking) => {
    setPaymentBooking(booking);
  };

  // Close payment popup
  const handleClosePayment = () => {
    setPaymentBooking(null);
    setCardDetails({ cardNumber: '', expiration: '', cvv: '' });
  };

  // Simulate payment processing
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentBooking) {
      try {
        // Simulate a payment process
        const paymentSuccessful = true; // Simulating payment success

        if (paymentSuccessful) {
          const updatedBooking = { ...paymentBooking, status: 'confirmed' };

          if ('fullName' in paymentBooking) {
            await axios.put(`http://localhost:5000/api/customBookings/${paymentBooking._id}`, updatedBooking);
            setCustomBookings(prev => prev.map(booking => booking._id === paymentBooking._id ? updatedBooking as CustomBooking : booking));
          } else {
            await axios.put(`http://localhost:5000/api/eventbookings/${paymentBooking._id}`, updatedBooking);
            setEventBookings(prev => prev.map(booking => booking._id === paymentBooking._id ? updatedBooking as EventBooking : booking));
          }
          handleClosePayment(); // Close the payment popup
        } else {
          setError('Payment failed, please try again.'); // Handle payment failure
        }
      } catch (err) {
        console.error('Error updating booking status:', err);
        setError('Failed to update booking status');
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
    <div className="my-bookings-container">
        <Header activeTab={'events'} />
        <Navbar />
      
      
      <h3 className="custom-bookings-title">Custom Event Bookings</h3>
      <table className="custom-bookings-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Guest Count</th>
            <th>Per Person Charge</th>
            <th>Additional Resources</th>
            <th>Total Amount</th>
            <th>Booking Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customBookings.length > 0 ? (
            customBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.fullName}</td>
                <td>{booking.phoneNumber}</td>
                <td>{booking.guestCount}</td>
                <td>LKR {booking.perPersonCharge}</td>
                <td>{booking.additionalResources.join(', ')}</td>
                <td>LKR {booking.totalAmount}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.status}</td>
                <td>
                  <button className="payment-button" onClick={() => handlePayment(booking)}>Pay</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>No custom bookings found</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3 className="event-bookings-title">Event Bookings</h3>
      <table className="event-bookings-table">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Participant Count</th>
            <th>Total Charge</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {eventBookings.length > 0 ? (
            eventBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.eventId}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.timeSlot}</td>
                <td>{booking.participantCount}</td>
                <td>${booking.totalCharge.toFixed(2)}</td>
                <td>{booking.status}</td>
                <td>
                  <button className="payment-button" onClick={() => handlePayment(booking)}>Pay</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No event bookings found</td>
            </tr>
          )}
        </tbody>
      </table>

      {paymentBooking && (
        <div className="payment-popup">
          <div className="payment-popup-content">
            <h3>Payment for {('fullName' in paymentBooking ? paymentBooking.fullName : paymentBooking.eventId)}</h3>
            <p>Total Amount: {('totalAmount' in paymentBooking ? paymentBooking.totalAmount : paymentBooking.totalCharge)} LKR</p>
            <form onSubmit={handlePaymentSubmit}>
              <div className="payment-input">
                <label>Card Number:</label>
                <input 
                  type="text" 
                  value={cardDetails.cardNumber} 
                  onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} 
                  required 
                />
              </div>
              <div className="payment-input">
                <label>Expiration:</label>
                <input 
                  type="text" 
                  value={cardDetails.expiration} 
                  onChange={(e) => setCardDetails({ ...cardDetails, expiration: e.target.value })} 
                  required 
                />
              </div>
              <div className="payment-input">
                <label>CVV:</label>
                <input 
                  type="text" 
                  value={cardDetails.cvv} 
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} 
                  required 
                />
              </div>
              <button type="submit" className="submit-payment-button">Confirm Payment</button>
            </form>
            <button className="close-popup-button" onClick={handleClosePayment}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
