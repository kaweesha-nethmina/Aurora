import { useState, useEffect } from 'react';
import './AdminView.css';

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  contact_info?: {
    email?: string;
    username?: string;
    password?: string;
  };
  phone: string;
}

const AdminView = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch customers from the backend API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }
        const data = await response.json();
        setCustomers(data); // Set fetched customers
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchCustomers();
  }, []);

  // Handle delete customer
  const handleDelete = async (customerId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${customerId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }
      // Remove the deleted customer from the state
      setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer._id !== customerId));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  // Filter customers based on the search term
  const filteredCustomers = customers.filter((customer) => {
    const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.toLowerCase();
    const lowerCaseEmail = (customer.contact_info?.email || '').toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    return fullName.includes(lowerCaseSearchTerm) || lowerCaseEmail.includes(lowerCaseSearchTerm);
  });

  return (
    <div className="admin-view">
      <h1 className="admin-title">Customer List</h1>
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
            <th className="admin-header">Name</th>
            <th className="admin-header">Email</th>
            <th className="admin-header">Phone</th>
            <th className="admin-header">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer._id} className="admin-row">
              
              <td className="admin-cell">{`${customer.firstName} ${customer.lastName}`}</td>
              <td className="admin-cell">{customer.contact_info?.email || 'N/A'}</td>
              <td className="admin-cell">{customer.phone}</td>
              <td className="admin-cell">
                <button className="admin-delete-btn" onClick={() => handleDelete(customer._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminView;
