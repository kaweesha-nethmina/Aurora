import { useState } from 'react';
import DriverTable from './DriverTable';
import DriverForm from './DriverForm';
import './style/ManageDriver.css'; 

interface Driver {
  driverCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const initialDrivers: Driver[] = [
  { driverCode: 'DRV001', firstName: 'pasindu', lastName: 'Mahesh', phoneNumber: '1234567890' },
  { driverCode: 'DRV002', firstName: 'Kaweesha', lastName: 'Nethmina', phoneNumber: '9876543210' },
  { driverCode: 'DRV003', firstName: 'Kavindu', lastName: 'Senanayake', phoneNumber: '1234567890' },
  { driverCode: 'DRV003', firstName: 'Ashen', lastName: 'Senaathne', phoneNumber: '9876543210' },
];

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [newDriver, setNewDriver] = useState<Driver>({ driverCode: '', firstName: '', lastName: '', phoneNumber: '' });
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  const handleAddDriver = () => {
    setDrivers([...drivers, newDriver]);
    setNewDriver({ driverCode: '', firstName: '', lastName: '', phoneNumber: '' });
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
      setNewDriver({ driverCode: '', firstName: '', lastName: '', phoneNumber: '' });
    }
  };

  const handleRemoveDriver = (driverCode: string) => {
    setDrivers(drivers.filter((driver) => driver.driverCode !== driverCode));
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
