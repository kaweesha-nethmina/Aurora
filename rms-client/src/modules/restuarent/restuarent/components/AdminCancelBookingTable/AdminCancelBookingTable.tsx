import React, { useEffect, useState } from 'react';
import '../AdminCancelBookingTable/AdmincancelBookingTable.css';

interface Booking {
  phone: string;
  _id: string;
  name: string;
  phoneNumber: string;
  checkin: string;
  cancellationReason: string;
  email: string;
  status: string;
}

const AdminCancelBookingTable: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [reason, setReason] = useState('');

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/table-reservations');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleNotify = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const sendNotification = async () => {
    if (!selectedBooking) return;

    try {
      const response = await fetch('http://localhost:5000/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: selectedBooking.email,
          message: `Your reservation ${reason}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from server:', errorData);
        throw new Error('Failed to send notification');
      }

      alert(`Notification sent to ${selectedBooking.name} for booking ID: ${selectedBooking._id}`);
      setIsModalOpen(false);
      setReason('');
    } catch (error) {
      console.error('Failed to send notification:', error);
      alert('Failed to send notification. Please try again.');
    }
  };

  // Function to delete a booking
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/table-reservations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      // Update the bookings list after successful deletion
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
      alert('Booking deleted successfully');
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Notify Booking Status</h1>
      <table className="booking-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Phone Number</th>
            <th className="table-header">E-mail</th>
            <th className="table-header">Status</th>
            <th className="table-header">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="table-cell">{booking.name}</td>
              <td className="table-cell">{booking.phone}</td>
              <td className="table-cell">{booking.email}</td>
              <td className="table-cell">{booking.status}</td>
              <td className="table-cell">
                <button
                  className="notify-button"
                  onClick={() => handleNotify(booking)}
                >
                  Notify
                </button>
                <button
                  className="delete-button1"
                  onClick={() => handleDelete(booking._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for entering notification reason */}
      {isModalOpen && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <span className="custom-close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2>Notify {selectedBooking?.name}</h2>
            <label htmlFor="reason">Reservation Status:</label>
            <textarea
              id="reason"
              className="txt"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
            />
            <button className="sendbtn" onClick={sendNotification}>Send Notification</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCancelBookingTable;
