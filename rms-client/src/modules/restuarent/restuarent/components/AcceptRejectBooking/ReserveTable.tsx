import React, { useState, useEffect } from 'react';
import ReservationTable from '../AcceptRejectBooking/ReservationTable';
import '../AcceptRejectBooking/Tablereserve.css';

export interface Reservation {
  _id: string; // Use string to match MongoDB ObjectID
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

const ReserveTablePage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/table-reservations');
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        setReservations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const sendEmail = async (email: string, subject: string, message: string) => {
    try {
      await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, message }),
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleAccept = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:5000/api/table-reservations/${id}/accept`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to accept reservation');
      }

      const updatedReservation = await response.json();
      setReservations((prev) =>
        prev.map((res) => (res._id === id ? updatedReservation : res))
      );

      // Send email notification
      await sendEmail(updatedReservation.email, 'Reservation Accepted', 'Your reservation has been accepted.');

    } catch (error) {
      alert('Failed to update reservation status. Please try again.');
      console.error(error); // Log the error for debugging
    }
  };

  const handleReject = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:5000/api/table-reservations/${id}/reject`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to reject reservation');
      }

      const updatedReservation = await response.json();
      setReservations((prev) =>
        prev.map((res) => (res._id === id ? updatedReservation : res))
      );

      // Send email notification
      await sendEmail(updatedReservation.email, 'Reservation Rejected', 'Your reservation has been rejected.');

    } catch (error) {
      alert('Failed to update reservation status. Please try again.');
      console.error(error); // Log the error for debugging
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
