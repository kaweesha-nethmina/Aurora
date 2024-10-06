import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './AppointmentTable.css'; // Import your CSS file for styling

// Define the SpaAppointment interface
interface SpaAppointment {
  _id: string;
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message?: string; // Optional field
  status: 'pending' | 'accepted' | 'rejected'; // Status field
}

const AppointmentTableS: React.FC = () => {
  const [appointments, setAppointments] = useState<SpaAppointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch appointments when the component mounts
    const fetchAppointments = async () => {
      try {
        const response = await axios.get<SpaAppointment[]>('http://localhost:5000/api/spaappointments');
        setAppointments(response.data);
      } catch (error) {
        setError('Failed to fetch appointments. Please try again.');
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Update appointment status
  const updateAppointmentStatus = async (id: string, newStatus: 'accepted' | 'rejected') => {
    try {
      await axios.put(`http://localhost:5000/api/spaappointments/${id}`, { status: newStatus });
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status: newStatus } : appointment
        )
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  // Delete an appointment
  const deleteAppointment = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/spaappointments/${id}`);
      setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment._id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  // Loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="table-container">
     
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Message</th>
            <th>Status</th> {/* Status Column */}
            <th>Actions</th> {/* Actions Column */}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.name}</td>
              <td>{appointment.email}</td>
              <td>{appointment.service}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.message || 'N/A'}</td>
              <td>{appointment.status}</td> {/* Display Status */}
              <td>
                <button onClick={() => updateAppointmentStatus(appointment._id, 'accepted')}>Accept</button>
                <button onClick={() => updateAppointmentStatus(appointment._id, 'rejected')}>Reject</button>
                <button className='delbtn' onClick={() => deleteAppointment(appointment._id)}>Delete</button>
              </td> {/* Action Buttons */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTableS;
