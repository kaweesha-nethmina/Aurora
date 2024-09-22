import React from 'react';
import axios from 'axios';

interface Event {
  id: string; // Ensure this is string to match AddEvent
  name: string;
  date: string;
  time: string;
  location: string;
  type: string;
}

interface EventFormProps {
  newEvent: Event;
  setNewEvent: React.Dispatch<React.SetStateAction<Event>>;
  handleAddEvent: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ newEvent, setNewEvent, handleAddEvent }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post<Event>('http://localhost:5000/api/events', newEvent);
      console.log('Event added successfully:', response.data);
      alert('Event added successfully!');
      handleAddEvent(); 
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event. Please try again.');
    }
  };

  return (
    <div className="event-form">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">Event ID (optional)</label>
          <input
            type="text"
            id="id"
            value={newEvent.id}
            onChange={(e) => setNewEvent({ ...newEvent, id: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            id="name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Event Type</label>
          <input
            type="text"
            id="type"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Event Time</label>
          <input
            type="time"
            id="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Event Location</label>
          <input
            type="text"
            id="location"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="add-button">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
