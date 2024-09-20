import React from 'react';
import './AddDriverForm.css';


const AddDriverForm: React.FC = () => {
  return (
    <form className="add-driver-form">
      <h2>Add Driver</h2>
      <div className="form-group">
        <input
          type="text"
          name="driverCode"
          placeholder="Driver Code"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          required
          pattern="\d{10}" // Assuming 10-digit phone number
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
