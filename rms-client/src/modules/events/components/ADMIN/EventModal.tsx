import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  type: string;
  isCustom: boolean; 
  details?: string;
  image?: string; // Use a string type for the image URL
}

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
  onUpdate: (updatedEvent: Event) => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose, onUpdate }) => {
  const [updatedEvent, setUpdatedEvent] = useState<Event | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (event) {
      setUpdatedEvent(event);
      setImagePreview(event.image || null); // Set preview to existing image
    }
  }, [event]);

  useEffect(() => {
    if (imageFile) {
      const previewUrl = URL.createObjectURL(imageFile);
      setImagePreview(previewUrl); // Create a preview URL for the image
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatedEvent) return;

    // Include the image URL from the preview
    const eventData = { ...updatedEvent, image: imagePreview };

    try {
      const response = await axios.put<Event>(`http://localhost:5000/api/events/${updatedEvent.id}`, eventData);
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event. Please try again.');
    }
  };

  if (!updatedEvent) return null; // Prevent rendering until updatedEvent is available

  return (
    <div className="event-modal">
      <h2 className="event-modal-title">Update Event</h2>
      <form className="event-modal-form" onSubmit={handleSubmit}>
        <div className="event-modal-input-group">
          <label className="event-modal-label">Name</label>
          <input
            type="text"
            className="event-modal-input"
            value={updatedEvent.name}
            onChange={(e) => setUpdatedEvent({ ...updatedEvent, name: e.target.value })}
            required
          />
        </div>
        <div className="event-modal-input-group">
          <label className="event-modal-label">Date</label>
          <input
            type="date"
            className="event-modal-input"
            value={updatedEvent.date}
            onChange={(e) => setUpdatedEvent({ ...updatedEvent, date: e.target.value })}
            required
          />
        </div>
        <div className="event-modal-input-group">
          <label className="event-modal-label">Time</label>
          <input
            type="time"
            className="event-modal-input"
            value={updatedEvent.time}
            onChange={(e) => setUpdatedEvent({ ...updatedEvent, time: e.target.value })}
            required
          />
        </div>
        <div className="event-modal-input-group">
          <label className="event-modal-label">Location</label>
          <input
            type="text"
            className="event-modal-input"
            value={updatedEvent.location}
            onChange={(e) => setUpdatedEvent({ ...updatedEvent, location: e.target.value })}
            required
          />
        </div>
        <div className="event-modal-input-group">
          <label className="event-modal-label">Type</label>
          <input
            type="text"
            className="event-modal-input"
            value={updatedEvent.type}
            onChange={(e) => setUpdatedEvent({ ...updatedEvent, type: e.target.value })}
            required
          />
        </div>
        <div className="event-modal-input-group">
          <label className="event-modal-label">Is Customizable?</label>
          <select
            className="event-modal-select"
            value={updatedEvent.isCustom ? "true" : "false"}
            onChange={(e) => setUpdatedEvent({ ...updatedEvent, isCustom: e.target.value === "true" })}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="event-modal-input-group">
          <label className="event-modal-label">Details</label>
          <textarea
            className="event-modal-textarea"
            value={updatedEvent.details}
            onChange={(e) => setUpdatedEvent({ ...updatedEvent, details: e.target.value })}
          />
        </div>
        <div className="event-modal-input-group">
          <label className="event-modal-label">Image Upload</label>
          <input
            type="file"
            className="event-modal-input"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImageFile(file);
            }}
          />
          {imagePreview && (
            <div className="event-modal-image-preview">
              <img src={imagePreview} alt="Event Preview" className="event-modal-image" />
            </div>
          )}
        </div>
        <button type="submit" className="event-modal-submit">Update Event</button>
      </form>
      <button onClick={onClose} className="event-modal-close">Close</button>
    </div>
  );
};

export default EventModal;
