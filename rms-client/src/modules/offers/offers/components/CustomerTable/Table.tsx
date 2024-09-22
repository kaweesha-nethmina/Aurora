import React, { useState } from 'react';
import '../CustomerTable/Table.css';
import Header from '../../../../core/components/Header';
import Navbar from '../nav/ONavbar';


interface TableData {
  id: number;
  fullName: string;
  nic: string;
  phoneNo: string;
  date: string;
  description: string;
  status: string;
}

const Table: React.FC = () => {
  const [tableData, setTableData] = useState<TableData[]>([
    { id: 1, fullName: 'John Doe', nic: '1234567890', phoneNo: '1234567890', date: '2022-01-01', description: 'Test Description', status: 'Pending' },
    { id: 2, fullName: 'Jane Doe', nic: '9876543210', phoneNo: '9876543210', date: '2022-01-02', description: 'Test Description', status: 'Confirmed' },
  ]);

  const [editing, setEditing] = useState(false);
  const [currentRow, setCurrentRow] = useState<TableData | null>(null);
  const [fullName, setFullName] = useState('');
  const [nic, setNic] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleEdit = (row: TableData) => {
    setEditing(true);
    setCurrentRow(row);
    setFullName(row.fullName);
    setNic(row.nic);
    setPhoneNo(row.phoneNo);
    setDate(row.date);
    setDescription(row.description);
  };

  const handleSave = (id: number) => {
    setTableData(tableData.map((data) => (data.id === id ? { ...data, fullName, nic, phoneNo, date, description } : data)));
    setEditing(false);
    setCurrentRow(null);
  };

  const handleDelete = (id: number) => {
    setTableData(tableData.filter((data) => data.id !== id));
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
            <th>NIC</th>
            <th>Phone No</th>
            <th>Date</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data.id}>
              <td>
                {editing && currentRow?.id === data.id ? (
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
                {editing && currentRow?.id === data.id ? (
                  <input
                    type="text"
                    className="input"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                  />
                ) : (
                  data.nic
                )}
              </td>
              <td>
                {editing && currentRow?.id === data.id ? (
                  <input
                    type="text"
                    className="input"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                ) : (
                  data.phoneNo
                )}
              </td>
              <td>
                {editing && currentRow?.id === data.id ? (
                  <input
                    type="date"
                    className="input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                ) : (
                  data.date
                )}
              </td>
              <td>
                {editing && currentRow?.id === data.id ? (
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
                {editing && currentRow?.id === data.id ? (
                  <button className="btn save-btn" onClick={() => handleSave(data.id)}>
                    Save
                  </button>
                ) : (
                  <>
                    <button className="btn edit-btn" onClick={() => handleEdit(data)}>
                      Edit
                    </button>
                    <button className="btn delete-btn" onClick={() => handleDelete(data.id)}>
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
