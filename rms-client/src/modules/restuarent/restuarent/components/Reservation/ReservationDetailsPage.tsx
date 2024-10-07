import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './reservation.css';
import Header from '../../../../core/components/Header';

const ReservationDetailsPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const reservationData = state?.reservationData;

  const handleCancel = () => {
    navigate('/menu');
    alert('Reservation canceled');
  };


  const handleConfirm = async () => {
    if (!reservationData) {
      alert('No reservation data to submit.');
      return;
    }

    // Add the status property to reservationData
    const reservationToSubmit = {
      ...reservationData,
      status: 'pending', // Set the status to 'pending'
    };

    try {
      const response = await fetch('http://localhost:5000/api/table-reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationToSubmit), // Send the modified reservation data
      });

      if (response.ok) {
        alert('Reservation Confirmed');
        navigate('/menupayment'); // Redirect to payment page
      } else {
        alert('Failed to confirm reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="reservation-details-page">
      <Header activeTab={'restaurant-bar'} />
      <div className='resdetailsf'>
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
            <p><strong>Status:</strong> Pending...</p>

            <div className="action-buttonsR">
              <Link to="/reservation-mybooking">
                <button  className="cancel-button2">Cancel</button>
              </Link>
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
