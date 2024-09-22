import React, { useState } from 'react';
import '../ApproveBookings/DataTable.css';

interface DataRow {
  id: number;
  fullName: string;
  nic: string;
  phoneNo: string;
  date: string;
  description: string;
  status: string;
}

const DataTable = () => {
  const [data, setData] = useState<DataRow[]>([
    { id: 1, fullName: 'Akash Jayasekara', nic: '123456789', phoneNo: '1234567890', date: '2024-09-24', description: 'Test Description', status: 'pending' },
    { id: 2, fullName: 'Dulangi Amasha', nic: '987654321', phoneNo: '0987654321', date: '2024-09-26', description: 'Test Description', status: 'pending' },
  ]);

  const [dropdownOptions] = useState([
    { label: 'Confirmed', value: 'confirmed', color: 'status-confirmed' },
    { label: 'Unsuccessful', value: 'unsuccessful', color: 'status-unsuccessful' },
    { label: 'Pending', value: 'pending', color: 'status-pending' },
  ]);

  const handleStatusChange = (id: number, status: string) => {
    setData(data.map((row) => (row.id === id ? { ...row, status } : row)));
  };

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>NIC</th>
            <th>Phone No</th>
            <th>Date</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.fullName}</td>
              <td>{row.nic}</td>
              <td>{row.phoneNo}</td>
              <td>{row.date}</td>
              <td>{row.description}</td>
              <td>
                <span className={`status-label ${dropdownOptions.find((option) => option.value === row.status)?.color}`}>
                  {row.status}
                </span>
              </td>
              <td>
                <select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  disabled={row.status !== 'pending'}
                  className="status-select"
                >
                  {dropdownOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
