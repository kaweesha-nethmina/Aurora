import { useState, useEffect } from 'react';
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

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
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
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  // Fetch drivers from the backend
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/drivers');
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };
    fetchDrivers();
  }, []);

  const handleEditDriver = (driver: Driver) => {
    setEditingDriver(driver);
    setNewDriver({
      driverCode: driver.driverCode,
      firstName: driver.firstName,
      lastName: driver.lastName,
      phoneNumber: driver.phoneNumber,
      NIC: driver.NIC || '',
      address: driver.address || '',
      dateOfBirth: driver.dateOfBirth || '',
      joinDate: driver.joinDate || '',
      driverLicenseInfo: {
        licenseType: driver.driverLicenseInfo?.licenseType || '',
        expirationDate: driver.driverLicenseInfo?.expirationDate || '',
      },
    });
    setIsPopupOpen(true);
  };
  

  const handleRemoveDriver = async (driverCode: string) => {
    try {
      await fetch(`http://localhost:5000/api/drivers/${driverCode}`, { method: 'DELETE' });
      setDrivers(drivers.filter((driver) => driver.driverCode !== driverCode));
    } catch (error) {
      console.error('Error removing driver:', error);
    }
  };

  const handleAddDriver = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDriver),
      });
      const addedDriver = await response.json();
      setDrivers([...drivers, addedDriver.driver]);
      resetForm();
    } catch (error) {
      console.error('Error adding driver:', error);
    }
  };

  const handleUpdateDriver = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/drivers/${editingDriver?.driverCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDriver),
      });
      const updatedDriver = await response.json();
      setDrivers(drivers.map(driver => driver.driverCode === updatedDriver.driver.driverCode ? updatedDriver.driver : driver));
      resetForm();
    } catch (error) {
      console.error('Error updating driver:', error);
    }
  };

  const resetForm = () => {
    setEditingDriver(null);
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
    setIsPopupOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDriver) {
      handleUpdateDriver();
    } else {
      handleAddDriver();
    }
  };

  return (
    <div className="driver-container">
      
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
            <th>License Type</th>
            <th>License Expiration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.driverCode}>
              <td>{driver.driverCode}</td>
              <td>{driver.firstName}</td>
              <td>{driver.lastName}</td>
              <td>{driver.phoneNumber}</td>
              <td>{driver.NIC}</td>
              <td>{driver.address}</td>
              <td>{driver.dateOfBirth}</td>
              <td>{driver.joinDate}</td>
              <td>{driver.driverLicenseInfo?.licenseType || 'N/A'}</td>
              <td>{driver.driverLicenseInfo?.expirationDate || 'N/A'}</td>
              <td>
                <button onClick={() => handleEditDriver(driver)}>Edit</button>
                <button onClick={() => handleRemoveDriver(driver.driverCode)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup for adding/updating driver */}
      {isPopupOpen && (
        <div className="popup">
          <h2>{editingDriver ? 'Edit Driver' : 'Add Driver'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="driverCode"
              value={newDriver.driverCode}
              onChange={(e) => setNewDriver({ ...newDriver, driverCode: e.target.value })}
              placeholder="Driver Code"
              required
            />
            <input
              type="text"
              name="firstName"
              value={newDriver.firstName}
              onChange={(e) => setNewDriver({ ...newDriver, firstName: e.target.value })}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={newDriver.lastName}
              onChange={(e) => setNewDriver({ ...newDriver, lastName: e.target.value })}
              placeholder="Last Name"
              required
            />
            <input
              type="text"
              name="phoneNumber"
              value={newDriver.phoneNumber}
              onChange={(e) => setNewDriver({ ...newDriver, phoneNumber: e.target.value })}
              placeholder="Phone Number"
              required
              pattern="\d{10}"
              title="Phone number must be 10 digits"
            />
            <input
              type="text"
              name="NIC"
              value={newDriver.NIC}
              onChange={(e) => setNewDriver({ ...newDriver, NIC: e.target.value })}
              placeholder="NIC"
              required
            />
            <input
              type="text"
              name="address"
              value={newDriver.address}
              onChange={(e) => setNewDriver({ ...newDriver, address: e.target.value })}
              placeholder="Address"
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              value={newDriver.dateOfBirth}
              onChange={(e) => setNewDriver({ ...newDriver, dateOfBirth: e.target.value })}
              required
            />
            <input
              type="date"
              name="joinDate"
              value={newDriver.joinDate}
              onChange={(e) => setNewDriver({ ...newDriver, joinDate: e.target.value })}
              required
            />
            <input
              type="text"
              name="licenseType"
              value={newDriver.driverLicenseInfo.licenseType}
              onChange={(e) => setNewDriver({ ...newDriver, driverLicenseInfo: { ...newDriver.driverLicenseInfo, licenseType: e.target.value } })}
              placeholder="License Type"
              required
            />
            <input
              type="date"
              name="expirationDate"
              value={newDriver.driverLicenseInfo.expirationDate}
              onChange={(e) => setNewDriver({ ...newDriver, driverLicenseInfo: { ...newDriver.driverLicenseInfo, expirationDate: e.target.value } })}
              required
            />
            <button type="submit">{editingDriver ? 'Update Driver' : 'Add Driver'}</button>
            <button type="button" onClick={resetForm}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageDrivers;
