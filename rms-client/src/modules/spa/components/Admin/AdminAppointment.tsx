import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './AdminAppointment.css'; // Import your CSS file for styling

interface Appointment {
  _id: string;
  doctor: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string; // Optional field
  status: 'Pending' | 'Approved' | 'Rejected';
}

const AdminAppointment: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<string | null>(null); // For tracking loading status of individual appointments
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get<Appointment[]>('http://localhost:5000/api/appointments');
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

  const updateAppointmentStatus = async (id: string, newStatus: 'Approved' | 'Rejected') => {
    const confirmed = window.confirm(`Are you sure you want to ${newStatus.toLowerCase()} this appointment?`);
    if (!confirmed) return;

    setLoadingStatus(id); // Set loading status for the specific appointment

    try {
      // Make sure to use the correct HTTP method (PUT or PATCH) as per your backend
      await axios.put(`http://localhost:5000/api/appointments/${id}/status`, { status: newStatus });
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status: newStatus } : appointment
        )
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
      setError('Failed to update appointment status. Please try again.');
    } finally {
      setLoadingStatus(null); // Reset loading status after operation
    }
  };

  const deleteAppointment = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this appointment?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment._id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setError('Failed to delete appointment. Please try again.');
    }
  };

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter((appointment) => {
    const query = searchQuery.toLowerCase();
    return (
      appointment.doctor.toLowerCase().includes(query) ||
      appointment.name.toLowerCase().includes(query) ||
      appointment.email.toLowerCase().includes(query) ||
      appointment.phone.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-appointment-container">
      <h3 className='title2'>Medical Appointments</h3>
      <input
        type="text"
        placeholder="Search by doctor, name, email, or phone"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        className="search-input"
      />
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
          {filteredAppointments.map((appointment) => (
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
                    <button 
                      onClick={() => updateAppointmentStatus(appointment._id, 'Approved')} 
                      disabled={loadingStatus === appointment._id} // Disable button while loading
                    >
                      {loadingStatus === appointment._id ? 'Approving...' : 'Approve'}
                    </button>
                    <button 
                      onClick={() => updateAppointmentStatus(appointment._id, 'Rejected')} 
                      disabled={loadingStatus === appointment._id} // Disable button while loading
                    >
                      {loadingStatus === appointment._id ? 'Rejecting...' : 'Reject'}
                    </button>
                  </>
                )}
                <button onClick={() => deleteAppointment(appointment._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAppointment;
