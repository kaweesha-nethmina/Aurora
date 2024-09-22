// /reservations/Reservation.tsx
import React, { useState } from 'react';
import ReservationForm from '../Reservation/ReservationForm';
import CalendarView from '../Reservation/CalendarView';
import { useNavigate } from 'react-router-dom';
import './reservation.css';
import Header from '../../../../core/components/Header';

const MenuReservation: React.FC = () => {
  const [reservationData, setReservationData] = useState<any>(null);
  const navigate = useNavigate();

  const handleFormSubmit = (data: any) => {
    setReservationData(data);
  };

  const handleProceedToDetails = () => {
    navigate('/reservation-details', { state: { reservationData } });
  };

  return (
    <div className="reservation-page">
      <Header activeTab={'restaurant-bar'} />
      <ReservationForm onSubmit={handleFormSubmit} />
      {reservationData && (
        <>
          <CalendarView arrivalDate={reservationData.arrivalDate} departureDate={reservationData.departureDate} />
          <button onClick={handleProceedToDetails} className="proceed-button">Proceed to Details</button>
        </>
      )}
    </div>
  );
};

export default MenuReservation;
