import React from 'react';
import { useSpaAppointmentForm } from '../../../hooks/Employee/useSpaAppointmentForm';
import './SpaAppointmentForm.css';

const SpaAppointmentForm: React.FC = () => {
  const { appointment, services, handleChange, handleSubmit } = useSpaAppointmentForm();

  return (
    <div className="form-container">
      <h2 className="form-title">Book a Spa Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            className="form-input"
            id="name"
            type="text"
            name="name"
            value={appointment.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-input"
            id="email"
            type="email"
            name="email"
            value={appointment.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="service">
            Service
          </label>
          <select
            className="form-input"
            id="service"
            name="service"
            value={appointment.service}
            onChange={handleChange}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input
            className="form-input"
            id="date"
            type="date"
            name="date"
            value={appointment.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="time">
            Time
          </label>
          <input
            className="form-input"
            id="time"
            type="time"
            name="time"
            value={appointment.time}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea
            className="form-input"
            id="message"
            name="message"
            value={appointment.message}
            onChange={handleChange}
          />
        </div>
        <button className="submit-button" type="submit">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default SpaAppointmentForm;
