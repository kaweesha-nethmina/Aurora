import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DriverTable from './DriverTable';
import EditDriverModal from './EditDriverModal'; // Import the modal component
import './style/ManageDriver.css'; 

interface Driver {
  driverCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null); // Driver selected for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  // Fetch drivers from the API when component mounts
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get<Driver[]>('http://localhost:5000/api/drivers');
        setDrivers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch drivers');
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleEditDriver = (driver: Driver) => {
    setSelectedDriver(driver); // Set the driver to be edited
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdateDriver = async (updatedDriver: Driver) => {
    try {
      const response = await axios.put<{ driver: Driver }>(`http://localhost:5000/api/drivers/${updatedDriver.driverCode}`, updatedDriver);
      const updatedData = response.data.driver;
      setDrivers(drivers.map(driver => (driver.driverCode === updatedDriver.driverCode ? updatedData : driver)));
      setIsModalOpen(false); // Close the modal
      setSelectedDriver(null); // Reset the selected driver
    } catch (err) {
      console.error('Error updating driver:', err);
    }
  };

  const handleRemoveDriver = async (driverCode: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/drivers/${driverCode}`);
      setDrivers(drivers.filter((driver) => driver.driverCode !== driverCode));
    } catch (err) {
      console.error('Error removing driver:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="driver-container">
      <DriverTable
        drivers={drivers}
        handleEditDriver={handleEditDriver}
        handleRemoveDriver={handleRemoveDriver}
      />
      {isModalOpen && selectedDriver && (
        <EditDriverModal
          driver={selectedDriver}
          onSave={handleUpdateDriver}
          onClose={() => setIsModalOpen(false)} // Close modal on cancel
        />
      )}
    </div>
  );
};

export default ManageDrivers;
