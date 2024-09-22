import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
  id: string; // MongoDB ObjectId as a string
  name: string;
  date: string;
  time: string;
  location: string;
  type: string;
}

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
  onUpdate: (updatedEvent: Event) => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Event | null>(null);

  useEffect(() => {
    setFormData(event);
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      try {
        const response = await axios.put<Event>(`http://localhost:5000/api/events/${formData.id}`, formData);
        onUpdate(response.data);
        onClose();
      } catch (error) {
        console.error('Error updating event:', error);
      }
    }
  };

  if (!formData) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Type</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            />
          </div>
          <button type="submit">Update Event</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
