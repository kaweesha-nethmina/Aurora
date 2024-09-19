// components/ReservationTable.tsx
import React from 'react';
import { Reservation } from '../AcceptRejectBooking/ReserveTable';
import ActionButtons from '../AcceptRejectBooking/ActionButtons';

interface ReservationTableProps {
  reservations: Reservation[];
  handleAccept: (id: number) => void;
  handleReject: (id: number) => void;
}

const ReservationTable: React.FC<ReservationTableProps> = ({ reservations, handleAccept, handleReject }) => {
  return (
    <table className="reservation-table">
      <thead>
        <tr>
          <th>Arrival Date</th>
          <th>Departure Date</th>
          <th>No. of Guests</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id}>
            <td>{reservation.arrivalDate}</td>
            <td>{reservation.departureDate}</td>
            <td>{reservation.noOfGuests}</td>
            <td>{reservation.name}</td>
            <td>{reservation.phone}</td>
            <td>{reservation.email}</td>
            <td>
              <ActionButtons
                status={reservation.status}
                onAccept={() => handleAccept(reservation.id)}
                onReject={() => handleReject(reservation.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReservationTable;
