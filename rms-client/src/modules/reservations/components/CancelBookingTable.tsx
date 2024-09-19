import React, { useState } from 'react';
import styles from '../CancelBookingTable.module.css';

interface Booking {
  id: string;
  checkinDate: string;
  cancellationReason: string;
  notified: boolean;
}

const CancelBookingTable: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 'BK001', checkinDate: '2023-03-01', cancellationReason: 'Personal reasons', notified: false },
    { id: 'BK002', checkinDate: '2023-03-15', cancellationReason: 'Change of plans', notified: false },
    { id: 'BK003', checkinDate: '2023-04-01', cancellationReason: 'Medical emergency', notified: false },
  ]);

  const handleNotify = (id: string) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, notified: true } : booking
    ));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cancel Reservations</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>Booking ID</th>
            <th className={styles.header}>Check-in Date</th>
            <th className={styles.header}>Cancellation Reason</th>
            <th className={styles.header}>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className={styles.cell}>{booking.id}</td>
              <td className={styles.cell}>{booking.checkinDate}</td>
              <td className={styles.cell}>{booking.cancellationReason}</td>
              <td className={styles.cell}>
                <button
                  className={styles.button}
                  onClick={() => handleNotify(booking.id)}
                  disabled={booking.notified}
                >
                  {booking.notified ? 'Notified' : 'Notify'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CancelBookingTable;
