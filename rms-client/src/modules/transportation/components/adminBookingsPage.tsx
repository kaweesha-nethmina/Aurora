import React, { useState } from 'react';
import './style/AdminBookingsPage.css';

interface Booking {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: string;
}

const sampleBookings: Booking[] = [
  { name: 'kaweesha Nethmina', email: 'kaweesha@example.com', phone: '123456789', date: '2024-08-25', time: '10:00 AM', status: 'pending' },
  { name: 'Kawindu Senanayaka', email: 'Kavindu@example.com', phone: '2468101214', date: '2024-08-26', time: '2:00 PM', status: 'approved' },
  { name: 'Ashen Senarathna', email: 'ashen@example.com', phone: '5555555555', date: '2024-08-27', time: '12:00 PM', status: 'pending' },
];

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState(sampleBookings);

  const handleApprove = (index: number) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = 'approved';
    setBookings(updatedBookings);
  };

  const handleCancel = (index: number) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = 'canceled';
    setBookings(updatedBookings);
  };

  return (
    <div className="admin-container1">
      <h2 className="admin-title1">Bookings</h2>
      <table className="admin-table1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.phone}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td className={booking.status}>{booking.status}</td>
              <td>
                {booking.status === 'pending' && (
                  <div className="action-buttons1">
                    <button
                      className="approve-btn1"
                      onClick={() => handleApprove(index)}
                    >
                      Approve
                    </button>
                    <button
                      className="cancel-btn1"
                      onClick={() => handleCancel(index)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookingsPage;
