// /reservations/components/ReservationDetailsPage.tsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './reservation.css';

const ReservationDetailsPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const reservationData = state?.reservationData;

  const handleCancel = () => {
    // Cancel logic
    
    navigate('/cancelbooking');
  };

  const handleEdit = () => {
    // Edit logic (could redirect back to the form)
    navigate('/');
  };

  const handleConfirm = () => {
    // Confirm logic
    alert('Reservation Confirmed');
    navigate('/');
  };

  return (
    <div className="reservation-details-page">
      <h2>Reservation Details</h2>
      {reservationData ? (
        <>
          <p><strong>Name:</strong> {reservationData.name}</p>
          <p><strong>Phone:</strong> {reservationData.phone}</p>
          <p><strong>Email:</strong> {reservationData.email}</p>
          <p><strong>Arrival Date:</strong> {reservationData.arrivalDate}</p>
          <p><strong>Departure Date:</strong> {reservationData.departureDate}</p>
          <p><strong>Guests:</strong> {reservationData.numGuests}</p>
          <p><strong>Status:</strong>Pending.. {}</p>

          <div className="action-buttons">
            <Link to="/cancelbooking"> <button onClick={handleCancel} className="cancel-button">Cancel</button></Link>
            <button onClick={handleConfirm} className="confirm-button">Confirm</button>
          </div>
        </>
      ) : (
        <p>No reservation data found.</p>
      )}
    </div>
  );
};

export default ReservationDetailsPage;
