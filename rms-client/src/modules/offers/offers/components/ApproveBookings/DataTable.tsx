import { useEffect, useState } from 'react';
import '../ApproveBookings/DataTable.css';

interface DataRow {
  _id: string; // MongoDB ObjectId field
  fullName: string;
  phoneNumber: string;
  offerPrice: string;
  date: string; // Keep it as a string or convert to Date
  description: string;
  status: string;
}

const DataTable = () => {
  const [data, setData] = useState<DataRow[]>([]);

  const dropdownOptions = [
    { label: 'Confirmed', value: 'confirmed', color: 'status-confirmed' },
    { label: 'Unsuccessful', value: 'unsuccessful', color: 'status-unsuccessful' },
    { label: 'Pending', value: 'pending', color: 'status-pending' },
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/offerbookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const bookings: DataRow[] = await response.json();
        setData(bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const handleStatusChange = (id: string, status: string) => {
    const updatedData = data.map((row) => (row._id === id ? { ...row, status } : row));
    setData(updatedData);
  };

  const handleAccept = async (id: string) => {
    console.log(`Accepting booking with ID: ${id}`);
    try {
      const response = await fetch(`http://localhost:5000/api/offerbookings/${id}/accept`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to accept booking');
      }
      const updatedBooking = await response.json();
      handleStatusChange(id, updatedBooking.status);
    } catch (error) {
      console.error('Error accepting booking:', error);
    }
  };

  const handleReject = async (id: string) => {
    console.log(`Rejecting booking with ID: ${id}`);
    try {
      const response = await fetch(`http://localhost:5000/api/offerbookings/${id}/reject`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to reject booking');
      }
      const updatedBooking = await response.json();
      handleStatusChange(id, updatedBooking.status);
    } catch (error) {
      console.error('Error rejecting booking:', error);
    }
  };

  const handleDelete = async (id: string) => {
    console.log(`Deleting booking with ID: ${id}`);
    try {
      const response = await fetch(`http://localhost:5000/api/offerbookings/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }
      setData(data.filter((row) => row._id !== id)); // Use _id instead of id
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone No</th>
            <th>Date</th>
            <th>Price</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id}> {/* Use _id for the key */}
              <td>{row.fullName}</td>
              <td>{row.phoneNumber}</td>
              <td>{new Date(row.date).toLocaleDateString()}</td>
              <td>Rs.{row.offerPrice}</td>
              <td>{row.description}</td>
              <td>
                <span className={`status-label ${dropdownOptions.find((option) => option.value === row.status)?.color}`}>
                  {row.status}
                </span>
              </td>
              <td>
                <button onClick={() => handleAccept(row._id)}>Accept</button> 
                <button onClick={() => handleReject(row._id)}>Reject</button> 
                <button className='Odelete' onClick={() => handleDelete(row._id)}>Delete</button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
