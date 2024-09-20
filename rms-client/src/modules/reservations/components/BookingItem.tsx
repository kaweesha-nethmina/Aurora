// src/modules/profile/components/BookingItem.tsx
import React from 'react';
import Navbar from './Navbar';
import Header from '../../core/components/Header';

interface Booking {
  id: number;
  roomType: string;
  arrivalDate: string;
  departureDate: string;
  specialRequests: string;
  paymentMethod: string;
  status: string;
}

interface BookingItemProps {
  booking: Booking;
  onCancel: (id: number) => void;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking, onCancel }) => {
  return (
    <div className="booking-item">
      <Header activeTab={''} />
      <Navbar />
      <h3 className="title">Booking #{booking.id}</h3>
      <p className="detail">Room Type: {booking.roomType}</p>
      <p className="detail">Check-in Date: {booking.arrivalDate}</p>
      <p className="detail">Check-out Date: {booking.departureDate}</p>
      <p className="detail">Special Requests: {booking.specialRequests}</p>
      <p className="detail">Payment Method: {booking.paymentMethod}</p>
      <p className="detail">Status: {booking.status}</p>
      <button
        onClick={() => onCancel(booking.id)}
        className="cancel-button"
      >
        Cancel Booking
      </button>
    </div>
  );
};

export default BookingItem;
