import React, { useState } from 'react';
import './medicalPage.css';
import Header from '../../../../core/components/Header';
import Navbar from '../nav/SNavbar';
import { Link } from 'react-router-dom';
import MedIMG from '../../../images/Medicalpage.jpg';

const MedicalPage: React.FC = () => {
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
          src={MedIMG}
          alt="Medical Center"
          className="page-image"
        />
      </div>
      <div className="description-section">
        <h2 className="title">Medical Center</h2>
        <p className="description">
          Receive top-tier medical services from our expert healthcare team.
        </p>
        <Link to='/MedicalAppointmentForm'> <button
          className={`book-button ${isBooked ? 'booked' : ''}`}
          onClick={handleBookNow}
        >
          {isBooked ? 'Booked' : 'Book Now'}
        </button></Link>
      </div>
    </div>
  );
};

export default MedicalPage;
