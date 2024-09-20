// guest/components/LoyaltyPointsPage/LoyaltyPointsPage.tsx

import React, { useState, useEffect } from 'react';
import './LoyaltyPointsPage.css';

const LoyaltyPointsPage = () => {
  const [points, setPoints] = useState(0);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch reservation history and calculate points here
    const fetchReservations = async () => {
      // Example fetching data
      const response = await fetch('/api/reservations'); // Update with your API endpoint
      const data = await response.json();
      setReservations(data);
      const totalPoints = data.reduce((acc: any, res: { pointsEarned: any; }) => acc + res.pointsEarned, 0);
      setPoints(totalPoints);
    };

    fetchReservations();
  }, []);

  return (
    <div className="loyalty-points-page">
      <h1 className="title">Loyalty Points</h1>
      <p className="total-points">Total Points: {points}</p>
      <h2 className="history-title">Reservation History</h2>
      <ul className="reservations-list">
        {reservations.map((res, index) => (
          <li key={index} className="reservation-item">
            {res.roomName} - Points Earned: {res.pointsEarned}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoyaltyPointsPage;
