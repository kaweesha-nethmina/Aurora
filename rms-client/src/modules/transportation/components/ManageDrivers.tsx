import { useState } from 'react';
import DriverTable from './DriverTable';
import DriverForm from './DriverForm';
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

const initialDrivers: Driver[] = [
  {
    driverCode: 'DRV001',
    firstName: 'Pasindu',
    lastName: 'Mahesh',
    phoneNumber: '1234567890',
    NIC: '980123456V',
    address: '123 Main Street',
    dateOfBirth: '1990-01-01',
    joinDate: '2020-05-01',
    driverLicenseInfo: {
      licenseType: 'A',
      expirationDate: '2025-05-01',
    },
  },
  {
    driverCode: 'DRV002',
    firstName: 'Kaweesha',
    lastName: 'Nethmina',
    phoneNumber: '9876543210',
    NIC: '970456789V',
    address: '456 Elm Street',
    dateOfBirth: '1989-02-02',
    joinDate: '2019-06-15',
    driverLicenseInfo: {
      licenseType: 'B',
      expirationDate: '2024-06-15',
    },
  },
  {
    driverCode: 'DRV003',
    firstName: 'Kavindu',
    lastName: 'Senanayake',
    phoneNumber: '1234567890',
    NIC: '960789123V',
    address: '789 Oak Avenue',
    dateOfBirth: '1992-03-03',
    joinDate: '2021-07-20',
    driverLicenseInfo: {
      licenseType: 'C',
      expirationDate: '2023-07-20',
    },
  },
  {
    driverCode: 'DRV004',
    firstName: 'Hiuni',
    lastName: 'Chamathka',
    phoneNumber: '1234567890',
    NIC: '200189123V',
    address: 'Payagala,Kunukand road',
    dateOfBirth: '2001-03-03',
    joinDate: '2021-07-20',
    driverLicenseInfo: {
      licenseType: 'C',
      expirationDate: '2023-07-20',
    },
  },
  {
    driverCode: 'DRV003',
    firstName: 'Desima',
    lastName: 'Weerasinhe',
    phoneNumber: '1234567890',
    NIC: '200189123V',
    address: 'sadalokapujitha sajith premadasa Gammanaya',
    dateOfBirth: '1992-03-03',
    joinDate: '2021-07-20',
    driverLicenseInfo: {
      licenseType: 'B',
      expirationDate: '2023-07-20',
    },
  },
];

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [newDriver, setNewDriver] = useState<Driver>({
    driverCode: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    NIC: '',
    address: '',
    dateOfBirth: '',
    joinDate: '',
    driverLicenseInfo: {
      licenseType: '',
      expirationDate: '',
    },
  });
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  const handleAddDriver = () => {
    setDrivers([...drivers, newDriver]);
    resetForm();
  };

  const handleEditDriver = (driver: Driver) => {
    setEditingDriver(driver);
    setNewDriver(driver);
  };

  const handleUpdateDriver = () => {
    if (editingDriver) {
      const updatedDrivers = drivers.map((driver) =>
        driver.driverCode === editingDriver.driverCode ? newDriver : driver
      );
      setDrivers(updatedDrivers);
      setEditingDriver(null);
      resetForm();
    }
  };

  const handleRemoveDriver = (driverCode: string) => {
    setDrivers(drivers.filter((driver) => driver.driverCode !== driverCode));
  };

  const resetForm = () => {
    setNewDriver({
      driverCode: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      NIC: '',
      address: '',
      dateOfBirth: '',
      joinDate: '',
      driverLicenseInfo: {
        licenseType: '',
        expirationDate: '',
      },
    });
  };

  return (
    <div className="driver-container">
      <h1 className="driver-title">Manage Drivers</h1>
      <DriverTable drivers={drivers} handleEditDriver={handleEditDriver} handleRemoveDriver={handleRemoveDriver} />
      <DriverForm
        newDriver={newDriver}
        setNewDriver={setNewDriver}
        handleAddDriver={handleAddDriver}
        editingDriver={editingDriver}
        handleUpdateDriver={handleUpdateDriver}
      />
    </div>
  );
};

export default ManageDrivers;
