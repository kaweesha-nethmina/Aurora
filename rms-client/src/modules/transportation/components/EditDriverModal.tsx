import React, { useState } from 'react';
import './EditDriverModal.css'; // Create styles for modal if needed

interface Driver {
  driverCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface EditDriverModalProps {
  driver: Driver;
  onSave: (updatedDriver: Driver) => void;
  onClose: () => void;
}

const EditDriverModal: React.FC<EditDriverModalProps> = ({ driver, onSave, onClose }) => {
  const [updatedDriver, setUpdatedDriver] = useState<Driver>(driver);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedDriver((prevDriver) => ({
      ...prevDriver,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(updatedDriver); // Call the parent function to save changes
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Driver</h2>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={updatedDriver.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={updatedDriver.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={updatedDriver.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <div className="modal-actions">
          <button className='ed' onClick={handleSubmit}>Save</button>
          <button className='de' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditDriverModal;
