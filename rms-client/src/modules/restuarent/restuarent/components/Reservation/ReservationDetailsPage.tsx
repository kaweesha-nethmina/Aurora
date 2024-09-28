// /reservations/components/ReservationDetailsPage.tsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './reservation.css';
import Header from '../../../../core/components/Header';

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
    navigate('/menupayment');
  };

  return (
    <div className="reservation-details-page">
      <Header activeTab={'restaurant-bar'} />
      <div className='resdetails'>
      <h2>Reservation Details</h2>
      {reservationData ? (
        <>
          <p><strong>Name:</strong> {reservationData.name}</p>
          <p><strong>Phone:</strong> {reservationData.phone}</p>
          <p><strong>Email:</strong> {reservationData.email}</p>
          <p><strong>Arrival Date:</strong> {reservationData.arrivalDate}</p>
          <p><strong>Check in:</strong> {reservationData.checkin}</p>
          <p><strong>Check out:</strong> {reservationData.checkout}</p>
          <p><strong>Food Codes:</strong> {reservationData.foodcode}</p>
          <p><strong>Departure Date:</strong> {reservationData.departureDate}</p>
          <p><strong>Guests:</strong> {reservationData.numGuests}</p>
          <p><strong>Status:</strong>Pending.. {}</p>

          <div className="action-buttonsR">
            <Link to="/cancelbooking"> <button onClick={handleCancel} className="cancel-button2">Cancel</button></Link>
            <button onClick={handleConfirm} className="confirm-button2">Reserve Now</button>
          </div>
        </>
      ) : (
        <p>No reservation data found.</p>
      )}
      </div>
    </div>
  );
};

export default ReservationDetailsPage;
