import React, { useState } from 'react';
import ReservationDetailsForm from './ReservationDetailsForm';
import PaymentDetailsForm from './PaymentDetailsForm';
import './styles/FormStyles.css'; // Import the CSS file

const HotelRoomReservationForm: React.FC = () => {
  const [reservationDetails, setReservationDetails] = useState({
    roomType: '',
    numberOfGuests: ''
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const handleReservationDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReservationDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <ReservationDetailsForm 
          reservationDetails={reservationDetails} 
          handleReservationDetailsChange={handleReservationDetailsChange} 
        />
        <PaymentDetailsForm 
          paymentDetails={paymentDetails} 
          handlePaymentDetailsChange={handlePaymentDetailsChange} 
        />
        <button className="submit-button" type="submit">Make Reservation</button>
      </form>
    </div>
  );
};

export default HotelRoomReservationForm;
