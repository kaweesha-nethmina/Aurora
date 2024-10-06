import React from 'react';
import './style/ManageDriver.css'; 

interface Driver {
  driverCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  NIC: string;
  address: string;
  dateOfBirth: string;
  joinDate: string;
  driverLicenseInfo: {
    licenseType: string;
    expirationDate: string;
  };
}

interface DriverTableProps { // Renamed from DriverTable to DriverTableProps
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
          <th>Phone Number</th>
          <th>NIC</th>
          <th>Address</th>
          <th>Date of Birth</th>
          <th>Join Date</th>
          <th>Driver License Information</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver: Driver) => (  // Explicitly type 'driver'
          <tr key={driver.driverCode}>
            <td>{driver.driverCode}</td>
            <td>{driver.firstName}</td>
            <td>{driver.lastName}</td>
            <td>{driver.phoneNumber}</td>
            <td>{driver.NIC}</td>
            <td>{driver.address}</td>
            <td>{driver.dateOfBirth}</td>
            <td>{driver.joinDate}</td>
            <td>
              {driver.driverLicenseInfo.licenseType}, {driver.driverLicenseInfo.expirationDate}
            </td>
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
