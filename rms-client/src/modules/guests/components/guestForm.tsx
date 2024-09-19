// components/guestForm.tsx
import './guestForm.css'
import React from 'react';
import InputField from './inputField';
import { Guest } from '../lib/guestTypes';
import useGuestForm from '../hooks/useGuestForm';

interface GuestFormProps {
  onSubmit: (guest: Guest) => void;
}

const GuestForm: React.FC<GuestFormProps> = ({ onSubmit }) => {
  const { guest, handleInputChange } = useGuestForm();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(guest);
  };

  return (
    <form className="guest-form" onSubmit={handleSubmit}>
      <InputField
        id="name"
        label="Name"
        type="text"
        name="name"
        value={guest.name}
        onChange={handleInputChange}
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        name="email"
        value={guest.email}
        onChange={handleInputChange}
      />
      <InputField
        id="phoneNumber"
        label="Phone Number"
        type="text"
        name="phoneNumber"
        value={guest.phoneNumber}
        onChange={handleInputChange}
      />
      <InputField
        id="arrivalDate"
        label="Arrival Date"
        type="date"
        name="arrivalDate"
        value={guest.arrivalDate}
        onChange={handleInputChange}
      />
      <InputField
        id="departureDate"
        label="Departure Date"
        type="date"
        name="departureDate"
        value={guest.departureDate}
        onChange={handleInputChange}
      />
      <InputField
        id="roomNumber"
        label="Room Number"
        type="text"
        name="roomNumber"
        value={guest.roomNumber}
        onChange={handleInputChange}
      />
      <button className="submit-button" type="submit">
        Save
      </button>
    </form>
  );
};

export default GuestForm;
