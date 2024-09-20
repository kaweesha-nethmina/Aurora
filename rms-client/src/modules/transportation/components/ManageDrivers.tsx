import React, { useState } from 'react';
import DriverTable from './DriverTable';
import './style/ManageDriver.css'; 

interface Driver {
  driverCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

// Initial driver data
const initialDrivers: Driver[] = [
  { driverCode: 'DRV001', firstName: 'Pasindu', lastName: 'Mahesh', phoneNumber: '1234567890' },
  { driverCode: 'DRV002', firstName: 'Kaweesha', lastName: 'Nethmina', phoneNumber: '9876543210' },
  { driverCode: 'DRV003', firstName: 'Kavindu', lastName: 'Senanayake', phoneNumber: '1234567890' },
  { driverCode: 'DRV004', firstName: 'Ashen', lastName: 'Senaathne', phoneNumber: '9876543210' },
];

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState(initialDrivers);

  const handleEditDriver = (driver: Driver) => {
    // Logic for editing a driver
  };

  const handleRemoveDriver = (driverCode: string) => {
    setDrivers(drivers.filter((driver) => driver.driverCode !== driverCode));
  };

  return (
    <div className="driver-container">
      <h1 className="driver-title">Manage Drivers</h1>
      <DriverTable drivers={drivers} handleEditDriver={handleEditDriver} handleRemoveDriver={handleRemoveDriver} />
    </div>
  );
};

export default ManageDrivers;
