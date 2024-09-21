import { useState, useEffect } from 'react';
import './AdminView.css';
import Header from '../../../core/components/Header';

interface User {
  id: number;
  name: string;
  email: string;
  lastLogin: string;
}

const AdminView = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const data: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', lastLogin: '2022-01-01' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', lastLogin: '2022-01-02' },
        { id: 3, name: 'Bob Smith', email: 'bob@example.com', lastLogin: '2022-01-03' },
      ];
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const lowerCaseName = user.name.toLowerCase();
    const lowerCaseEmail = user.email.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return lowerCaseName.includes(lowerCaseSearchTerm) || lowerCaseEmail.includes(lowerCaseSearchTerm);
  });

  return (
    <div className="admin-view">
      <Header activeTab={''} />
      <h1 className="admin-title">User Logins and Details</h1>
      <div className="admin-search">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email"
          className="admin-input"
        />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th className="admin-header">ID</th>
            <th className="admin-header">Name</th>
            <th className="admin-header">Email</th>
            <th className="admin-header">Last Login</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="admin-row">
              <td className="admin-cell">{user.id}</td>
              <td className="admin-cell">{user.name}</td>
              <td className="admin-cell">{user.email}</td>
              <td className="admin-cell">{user.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminView;
