import { useEffect, useState } from "react";
import Header from "../../../../core/components/Header";
import Navbar from "../nav/SNavbar";
import SpaTable from "./SpaTable";
import AppointmentTable from "./AppointmentTable";
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

// Define a separate interface for spa appointments that extends the basic Appointment interface
interface SpaAppointment extends Appointment {
  service: string; // Add the required service field
  message?: string;
}

const AppointmentPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [spaAppointments, setSpaAppointments] = useState<SpaAppointment[]>([]); // Use the new SpaAppointment type
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

    const fetchSpaAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/spaappointments');
        if (!response.ok) {
          throw new Error(`Failed to fetch spa appointments: ${response.statusText}`);
        }
        const data: SpaAppointment[] = await response.json();
        setSpaAppointments(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchAppointments();
    fetchSpaAppointments();
  }, []);

  // Retrieve user data from local storage
  const userData = localStorage.getItem('userData');
  const userProfile = userData ? JSON.parse(userData) : null;

  // Filter appointments by logged-in user
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.name === `${userProfile?.firstName || ''} ${userProfile?.lastName || ''}`
  );

  // Filter spa appointments by logged-in user
  const filteredSpaAppointments = spaAppointments.filter(
    (appointment) => appointment.name === `${userProfile?.firstName || ''} ${userProfile?.lastName || ''}`
  );

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
    <div className='page-containerSP'>
      <Header activeTab={'spa-wellness'} />
      <Navbar />
      <div className='appointment-containerW'>
        {error && <p className="error-message">{error}</p>}

        {/* Medical Appointments Table */}
        
        <AppointmentTable appointments={filteredAppointments} onUpdate={handleUpdate} />

        {/* Spa Appointments Table */}
        <SpaTable appointments={filteredSpaAppointments} /> {/* Pass filtered spa appointments to SpaTable */}
      </div>
    </div>
  );
};

export default AppointmentPage;
