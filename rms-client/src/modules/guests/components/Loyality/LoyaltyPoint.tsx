import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoyaltyPoint.css'; // Make sure to create or update this CSS file
import Header from '../../../core/components/Header';
import Navbar from '../nav/GNavbar';
import { Link } from 'react-router-dom';
// Assuming you have a Navbar component

interface Reservation {
  _id: string; // Use string to match MongoDB ObjectID
  email: string; // Assuming email is used to identify the user
}

const LoyaltyPoint: React.FC = () => {
  const [roomReservations, setRoomReservations] = useState<Reservation[]>([]);
  const [tableReservations, setTableReservations] = useState<Reservation[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch room reservations
  const fetchRoomReservations = async () => {
    try {
      const response = await axios.get<Reservation[]>('http://localhost:5000/api/bookings'); // Endpoint for room reservations
      setRoomReservations(response.data);
    } catch (error) {
      setError('Error fetching room reservations');
      console.error(error);
    }
  };

  // Function to fetch table reservations
  const fetchTableReservations = async () => {
    try {
      const response = await axios.get<Reservation[]>('http://localhost:5000/api/table-reservations'); // Endpoint for table reservations
      setTableReservations(response.data);
    } catch (error) {
      setError('Error fetching table reservations');
      console.error(error);
    }
  };

  // Function to calculate loyalty points
  const calculateLoyaltyPoints = () => {
    const roomPoints = roomReservations.length * 10; // Example: 10 points for each room reservation
    const tablePoints = tableReservations.length * 5; // Example: 5 points for each table reservation
    const totalPoints = roomPoints + tablePoints;
    setLoyaltyPoints(totalPoints);
  };

  // Fetch reservations on component mount
  useEffect(() => {
    const fetchReservations = async () => {
      await Promise.all([fetchRoomReservations(), fetchTableReservations()]);
      setLoading(false);
    };

    fetchReservations();
  }, []);

  // Calculate loyalty points whenever reservations change
  useEffect(() => {
    if (!loading) {
      calculateLoyaltyPoints();
    }
  }, [roomReservations, tableReservations, loading]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="loyalty-point-container">
      <Header activeTab={''} />
      <Navbar />
      <div className="loyalty-point-content">
        <h1 className="loyalty-point-heading">Loyalty Points</h1>
        <div className="loyalty-point-card">
          <h2 className="loyalty-points-highlight">{loyaltyPoints}</h2>
          <p className="loyalty-points-text">loyalty points earned!</p>
        </div>
        <div className="loyalty-points-details">
          <h3>Room Reservations: {roomReservations.length}</h3>
          <h3>Table Reservations: {tableReservations.length}</h3>
        </div>
        <Link to="/HomePage1" > <button className='btnOffer'>My Offers</button></Link>
      </div>
    </div>
  );
};

export default LoyaltyPoint;
