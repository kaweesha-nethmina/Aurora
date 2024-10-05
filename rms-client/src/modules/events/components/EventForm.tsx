import React from 'react';
import axios from 'axios';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  type: string;
  image?: File;
  isCustom: boolean;
  details?: string;
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
      const formData = new FormData();
      formData.append('id', newEvent.id);
      formData.append('name', newEvent.name);
      formData.append('date', newEvent.date);
      formData.append('time', newEvent.time);
      formData.append('location', newEvent.location);
      formData.append('type', newEvent.type);
      formData.append('isCustom', String(newEvent.isCustom)); // Convert boolean to string
      if (newEvent.details) formData.append('details', newEvent.details);
      if (newEvent.image) formData.append('image', newEvent.image);

      const response = await axios.post<Event>('http://localhost:5000/api/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      console.log('Event added successfully:', response.data);
      alert('Event added successfully!');
      handleAddEvent(); // Call the function to reset state and refresh the event list
    } catch (error: any) {
      console.error('Error adding event:', error.response?.data || error.message);
      alert('Error adding event. Please try again.');
    }
  };

  const eventTypes = ['Wedding', 'Party', 'Sport', 'Picnic', 'Beach'];

  return (
    <div className="event-form">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">Event ID</label>
          <input
            type="text"
            id="id"
            value={newEvent.id}
            onChange={(e) => setNewEvent({ ...newEvent, id: e.target.value })}
            required
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
          <select
            id="type"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
            required
          >
            <option value="">Select Event Type</option>
            {eventTypes.map((eventType) => (
              <option key={eventType} value={eventType}>
                {eventType}
              </option>
            ))}
          </select>
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

        <div className="form-group">
          <label htmlFor="isCustom">Is Customizable?</label>
          <select
            id="isCustom"
            value={newEvent.isCustom ? "true" : "false"}
            onChange={(e) => setNewEvent({ ...newEvent, isCustom: e.target.value === "true" })}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="details">Details</label>
          <textarea
            id="details"
            value={newEvent.details}
            onChange={(e) => setNewEvent({ ...newEvent, details: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setNewEvent({ ...newEvent, image: e.target.files[0] });
              }
            }}
          />
        </div>

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default EventForm;
