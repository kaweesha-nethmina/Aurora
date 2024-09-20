import React, { useState, useEffect } from 'react';
import BookingItem from './BookingItem';
import '../profile.css';
import Navbar from './Navbar';
import Header from '../../core/components/Header';

const ProfileScreen: React.FC = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      roomType: 'Single',
      arrivalDate: '2023-03-01',
      departureDate: '2023-03-03',
      specialRequests: 'Extra bed',
      paymentMethod: 'Credit Card',
      status: 'Confirmed',
    },
    {
      id: 2,
      roomType: 'Double',
      arrivalDate: '2023-04-01',
      departureDate: '2023-04-03',
      specialRequests: 'Room service',
      paymentMethod: 'PayPal',
      status: 'Pending',
    },
  ]);

  useEffect(() => {
    // fetch bookings from API
  }, []);

  const handleCancelBooking = (id: number) => {
    // cancel booking API call (if needed)
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  return (
    <div className="profile-screen">
      <Header activeTab={''} />
      <Navbar />
      <ul className="booking-list">
        {bookings.map((booking) => (
          <li key={booking.id} className="booking-list-item">
            <BookingItem booking={booking} onCancel={handleCancelBooking} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileScreen;
