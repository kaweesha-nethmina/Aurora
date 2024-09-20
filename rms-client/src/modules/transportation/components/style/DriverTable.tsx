import React from 'react';

interface Driver {
  driverCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface DriverTableProps {
  drivers: Driver[];
  handleEditDriver: (driver: Driver) => void;
  handleRemoveDriver: (driverCode: string) => void;
}

const DriverTable: React.FC<DriverTableProps> = ({ drivers, handleEditDriver, handleRemoveDriver }) => {
  const handleEdit = (driver: Driver) => {
    // Prompt user for new details, for example using a form or modal
    const updatedDriver = { ...driver, firstName: 'UpdatedName' }; // Example modification
    handleEditDriver(updatedDriver);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Driver Code</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver) => (
          <tr key={driver.driverCode}>
            <td>{driver.driverCode}</td>
            <td>{driver.firstName}</td>
            <td>{driver.lastName}</td>
            <td>{driver.phoneNumber}</td>
            <td>
              <button onClick={() => handleEdit(driver)}>Edit</button>
              <button onClick={() => handleRemoveDriver(driver.driverCode)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DriverTable;
