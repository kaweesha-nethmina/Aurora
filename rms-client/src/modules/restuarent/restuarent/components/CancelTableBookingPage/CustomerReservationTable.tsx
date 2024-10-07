import React, { useState, useEffect } from 'react';
import './CustomerReservationTable.css'; // New CSS file for unique class names
import Header from '../../../../core/components/Header';
import Navbar from '../HomePage/ResNavbar';

export interface Reservation {
  _id: string;
  arrivalDate: string;
  departureDate: string;
  numGuests: number;
  name: string;
  foodcode: string;
  phone: string;
  email: string;
  status: string;
}

const CustomerReservationTable: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>('');

  useEffect(() => {
    // Retrieve logged-in user's full name from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userProfile = JSON.parse(userData);
      const userFullName = `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim();
      setFullName(userFullName);
    }
  }, []);

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

  // Filter reservations by the logged-in user's full name
  useEffect(() => {
    if (fullName) {
      const filtered = reservations.filter((reservation) => reservation.name === fullName);
      setFilteredReservations(filtered);
    }
  }, [reservations, fullName]);

  const handleCancel = async (id: string): Promise<void> => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this reservation?');
    if (!confirmCancel) return;

    try {
      const response = await fetch(`http://localhost:5000/api/table-reservations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }

      setFilteredReservations((prev) => prev.filter((reservation) => reservation._id !== id));
      alert('Reservation canceled successfully');
    } catch (error) {
      alert('Failed to cancel the reservation. Please try again.');
      console.error('Error canceling reservation:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="customer-reservation-container">
        <Header activeTab={''} />
        <Navbar />
      <h1 className="customer-reservation-heading">Your Table Reservations</h1>
      <table className="customer-reservation-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Arrival Date</th>
            <th>Departure Date</th>
            <th>Guests</th>
            <th>Food Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.name}</td>
              <td>{reservation.arrivalDate.split('T')[0]}</td>
              <td>{reservation.departureDate.split('T')[0]}</td>
              <td>{reservation.numGuests}</td>
              <td>{reservation.foodcode}</td>
              <td>{reservation.status}</td>
              <td>
                <button className="customer-reservation-cancel-button" onClick={() => handleCancel(reservation._id)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerReservationTable;
