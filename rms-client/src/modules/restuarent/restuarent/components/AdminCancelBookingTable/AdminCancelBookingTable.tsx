import React, { useState } from 'react';
import '../AdminCancelBookingTable/AdmincancelBookingTable.css';

interface Booking {
  id: number;
  name: string;
  phoneNumber: string;
  checkinDate: string;
  cancellationReason: string;
}

const AdminCancelBookingTable = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 1, name: 'John Doe', phoneNumber: '1234567890', checkinDate: '2024-01-01', cancellationReason: 'Personal reasons' },
    { id: 2, name: 'Jane Doe', phoneNumber: '9876543210', checkinDate: '2024-01-15', cancellationReason: 'Change of plans' },
  ]);

  const handleNotify = (id: number) => {
    alert(`Notification sent for booking ${id}`);
  };

  return (
    <div className="container">
      <h1 className="heading">Cancel Booking Table</h1>
      <table className="booking-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Phone Number</th>
            <th className="table-header">Checkin Date</th>
            <th className="table-header">Cancellation Reason</th>
            <th className="table-header">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="table-cell">{booking.name}</td>
              <td className="table-cell">{booking.phoneNumber}</td>
              <td className="table-cell">{booking.checkinDate}</td>
              <td className="table-cell">{booking.cancellationReason}</td>
              <td className="table-cell">
                <button
                  className="notify-button"
                  onClick={() => handleNotify(booking.id)}
                >
                  Notify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCancelBookingTable;
