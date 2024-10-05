import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomTable.css'; // Ensure you have styling

interface CustomBooking {
  _id: string; // Unique ID for deletion
  fullName: string;
  phoneNumber: string;
  guestCount: number;
  perPersonCharge: number;
  additionalResources: string[];
  totalAmount: number;
  bookingDate: string; // Use string for consistency with backend
  status: string; // Add status field
}

const CustomTable: React.FC = () => {
  const [bookings, setBookings] = useState<CustomBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch custom bookings from the backend
  // Fetch custom bookings from the backend
useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get<{ bookings: CustomBooking[] }>('http://localhost:5000/api/customBookings');
        console.log('API Response:', response.data); // Log response to check the data
  
        if (response.data && Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
        } else {
          setError('No bookings found in the response');
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };
  
    fetchBookings();
  }, []);
  

  // Function to delete a booking
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/customBookings/${id}`);
      // Remove deleted booking from state
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
      setError('Failed to delete booking');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="custom-table-container">
      <h2>Custom Event Bookings</h2>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Guest Count</th>
            <th>Per Person Charge</th>
            <th>Additional Resources</th>
            <th>Total Amount</th>
            <th>Booking Date</th>
            <th>Payment</th> {/* New Status Column */}
            <th>Actions</th> {/* New Actions Column */}
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.fullName}</td>
                <td>{booking.phoneNumber}</td>
                <td>{booking.guestCount}</td>
                <td>LKR {booking.perPersonCharge}</td>
                <td>{booking.additionalResources.join(', ')}</td>
                <td>LKR {booking.totalAmount}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.status}</td> {/* Display status */}
                <td>
                  <button onClick={() => handleDelete(booking._id)}>Delete</button> {/* Delete button */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
