import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Booking {
  _id: string; // Use _id instead of id
  roomType: string;
  arrivalDate: string;
  departureDate: string;
  specialRequests: string;
  paymentMethod: string;
  status: string;
}

interface BookingItemProps {
  booking: Booking;
  onCancel: (_id: string) => void; // Updated to match ID type
}

const BookingItem: React.FC<BookingItemProps> = ({ booking, onCancel }) => {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (confirmCancel) {
      console.log("Canceling booking with ID:", booking._id); // Debugging log
      onCancel(booking._id); // Call the onCancel function with booking ID
      navigate('/roomreservation'); // Optional navigation
    }
  };

  return (
    <div className="booking-item">
      <h3 className="title">Booking #{booking._id}</h3>
      <p className="detail">Room Type: {booking.roomType}</p>
      <p className="detail">Check-in Date: {booking.arrivalDate}</p>
      <p className="detail">Check-out Date: {booking.departureDate}</p>
      <p className="detail">Special Requests: {booking.specialRequests}</p>
      <p className="detail">Payment Method: {booking.paymentMethod}</p>
      <p className="detail">Status: {booking.status}</p>
      <button onClick={handleCancelClick} className="cancel-button">
        Cancel Booking
      </button>
    </div>
  );
};

export default BookingItem;
