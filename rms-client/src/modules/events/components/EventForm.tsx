import React from 'react';

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
}

interface EventFormProps {
  newEvent: Event;
  setNewEvent: React.Dispatch<React.SetStateAction<Event>>;
  handleAddEvent: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ newEvent, setNewEvent, handleAddEvent }) => {
  /*const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddEvent();
  };*/

  return (
    <div className="event-form">
      <h2>Add New Event</h2>
      <form>
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

        <button type="button" className="add-button" onClick={handleAddEvent}>
          Add Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
