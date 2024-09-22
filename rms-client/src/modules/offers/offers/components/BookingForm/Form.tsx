import React from 'react';
import { useForm } from '../../hooks/useForm';
import './Form.css';
import Header from '../../../../core/components/Header';

const Form = () => {
  const { formValues, errors, handleChange, handleSubmit } = useForm();

  return (
    <div className="form-containerOf">
      <Header activeTab={'offers'} />
      <h2 className="form-title">Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
            className={`form-input ${errors.fullName ? 'form-input-error' : ''}`}
          />
          {errors.fullName && <p className="form-error">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="nic">NIC</label>
          <input
            type="text"
            id="nic"
            name="nic"
            value={formValues.nic}
            onChange={handleChange}
            className={`form-input ${errors.nic ? 'form-input-error' : ''}`}
          />
          {errors.nic && <p className="form-error">{errors.nic}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChange}
            className={`form-input ${errors.phoneNumber ? 'form-input-error' : ''}`}
          />
          {errors.phoneNumber && <p className="form-error">{errors.phoneNumber}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
            className={`form-input ${errors.date ? 'form-input-error' : ''}`}
          />
          {errors.date && <p className="form-error">{errors.date}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            className={`form-input ${errors.description ? 'form-input-error' : ''}`}
          />
          {errors.description && <p className="form-error">{errors.description}</p>}
        </div>

        <button className="form-button" type="submit">Book</button>
      </form>
    </div>
  );
};

export default Form;
