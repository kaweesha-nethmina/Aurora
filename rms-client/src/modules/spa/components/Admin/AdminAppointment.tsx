import React, { useEffect, useState } from 'react';
import './AdminAppointment.css';

interface Appointment {
  _id: string;
  doctor: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const AdminAppointment: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/appointments');
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'Approved' | 'Rejected') => {
    const confirmed = window.confirm(`Are you sure you want to ${newStatus.toLowerCase()} this appointment?`);
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || 'Failed to update appointment status');
      }

      const updatedAppointment = await response.json();
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === updatedAppointment._id ? updatedAppointment : appointment
        )
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error occurred while updating appointment status');
      }
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this appointment?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete appointment');

      setAppointments((prev) => prev.filter((appointment) => appointment._id !== id));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to delete appointment: An unknown error occurred');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-appointment-container">
      
      {error && <p className="error-message">{error}</p>}
      <table className="admin-appointment-table">
        <thead>
          <tr>
            <th>Doctor</th>
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
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.doctor}</td>
              <td>{appointment.name}</td>
              <td>{appointment.email}</td>
              <td>{appointment.phone}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
              <td>
                {appointment.status === 'Pending' && (
                  <>
                    <button onClick={() => handleStatusChange(appointment._id, 'Approved')}>Approve</button>
                    <button onClick={() => handleStatusChange(appointment._id, 'Rejected')}>Reject</button>
                  </>
                )}
                <button onClick={() => handleDelete(appointment._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAppointment;
