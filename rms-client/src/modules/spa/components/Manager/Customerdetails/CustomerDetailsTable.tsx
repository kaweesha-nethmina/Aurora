import React, { useState } from 'react';

interface Customer {
  id: number;
  spa: boolean;
  gym: boolean;
  medical: boolean;
}

const CustomerDetailsTable = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [id, setId] = useState('');
  const [spa, setSpa] = useState(false);
  const [gym, setGym] = useState(false);
  const [medical, setMedical] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleAddCustomer = () => {
    if (id) {
      setCustomers([...customers, { id: parseInt(id), spa, gym, medical }]);
      setId('');
      setSpa(false);
      setGym(false);
      setMedical(false);
    }
  };

  const handleDeleteCustomer = (index: number) => {
    setCustomers(customers.filter((customer, i) => i !== index));
  };

  const handleEditCustomer = (index: number) => {
    setIsEditing(true);
    setEditingIndex(index);
    const customer = customers[index];
    setId(customer.id.toString());
    setSpa(customer.spa);
    setGym(customer.gym);
    setMedical(customer.medical);
  };

  const handleUpdateCustomer = () => {
    if (editingIndex !== -1) {
      const updatedCustomers = [...customers];
      updatedCustomers[editingIndex] = { id: parseInt(id), spa, gym, medical };
      setCustomers(updatedCustomers);
      setIsEditing(false);
      setEditingIndex(-1);
      setId('');
      setSpa(false);
      setGym(false);
      setMedical(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Customer Details Table</h2>
      <form className="flex flex-col gap-4 mb-4">
        <input
          type="number"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={spa}
              onChange={(e) => setSpa(e.target.checked)}
              className="p-2 border border-gray-300 rounded"
            />
            <label>Spa</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={gym}
              onChange={(e) => setGym(e.target.checked)}
              className="p-2 border border-gray-300 rounded"
            />
            <label>Gym</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={medical}
              onChange={(e) => setMedical(e.target.checked)}
              className="p-2 border border-gray-300 rounded"
            />
            <label>Medical</label>
          </div>
        </div>
        {isEditing ? (
          <button
            type="button"
            onClick={handleUpdateCustomer}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Update Customer
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAddCustomer}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Customer
          </button>
        )}
      </form>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">ID</th>
            <th className="p-2 border border-gray-300">Spa</th>
            <th className="p-2 border border-gray-300">Gym</th>
            <th className="p-2 border border-gray-300">Medical</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id}>
              <td className="p-2 border border-gray-300">{customer.id}</td>
              <td className="p-2 border border-gray-300">
                {customer.spa ? 'Yes' : 'No'}
              </td>
              <td className="p-2 border border-gray-300">
                {customer.gym ? 'Yes' : 'No'}
              </td>
              <td className="p-2 border border-gray-300">
                {customer.medical ? 'Yes' : 'No'}
              </td>
              <td className="p-2 border border-gray-300">
                <button
                  type="button"
                  onClick={() => handleEditCustomer(index)}
                  className="bg-green-500 text-white p-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCustomer(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
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

export default CustomerDetailsTable;
