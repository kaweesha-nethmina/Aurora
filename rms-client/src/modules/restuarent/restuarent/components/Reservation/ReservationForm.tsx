
// /reservations/components/ReservationForm.tsx
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
      <h2>Reserve a Table</h2>
      <input type="date" name="arrivalDate" onChange={handleChange} required />
      <input type="date" name="departureDate" onChange={handleChange} required />
      <input type="number" name="numGuests" min="1" onChange={handleChange} required />
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <button className='check' type="submit">Check Availability</button>
    </form>
  );
};

export default ReservationForm;
