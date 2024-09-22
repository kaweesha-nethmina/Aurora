import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MedicalAppointmentForm.css';

interface Appointment {
  doctor: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
}

const MedicalAppointmentForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [appointment, setAppointment] = useState<Appointment>({
    doctor: '',
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  });

  const [error, setError] = useState<string | null>(null);

  const doctors = [
    { id: 1, name: 'Dr. Kevin De Silva' },
    { id: 2, name: 'Dr. Dinakshi Perera' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });

      if (response.ok) {
        alert('Appointment booked successfully!'); // Show alert
        navigate('/appointments'); // Navigate to /appointments
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to book appointment');
      }
    } catch (error) {
      setError('An error occurred while booking the appointment.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  return (
    <div className="medical-appointment-form-container">
      <h2 className="form-title">Book a Medical Appointment</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="doctor">Select a Doctor</label>
          <select id="doctor" name="doctor" value={appointment.doctor} onChange={handleChange} required>
            <option value="">Select a Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input id="name" name="name" type="text" value={appointment.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input id="email" name="email" type="email" value={appointment.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Your Phone Number</label>
          <input id="phone" name="phone" type="tel" value={appointment.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="date">Appointment Date</label>
          <input id="date" name="date" type="date" value={appointment.date} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="time">Appointment Time</label>
          <input id="time" name="time" type="time" value={appointment.time} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default MedicalAppointmentForm;
