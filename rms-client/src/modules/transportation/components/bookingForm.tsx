import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/BookingForm.css';
import Header from '../../core/components/Header';
import Navbar from './TNavbar';

interface Booking {
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  status: string;
  vehicle: string;
}

const BookingForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [vehicle, setVehicle] = useState('Car'); // Default to Car
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [, setShowWaitingTable] = useState(false);
  const [, setShowCheckboxes] = useState(false);
  const [, setSelectedBookings] = useState<number[]>([]);

  // Fetch user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userProfile = JSON.parse(userData);
      setName(`${userProfile.firstName || ''} ${userProfile.lastName || ''}`);
      setEmail(userProfile.contact_info?.email || '');
      setPhone(userProfile.phone || ''); // Assuming phone is stored in contact_info
    }
  }, []);

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[0-9]{10}$/; // Simple validation for 10-digit phone number
    return phoneRegex.test(number);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validatePhoneNumber(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    const newBooking: Booking = {
      name,
      email,
      phone,
      pickup,
      dropoff,
      date,
      time,
      status: 'pending',
      vehicle,
    };

    try {
      // Send the booking data to the backend
      await axios.post('http://localhost:5000/api/TransportBooking/bookings', newBooking);
      // Update local state if the booking is successful
      setBookings([...bookings, newBooking]);
      setShowWaitingTable(true);
      resetForm();
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPickup('');
    setDropoff('');
    setVehicle('Car'); // Reset to default vehicle
    setDate('');
    setTime('');
    setShowCheckboxes(false); // Reset checkboxes
    setSelectedBookings([]); // Clear selection
  };




  return (
    <div className="booking-container">
      <Header activeTab={'transportation'} />
      <Navbar />
      <div className="booking-card">
        <h1 className="booking-card-title">Book Your Vehicle</h1>
        <form onSubmit={handleSubmit} className="booking-form">
          {/* Form Fields */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name<span>*</span></label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email<span>*</span></label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {/* Phone and Pickup */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone<span>*</span></label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                placeholder="Enter your phone number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pickup">Pickup Location<span>*</span></label>
              <input
                id="pickup"
                type="text"
                value={pickup}
                onChange={(event) => setPickup(event.target.value)}
                required
                placeholder="Enter pickup location"
              />
            </div>
          </div>

          {/* Dropoff and Vehicle Type */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dropoff">Dropoff Location<span>*</span></label>
              <input
                id="dropoff"
                type="text"
                value={dropoff}
                onChange={(event) => setDropoff(event.target.value)}
                required
                placeholder="Enter dropoff location"
              />
            </div>
            <div className="form-group">
              <label htmlFor="vehicle">Vehicle Type<span>*</span></label>
              <select
                className="form-group1"
                id="vehicle"
                value={vehicle}
                onChange={(event) => setVehicle(event.target.value)}
                required
              >
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="Tuk Tuk">Tuk Tuk</option>
              </select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date<span>*</span></label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time<span>*</span></label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                required
              />
            </div>
          </div>

          <button className="booking-submit-btn" type="submit">Book Now</button>
        </form>
      </div>

      
    </div>
  );
};

export default BookingForm;
