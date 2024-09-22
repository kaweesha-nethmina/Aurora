import React, { useState } from 'react';

interface GymAppointmentState {
  name: string;
  email: string;
  phoneNumber: string;
  service: string;
  date: string;
  time: string;
}

const GymAppointmentForm: React.FC = () => {
  const [state, setState] = useState<GymAppointmentState>({
    name: '',
    email: '',
    phoneNumber: '',
    service: '',
    date: '',
    time: '',
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormSubmitted(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="form-container">
      <h2>Gym Appointment Form</h2>
      {isFormSubmitted ? (
        <div className="form-submitted">Form submitted successfully!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={state.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={state.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="service">Service</label>
            <select
              id="service"
              name="service"
              value={state.service}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a service</option>
              <option value="yoga">Yoga</option>
              <option value="cardio">Cardio</option>
              <option value="strength training">Strength Training</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={state.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={state.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <button className="submit-button" type="submit">
            Book Now
          </button>
        </form>
      )}
    </div>
  );
};

export default GymAppointmentForm;
