import React, { useEffect, useState } from 'react';
import '../AcceptRejectBooking/Tablereserve.css';

export interface Reservation {
  _id: string;
  arrivalDate: string;
  departureDate: string;
  numGuests: number;
  name: string;
  checkin: string;
  checkout: string;
  foodcode: string;
  phone: string;
  email: string;
  status: string;
}

const MonthlyReservationReport: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonthlyReservations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/table-reservations/monthly');
        if (!response.ok) {
          throw new Error('Failed to fetch monthly reservations');
        }
        const data = await response.json();
        setReservations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyReservations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="heading">Monthly Reservation Report</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation._id}>
              <td>{reservation.name}</td>
              <td>{reservation.email}</td>
              <td>{reservation.phone}</td>
              <td>{reservation.checkin}</td>
              <td>{reservation.checkout}</td>
              <td>{reservation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyReservationReport;
