import React from 'react';
import './style/ManageDriver.css'; 

interface Driver {
  driverCode: string;
  firstName: string;
  lastName: string;
  IDNumber: string;
  phoneNumber: string;
}

interface DriverTableProps {
  drivers: Driver[];
  handleEditDriver: (driver: Driver) => void;
  handleRemoveDriver: (driverCode: string) => void;
}

const DriverTable: React.FC<DriverTableProps> = ({ drivers, handleEditDriver, handleRemoveDriver }) => {
  return (
    <table className="driver-table">
      <thead>
        <tr>
          <th>Driver Code</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>NIC</th>
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
            <td>{driver.IDNumber}</td>
            <td>{driver.phoneNumber}</td>
            <td>
              <button
                className="driver-action-btn driver-action-edit"
                onClick={() => handleEditDriver(driver)}
              >
                Edit
              </button>
              <button
                className="driver-action-btn driver-action-remove"
                onClick={() => handleRemoveDriver(driver.driverCode)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DriverTable;
