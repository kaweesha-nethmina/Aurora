// src/modules/profile/components/ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import BookingItem from './BookingItem';
import '../profile.css';
import { Link } from 'react-router-dom';

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
    // cancel booking API call
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  return (
    <div className="profile-screen">
      <h2 className="header">Booking Details</h2>
      <ul className="booking-list">
        {bookings.map((booking) => (
          <Link to="/cancelform">
          <li key={booking.id} className="booking-list-item">
            <BookingItem booking={booking} onCancel={handleCancelBooking} />
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ProfileScreen;
