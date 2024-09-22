import React, { useEffect, useState } from 'react';
import AppointmentTable from './AppointmentTable';
import Header from '../../../../core/components/Header';
import Navbar from '../nav/SNavbar';
import './Appoinment.css';

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

const AppointmentPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/appointments');
        if (!response.ok) {
          throw new Error(`Failed to fetch appointments: ${response.statusText}`);
        }
        const data: Appointment[] = await response.json();
        setAppointments(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchAppointments();
  }, []);

  const handleUpdate = async (updatedAppointment: Appointment) => {
    console.log('Updating appointment:', updatedAppointment);
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${updatedAppointment._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updatedAppointment }),
      });

      console.log('Response:', response);
      
      if (!response.ok) {
        throw new Error(`Failed to update appointment: ${response.statusText}`);
      }

      const updatedData: Appointment = await response.json();
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === updatedData._id ? updatedData : appointment
        )
      );
    } catch (error) {
      setError((error as Error).message);
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <div className='page-containerS'>
      <Header activeTab={''} />
      <Navbar />
      <div className='appointment-containerW'>
        {error && <p className="error-message">{error}</p>}
        <AppointmentTable appointments={appointments} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default AppointmentPage;
