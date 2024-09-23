import React, { useState } from 'react';
import styles from './CancelTableBookingPage.module.css';
import { cancelBooking } from '../../services/cancelService';
import Header from '../../../../core/components/Header';

const CancelTableBookingPage = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    cancelBooking({ name, phoneNumber, checkInDate, cancellationReason });
    console.log('Booking cancelled:', { name, phoneNumber, checkInDate, cancellationReason });
  };

  return (
    <div className={styles.container}>
      <Header activeTab={''} />
      <h2 className={styles.title}>Cancel Table Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">Name:</label>
          <input
            className={styles.input}
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="phoneNumber">Phone Number:</label>
          <input
            className={styles.input}
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="checkInDate">Check-in Date:</label>
          <input
            className={styles.input}
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={(event) => setCheckInDate(event.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="cancellationReason">Cancellation Reason:</label>
          <textarea
            className={styles.input}
            id="cancellationReason"
            value={cancellationReason}
            onChange={(event) => setCancellationReason(event.target.value)}
          />
        </div>
        <button className={styles.button} type="submit">
          Cancel Booking
        </button>
      </form>
    </div>
  );
};

export default CancelTableBookingPage;
