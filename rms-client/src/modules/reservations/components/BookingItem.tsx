import React from 'react';
import { useNavigate } from 'react-router-dom';


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
  const navigate = useNavigate(); // Use navigate hook to redirect

  const handleCancelClick = () => {
    onCancel(booking.id);
    navigate('/cancelform'); // Navigate to cancel form
  };

  return (
    <div className="booking-item">
      
      <h3 className="title">Booking #{booking.id}</h3>
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
