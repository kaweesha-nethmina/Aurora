import React, { useState } from 'react';
import AdminBookingsPage from './adminBookingsPage'; // Adjust the path as necessary

interface Booking {
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropff: string;
  date: string;
  time: string;
  status: string;
}

const AdminPage = () => {
  // Assume you fetch bookings from some API or state management
  const [bookings, setBookings] = useState<Booking[]>([
    // Example booking data
    {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      pickup: 'Location A',
      dropff: 'Location B',
      date: '2024-08-25',
      time: '10:00',
      status: 'pending',
    },
    // Add more bookings if needed
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Admin Bookings</h1>
      <AdminBookingsPage />
    </div>
  );
};

export default AdminPage;
