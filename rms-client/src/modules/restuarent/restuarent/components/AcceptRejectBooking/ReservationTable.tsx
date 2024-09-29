import React from 'react';
import { Reservation } from './ReserveTable';
import './Tablereserve.css';

interface ReservationTableProps {
  reservations: Reservation[];
  handleAccept: (id: string) => void; // Use string to match MongoDB ObjectID
  handleReject: (id: string) => void; // Use string to match MongoDB ObjectID
}

const ReservationTable: React.FC<ReservationTableProps> = ({ reservations, handleAccept, handleReject }) => {
  return (
    <table className="reservation-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Arrival Date</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Food Code</th>
          <th>Departure Date</th>
          <th>No. of Guests</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation._id}> {/* Ensure you access the correct ID property */}
            <td>{reservation.name}</td>
            <td>{reservation.phone}</td>
            <td>{reservation.email}</td>
            <td>{new Date(reservation.arrivalDate).toLocaleDateString()}</td>
            <td>{reservation.checkin}</td>
            <td>{reservation.checkout}</td>
            <td>{reservation.foodcode}</td>
            <td>{new Date(reservation.departureDate).toLocaleDateString()}</td>
            <td>{reservation.numGuests}</td>
            <td>{reservation.status}</td>
            <td>
              <button onClick={() => {
                console.log(`Accepting reservation with ID: ${reservation._id}`); // Update to use _id
                handleAccept(reservation._id); // Update to use _id
              }} className="accept-btn">Accept</button>
              <button onClick={() => {
                console.log(`Rejecting reservation with ID: ${reservation._id}`); // Update to use _id
                handleReject(reservation._id); // Update to use _id
              }} className="reject-btn">Reject</button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  );
};

export default ReservationTable;
