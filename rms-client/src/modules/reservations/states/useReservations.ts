import { useState, useEffect } from 'react';
import axios from 'axios';

interface Reservation {
  _id: string; // Updated to reflect the correct field
  roomType: string;
  arrivalDate: string;
  departureDate: string;
  specialRequests: string;
  paymentMethod: string;
  status: string;
  email: string; // Add email for notifications
}

export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reservations from the backend
  const fetchReservations = async () => {
    try {
      const response = await axios.get<Reservation[]>('http://localhost:5000/api/bookings');
      setReservations(response.data);
    } catch (error) {
      setError('Error fetching reservations');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmail = async (email: string, subject: string, message: string) => {
    try {
      await axios.post('http://localhost:5000/api/send-email', {
        email,
        subject,
        message,
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  // Handle Accept
  const handleAccept = async (_id: string) => {
    if (!_id) {
      console.error('Invalid reservation ID:', _id);
      return;
    }
    try {
      const response = await axios.put<Reservation>(`http://localhost:5000/api/bookings/${_id}/accept`);
      const updatedReservation = response.data;
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === _id ? updatedReservation : reservation
        )
      );
      // Send email notification
      await sendEmail(updatedReservation.email, 'Reservation Accepted', 'Your reservation has been accepted.');
    } catch (error) {
      console.error('Error accepting reservation:', error);
    }
  };

  // Handle Reject
  const handleReject = async (_id: string) => {
    try {
      const response = await axios.put<Reservation>(`http://localhost:5000/api/bookings/${_id}/reject`);
      const updatedReservation = response.data;
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === _id ? updatedReservation : reservation
        )
      );
      // Send email notification
      await sendEmail(updatedReservation.email, 'Reservation Rejected', 'Your reservation has been rejected.');
    } catch (error) {
      console.error('Error rejecting reservation:', error);
    }
  };

  // Handle Cancel
  const handleCancel = async (_id: string) => {
    try {
      const response = await axios.put<Reservation>(`http://localhost:5000/api/bookings/${_id}/cancel`);
      const updatedReservation = response.data;
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === _id ? updatedReservation : reservation
        )
      );
    } catch (error) {
      console.error('Error canceling reservation:', error);
    }
  };

  // Handle Delete
  const handleDelete = async (_id: string) => {
    if (!_id) {
      console.error('Invalid reservation ID:', _id);
      return;
    }
    try {
      await axios.delete<Reservation>(`http://localhost:5000/api/bookings/${_id}`);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation._id !== _id)
      );
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return {
    reservations,
    isLoading,
    error,
    handleAccept,
    handleReject,
    handleCancel,
    handleDelete, // Expose the handleDelete function
  };
};
