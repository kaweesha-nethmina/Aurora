import React from 'react';
import styles from '../CancelBookingForm.module.css';
import { useCancelBookingForm } from '../hooks/useCancelBookingForm';
import Navbar from './Navbar';

const CancelBookingForm: React.FC = () => {
  const { bookingId, checkinDate, cancellationReason, isSubmitted, handleChange, handleSubmit } = useCancelBookingForm();

  return (
    <div className={styles.container}>
      <Navbar />
      <h2 className={styles.title}>Cancel Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="bookingId" className={styles.label}>Booking ID</label>
          <input
            type="text"
            id="bookingId"
            value={bookingId}
            onChange={(event) => handleChange(event, 'bookingId')}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="checkinDate" className={styles.label}>Check-in Date</label>
          <input
            type="date"
            id="checkinDate"
            value={checkinDate}
            onChange={(event) => handleChange(event, 'checkinDate')}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cancellationReason" className={styles.label}>Cancellation Reason</label>
          <textarea
            id="cancellationReason"
            value={cancellationReason}
            onChange={(event) => handleChange(event, 'cancellationReason')}
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.button}>
          Cancel Booking
        </button>
        {isSubmitted && (
          <p className={styles.successMessage}>Booking cancellation request submitted successfully.</p>
        )}
      </form>
    </div>
  );
};

export default CancelBookingForm;
