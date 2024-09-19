import React from 'react';

interface ReservationDetailsFormProps {
  reservationDetails: {
    roomType: string;
    numberOfGuests: string;
  };
  handleReservationDetailsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ReservationDetailsForm: React.FC<ReservationDetailsFormProps> = ({ reservationDetails, handleReservationDetailsChange }) => (
  <div className="reservation-details">
    <div className="form-group">
      <label htmlFor="roomType">Room Type</label>
      <select
        id="roomType"
        name="roomType"
        value={reservationDetails.roomType}
        onChange={handleReservationDetailsChange}
      >
        <option value="">Select Room Type</option>
        <option value="single">Single</option>
        <option value="double">Double</option>
        <option value="suite">Suite</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="numberOfGuests">Number of Guests</label>
      <input
        type="number"
        id="numberOfGuests"
        name="numberOfGuests"
        value={reservationDetails.numberOfGuests}
        onChange={handleReservationDetailsChange}
      />
    </div>
  </div>
);

export default ReservationDetailsForm;
