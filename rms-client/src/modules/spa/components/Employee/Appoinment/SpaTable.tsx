import './SpaTable.css';
interface SpaAppointment {
    _id: string;
    name: string;
    email: string;
    service: string;
    date: string;
    time: string;
    message?: string;
    status: 'Pending' | 'Approved' | 'Rejected';
  }
  
  // Define the props interface for SpaTable to accept an array of SpaAppointment
  interface SpaTableProps {
    appointments: SpaAppointment[];
  }
  
  const SpaTable: React.FC<SpaTableProps> = ({ appointments }) => {
    return (
      <div className="table-container">
        <h3 className='titleS'>Spa Appointments</h3>
        <table className="appointment-tableS">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.name}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.service}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.message || 'N/A'}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center' }}>No appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default SpaTable;
  