import React from 'react';
import './style/ManageDriver.css'; 

interface Driver {
  driverCode: string;
  firstName: string;
  lastName: string;
  idnumber: string;
  phoneNumber: string;
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
        <label className="driver-form-label">NIC</label>
        <input
          className="driver-form-input"
          type="text"
          value={newDriver.idnumber}
          onChange={(e) => setNewDriver({ ...newDriver, idnumber: e.target.value })}
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
