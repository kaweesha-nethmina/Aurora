import React, { useState, useEffect } from 'react';
import BookingItem from './BookingItem';
import '../profile.css';
import Navbar from './Navbar';
import Header from '../../core/components/Header';
import axios from 'axios';

interface Booking {
  _id: string; // Use _id instead of id
  roomType: string;
  arrivalDate: string;
  departureDate: string;
  specialRequests: string;
  paymentMethod: string;
  email: string;
  status: string;
}

const ProfileScreen: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.contact_info) {
          setUserEmail(parsedData.contact_info.email);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (userEmail) {
        try {
          const response = await axios.get<Booking[]>(`http://localhost:5000/api/bookings?email=${userEmail}`);
          setBookings(response.data);
        } catch (err) {
          console.error('Error fetching bookings:', err);
          setError('Failed to load bookings. Please try again.');
        }
      }
    };

    fetchBookings();
  }, [userEmail]);

  const handleCancelBooking = async (_id: string) => {
    if (!_id) {
      console.error('Invalid booking ID:', _id);
      return; // Stop execution if ID is invalid
    }

    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return; // Stop if the user does not confirm

    console.log("Attempting to cancel booking with ID:", _id); // Debugging log

    try {
      const response = await axios.delete(`http://localhost:5000/api/bookings/${_id}`);
      console.log("Delete response:", response); // Log response from server
      
      // Update the local state after successful cancellation
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== _id));
    } catch (error) {
      console.error('Error canceling booking:', error);
      setError('Failed to cancel booking. Please try again.');
    }
  };

  // Debugging log for all bookings
  useEffect(() => {
    bookings.forEach(booking => console.log("Booking object:", booking));
  }, [bookings]);

  return (
    <div className="profile-screen">
      <Header activeTab={''} />
      <Navbar />
      {error && <p className="error-message">{error}</p>}
      <ul className="booking-list">
        {bookings.map((booking) => (
          <li key={booking._id} className="booking-list-item">
            <BookingItem booking={booking} onCancel={handleCancelBooking} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileScreen;
