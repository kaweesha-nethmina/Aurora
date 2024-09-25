import React, { useState } from 'react';
import axios from 'axios';
import './AddDriverForm.css';

interface Driver {
  driverCode: string;
  firstName: string;
  lastName: string;
  IDNumber: string;
  phoneNumber: string;
}

const AddDriverForm: React.FC = () => {
  const [driver, setDriver] = useState<Driver>({
    driverCode: '',
    firstName: '',
    lastName: '',
    IDNumber: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriver({ ...driver, [name]: value });
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
        IDNumber: '',
        phoneNumber: '',
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
          name="IDNumber"
          value={driver.IDNumber}
          onChange={handleChange}
          placeholder="NIC"
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
      <button type="submit" className="submit-button">
        Add Driver
      </button>
    </form>
  );
};

export default AddDriverForm;
