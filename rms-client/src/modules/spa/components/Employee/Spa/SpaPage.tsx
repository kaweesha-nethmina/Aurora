import React, { useState } from 'react';
import './spaPage.css';
import Header from '../../../../core/components/Header';
import Navbar from '../nav/SNavbar';
import { Link } from 'react-router-dom';
import SpaImg from '../../../images/SpapagenNew.jpg';

const SpaPage: React.FC = () => {
  const [isBooked, setIsBooked] = useState(false);

  const handleBookNow = () => {
    setIsBooked(true);
  };

  return (
    <div className="page-containerS">
      <Header activeTab={'spa-wellness'} />
      <Navbar />
      <div className="image-section">
        <img
          src={SpaImg}
          alt="Spa"
          className="page-image"
        />
      </div>
      <div className="description-section">
        <h2 className="title">Spa</h2>
        <p className="description">
          Relax and rejuvenate with our luxurious spa treatments.
        </p>
        <Link to='/SpaAppointmentForm'> <button
          className={`book-button ${isBooked ? 'booked' : ''}`}
          onClick={handleBookNow}
        >
          {isBooked ? 'Booked' : 'Book Now'}
        </button></Link>
      </div>
    </div>
  );
};

export default SpaPage;
