import React, { useState } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const initialCustomers: Customer[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '987-654-3210' },
];

const CustomerDetailsTable = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState<Customer>({ id: 0, name: '', email: '', phone: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCustomers([...customers, { ...newCustomer, id: customers.length + 1 }]);
    setNewCustomer({ id: 0, name: '', email: '', phone: '' });
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingCustomer) {
      const updatedCustomers = customers.map((customer) => (customer.id === editingCustomer.id ? editingCustomer : customer));
      setCustomers(updatedCustomers);
      setEditingCustomer(null);
    }
  };

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Customer Details</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          placeholder="Name"
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          placeholder="Email"
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={newCustomer.phone}
          onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          placeholder="Phone"
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">ID</th>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Phone</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="p-2 border border-gray-300">{customer.id}</td>
              <td className="p-2 border border-gray-300">{customer.name}</td>
              <td className="p-2 border border-gray-300">{customer.email}</td>
              <td className="p-2 border border-gray-300">{customer.phone}</td>
              <td className="p-2 border border-gray-300">
                <button
                  onClick={() => handleEdit(customer)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingCustomer && (
        <form onSubmit={handleSave} className="mt-4">
          <input
            type="text"
            value={editingCustomer.name}
            onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
            placeholder="Name"
            className="block w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            value={editingCustomer.email}
            onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
            placeholder="Email"
            className="block w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={editingCustomer.phone}
            onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
            placeholder="Phone"
            className="block w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default CustomerDetailsTable;
