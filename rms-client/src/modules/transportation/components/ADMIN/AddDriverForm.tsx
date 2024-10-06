import React, { useState } from 'react';
import axios from 'axios';
import './AddDriverForm.css';

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

const AddDriverForm: React.FC = () => {
  const [driver, setDriver] = useState<Driver>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle nested state updates for driverLicenseInfo
    if (name.startsWith('licenseType') || name.startsWith('expirationDate')) {
      const key = name.startsWith('licenseType') ? 'licenseType' : 'expirationDate';
      setDriver((prevDriver) => ({
        ...prevDriver,
        driverLicenseInfo: {
          ...prevDriver.driverLicenseInfo,
          [key]: value,
        },
      }));
    } else {
      setDriver({ ...driver, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/drivers', driver);
      alert('Driver added successfully!');
      // Clear the form after submission
      setDriver({
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
    } catch (error) {
      alert('Error adding driver');
    }
  };

  return (
    <form className="add-driver-form" onSubmit={handleSubmit}>
      <h2>Add Driver</h2>
      <div className="form-group">
        <input
          type="text"
          name="driverCode"
          value={driver.driverCode}
          onChange={handleChange}
          placeholder="Driver Code"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="firstName"
          value={driver.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="lastName"
          value={driver.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="phoneNumber"
          value={driver.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          pattern="\d{10}"
          title="Phone number must be 10 digits"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="NIC"
          value={driver.NIC}
          onChange={handleChange}
          placeholder="NIC"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="address"
          value={driver.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
      </div>
      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={driver.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Join Date</label>
        <input
          type="date"
          name="joinDate"
          value={driver.joinDate}
          onChange={handleChange}
          required
        />
      </div>
      {/* Driver License Information Section */}
      <h3>Driver License Information</h3>
      <div className="form-group">
        <input
          type="text"
          name="licenseType"
          value={driver.driverLicenseInfo.licenseType}
          onChange={handleChange}
          placeholder="License Type"
          required
        />
      </div>
      <div className="form-group">
        <label>License Expiration Date</label>
        <input
          type="date"
          name="expirationDate"
          value={driver.driverLicenseInfo.expirationDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Add Driver
      </button>
    </form>
  );
};

export default AddDriverForm;
