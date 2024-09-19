// Reservation.tsx
import React, { useState } from 'react';
import ReservationTable from '../AcceptRejectBooking/ReservationTable';
import '../AcceptRejectBooking/Tablereserve.css';

export interface Reservation {
  id: number;
  arrivalDate: string;
  departureDate: string;
  noOfGuests: number;
  name: string;
  phone: string;
  email: string;
  status: string;
}

const initialReservations: Reservation[] = [
  { id: 1, arrivalDate: '2024-01-01', departureDate: '2024-01-05', noOfGuests: 2, name: 'John Doe', phone: '1234567890', email: 'john@example.com', status: 'pending' },
  { id: 2, arrivalDate: '2024-01-10', departureDate: '2024-01-15', noOfGuests: 3, name: 'Jane Doe', phone: '9876543210', email: 'jane@example.com', status: 'pending' },
];

const ReserveTablePage: React.FC = () => {
  const [reservations, setReservations] = useState(initialReservations);

  const handleAccept = (id: number) => {
    setReservations(reservations.map((reservation) =>
      reservation.id === id ? { ...reservation, status: 'accepted' } : reservation
    ));
  };

  const handleReject = (id: number) => {
    setReservations(reservations.map((reservation) =>
      reservation.id === id ? { ...reservation, status: 'rejected' } : reservation
    ));
  };

  return (
    <div className="container">
      <h1 className="heading">Reserve a Table</h1>
      <ReservationTable
        reservations={reservations}
        handleAccept={handleAccept}
        handleReject={handleReject}
      />
    </div>
  );
};

export default ReserveTablePage;
