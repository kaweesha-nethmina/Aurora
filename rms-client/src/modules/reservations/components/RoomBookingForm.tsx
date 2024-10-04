import React, { useState, useEffect } from 'react';
import '../RoomBookingForm.css';
import Header from '../../core/components/Header';
import axios from 'axios';

// Define an interface for the booking data
interface BookingData {
  roomType: string;
  arrivalDate: string;
  departureDate: string;
  specialRequests: string;
  paymentMethod: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  email: string; // Include email in the booking data
}

// Define an interface for user profile
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  username?: string;
}

const RoomBookingForm: React.FC = () => {
  const [roomType, setRoomType] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [email, setEmail] = useState(''); // State for email
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // State for user profile

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData && parsedData.firstName && parsedData.lastName && parsedData.contact_info) {
          setUserProfile({
            firstName: parsedData.firstName,
            lastName: parsedData.lastName,
            email: parsedData.contact_info.email,
            phone: parsedData.phone,
            username: parsedData.contact_info.username,
          });
          setEmail(parsedData.contact_info.email); // Set email state from local storage
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleRoomTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomType(event.target.value);
  };

  const handleArrivalDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArrivalDate(event.target.value);
  };

  const handleDepartureDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepartureDate(event.target.value);
  };

  const handleSpecialRequestsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSpecialRequests(event.target.value);
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(event.target.value);
  };

  const handleExpirationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(event.target.value);
  };

  const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const bookingData: BookingData = {
      roomType,
      arrivalDate,
      departureDate,
      specialRequests,
      paymentMethod,
      cardNumber,
      expirationDate,
      cvv,
      email,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
      
      if (response.status === 201) {
        setBookingSuccess(true);
        alert('Room booked successfully!');
      }
    } catch (error: any) {
      console.error('Error booking room:', error);
      alert('Error booking room. Please try again.');
    }
  };

  return (
    <div className="booking-form-container">
      <Header activeTab={''} />
      
      <h2 className="booking-form-title">Room Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="room-type">Room Type</label>
          <select
            id="room-type"
            value={roomType}
            onChange={handleRoomTypeChange}
          >
            <option value="">Select Room Type</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
            <option value="family">Family</option>
            <option value="deluxe">Deluxe</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="arrival-date">Check-in Date</label>
          <input
            id="arrival-date"
            type="date"
            value={arrivalDate}
            onChange={handleArrivalDateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="departure-date">Check-out Date</label>
          <input
            id="departure-date"
            type="date"
            value={departureDate}
            onChange={handleDepartureDateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="special-requests">Special Requests</label>
          <textarea
            id="special-requests"
            value={specialRequests}
            onChange={handleSpecialRequestsChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required // Make email required
          />
        </div>
        <div className="form-group">
          <label htmlFor="payment-method">Payment Method</label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="">Select Payment Method</option>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        {paymentMethod === 'credit-card' && (
          <div className="credit-card-details">
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input
                id="card-number"
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                required // Make card number required
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiration-date">Expiration Date</label>
              <input
                id="expiration-date"
                type="text"
                value={expirationDate}
                onChange={handleExpirationDateChange}
                required // Make expiration date required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                type="text"
                value={cvv}
                onChange={handleCvvChange}
                required // Make CVV required
              />
            </div>
          </div>
        )}
        
        <button className='btn' type="submit">Book Room</button>
        
        {bookingSuccess && (
          <p className="success-message">Room booked successfully!</p>
        )}
      </form>
    </div>
  );
};

export default RoomBookingForm;
