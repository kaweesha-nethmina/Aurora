import React, { useState } from 'react';
import './reservation.css';

interface ReservationFormProps {
  onSubmit: (data: any) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    arrivalDate: '',
    departureDate: '',
    numGuests: 1,
    name: '',
    checkin: '',
    checkout: '',
    foodcode: '',
    phone: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <h2 className="form-title">Reserve a Table</h2>
      <input className="input-date arrival-date" type="date" name="arrivalDate" onChange={handleChange} required />
      <input className="input-date departure-date" type="date" name="departureDate" onChange={handleChange} required />
      <input className="input-number num-guests" type="number" name="numGuests" placeholder="No Of Guests" min="1" onChange={handleChange} required />
      <input className="input-text name" type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input className="input-text checkin" type="time" name="checkin" placeholder="Check in" onChange={handleChange} required />
      <input className="input-text checkout" type="time" name="checkout" placeholder="Check out" onChange={handleChange} required />
      <input className="input-tel foodcode" type="text" name="foodcode" placeholder="Food Code" onChange={handleChange} required />
      <input className="input-tel phone" type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
      <input className="input-email email" type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <button className="check-button" type="submit">Check Availability</button>
    </form>
  );
};

export default ReservationForm;
