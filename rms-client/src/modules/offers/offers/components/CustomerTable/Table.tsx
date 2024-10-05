import React, { useEffect, useState } from 'react';
import '../CustomerTable/Table.css';
import Header from '../../../../core/components/Header';
import Navbar from '../nav/ONavbar';

interface TableData {
  _id: string; // MongoDB ObjectId field
  userId: string;
  fullName: string;
  phoneNumber: string;
  date: string;
  description: string;
  status: string;
}

const Table: React.FC = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [editing, setEditing] = useState(false);
  const [currentRow, setCurrentRow] = useState<TableData | null>(null);
  const [fullName, setFullName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const userData = localStorage.getItem('userData');

      if (!userData) {
        console.error('User data not found');
        return;
      }

      const userProfile = JSON.parse(userData);
      const userFullName = `${userProfile.firstName || ''} ${userProfile.lastName || ''}`;

      try {
        const response = await fetch('http://localhost:5000/api/offerbookings', {
          method: 'GET',
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Fetch error: ${response.status} ${response.statusText} - ${errorText}`);
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        const userBookings = data.filter((booking: TableData) => booking.fullName === userFullName);
        setTableData(userBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleEdit = (row: TableData) => {
    setEditing(true);
    setCurrentRow(row);
    setFullName(row.fullName);
    setPhoneNo(row.phoneNumber);
    setDate(row.date);
    setDescription(row.description);
  };

  const handleSave = async () => {
    const updatedRow = {
      fullName,
      phoneNumber: phoneNo,
      date,
      description,
    };
  
    try {
      const response = await fetch(`http://localhost:5000/api/offerbookings/${currentRow?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRow), // Send updated booking data
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Update error: ${response.status} ${response.statusText} - ${errorText}`);
        throw new Error('Failed to update booking');
      }
  
      const updatedData = await response.json();
      setTableData(
        tableData.map((data) =>
          data._id === currentRow?._id ? { ...data, ...updatedData } : data
        )
      );
      setEditing(false);
      setCurrentRow(null);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/offerbookings/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Delete error: ${response.status} ${response.statusText} - ${errorText}`);
        throw new Error('Failed to delete booking');
      }

      setTableData(tableData.filter((data) => data._id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="table-container">
      <Header activeTab={'offers'} />
      <Navbar />
      <div className='conOffer'>
        <table className="table">
          <thead className="table-header">
            <tr>
              <th>Full Name</th>
              <th>Phone No</th>
              <th>Date</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => (
              <tr key={data._id}>
                <td>
                  {editing && currentRow?._id === data._id ? (
                    <input
                      type="text"
                      className="input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  ) : (
                    data.fullName
                  )}
                </td>
                <td>
                  {editing && currentRow?._id === data._id ? (
                    <input
                      type="text"
                      className="input"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                  ) : (
                    data.phoneNumber
                  )}
                </td>
                <td>
                  {editing && currentRow?._id === data._id ? (
                    <input
                      type="date"
                      className="input"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  ) : (
                    new Date(data.date).toLocaleDateString() // Format the date here
                  )}
                </td>

                <td>
                  {editing && currentRow?._id === data._id ? (
                    <input
                      type="text"
                      className="input"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  ) : (
                    data.description
                  )}
                </td>
                <td>
                  <span className={`status ${data.status === 'Pending' ? 'status-pending' : 'status-confirmed'}`}>
                    {data.status}
                  </span>
                </td>
                <td>
                  {editing && currentRow?._id === data._id ? (
                    <button className="btn save-btn" onClick={handleSave}>
                      Save
                    </button>
                  ) : (
                    <>
                      <button className="btn edit-btn" onClick={() => handleEdit(data)}>
                        Edit
                      </button>
                      <button className="btn delete-btn" onClick={() => handleDelete(data._id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
