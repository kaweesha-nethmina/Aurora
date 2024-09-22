import React, { useState } from 'react';
import './gymPage.css';
import Header from '../../../../core/components/Header';
import Navbar from '../nav/SNavbar';
import { Link } from 'react-router-dom';

const GymPage: React.FC = () => {
  const [isBooked, setIsBooked] = useState(false);

  const handleBookNow = () => {
    setIsBooked(true);
  };

  return (
    <div className="page-containerS">
      <Header activeTab={''} />
      <Navbar />
      <div className="image-section">
        <img
          src="https://picsum.photos/200/300"
          alt="Gym"
          className="page-image"
        />
      </div>
      <div className="description-section">
        <h2 className="title">Gym</h2>
        <p className="description">
          Enjoy the finest equipment and personal training at our modern gym.
        </p>
        <Link to='/GymAppointmentForm'> <button
          className={`book-button ${isBooked ? 'booked' : ''}`}
          onClick={handleBookNow}
        >
          {isBooked ? 'Booked' : 'Book Now'}
        </button></Link>
      </div>
    </div>
  );
};

export default GymPage;
