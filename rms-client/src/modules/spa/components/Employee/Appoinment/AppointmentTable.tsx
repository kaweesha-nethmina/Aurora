import React from 'react';
import './AppointmentTable.css';

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

interface AppointmentTableProps {
  appointments: Appointment[];
  onUpdate: (updatedAppointment: Appointment) => void;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments }) => {
  

  

  return (
    <>
      <table className='appointment-table'>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.doctor}</td>
              <td>{appointment.name}</td>
              <td>{appointment.email}</td>
              <td>{appointment.phone}</td>
              <td>{appointment.date.split('T')[0]}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
              
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
};

export default AppointmentTable;
