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

interface DriverFormProps {
  newDriver: Driver;
  setNewDriver: React.Dispatch<React.SetStateAction<Driver>>;
  handleAddDriver: () => void;
  handleUpdateDriver: () => void;
  editingDriver: Driver | null;
}

const DriverForm: React.FC<DriverFormProps> = ({
  newDriver,
  setNewDriver,
  handleAddDriver,
  handleUpdateDriver,
  editingDriver,
}) => {
  return (
    <form className="driver-form">
      {/* Other driver fields */}
      <div className="driver-form-group">
        <label className="driver-form-label">Driver Code</label>
        <input
          className="driver-form-input"
          type="text"
          value={newDriver.driverCode}
          onChange={(e) => setNewDriver({ ...newDriver, driverCode: e.target.value })}
        />
      </div>
      <div className="driver-form-group">
        <label className="driver-form-label">First Name</label>
        <input
          className="driver-form-input"
          type="text"
          value={newDriver.firstName}
          onChange={(e) => setNewDriver({ ...newDriver, firstName: e.target.value })}
        />
      </div>
      <div className="driver-form-group">
        <label className="driver-form-label">Last Name</label>
        <input
          className="driver-form-input"
          type="text"
          value={newDriver.lastName}
          onChange={(e) => setNewDriver({ ...newDriver, lastName: e.target.value })}
        />
      </div>
      <div className="driver-form-group">
        <label className="driver-form-label">Phone Number</label>
        <input
          className="driver-form-input"
          type="text"
          value={newDriver.phoneNumber}
          onChange={(e) => setNewDriver({ ...newDriver, phoneNumber: e.target.value })}
        />
      </div>
      <div className="driver-form-group">
        <label className="driver-form-label">NIC</label>
        <input
          className="driver-form-input"
          type="text"
          value={newDriver.NIC}
          onChange={(e) => setNewDriver({ ...newDriver, NIC: e.target.value })}
        />
      </div>
      <div className="driver-form-group">
        <label className="driver-form-label">Address</label>
        <input
          className="driver-form-input"
          type="text"
          value={newDriver.address}
          onChange={(e) => setNewDriver({ ...newDriver, address: e.target.value })}
        />
      </div>
      <div className="driver-form-group">
        <label className="driver-form-label">Date of Birth</label>
        <input
          className="driver-form-input"
          type="date"
          value={newDriver.dateOfBirth}
          onChange={(e) => setNewDriver({ ...newDriver, dateOfBirth: e.target.value })}
        />
      </div>
      <div className="driver-form-group">
        <label className="driver-form-label">Join Date</label>
        <input
          className="driver-form-input"
          type="date"
          value={newDriver.joinDate}
          onChange={(e) => setNewDriver({ ...newDriver, joinDate: e.target.value })}
        />
      </div>

      {/* Driver License Information Section */}
      <div className="driver-form-group">
        <h3 className="driver-form-section-title">Driver License Information</h3> {/* Title */}
        <div className="driver-form-group">
          <label className="driver-form-label">License Type</label>
          <input
            className="driver-form-input"
            type="text"
            value={newDriver.driverLicenseInfo.licenseType}
            onChange={(e) =>
              setNewDriver({
                ...newDriver,
                driverLicenseInfo: { ...newDriver.driverLicenseInfo, licenseType: e.target.value },
              })
            }
          />
        </div>
        <div className="driver-form-group">
          <label className="driver-form-label">Expiration Date</label>
          <input
            className="driver-form-input"
            type="date"
            value={newDriver.driverLicenseInfo.expirationDate}
            onChange={(e) =>
              setNewDriver({
                ...newDriver,
                driverLicenseInfo: { ...newDriver.driverLicenseInfo, expirationDate: e.target.value },
              })
            }
          />
        </div>
      </div>

      <button
        className="driver-btn"
        onClick={editingDriver ? handleUpdateDriver : handleAddDriver}
        type="button"
      >
        {editingDriver ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default DriverForm;
