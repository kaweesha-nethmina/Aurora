import { useState } from 'react';
import EventForm from '../EventForm';
import './AddEvent.css';
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
  image?: File; 
}

export const AddEvent = () => {
  // Initial state for the new event
  const [newEvent, setNewEvent] = useState<Event>({
    id: '',
    name: '',
    date: '',
    time: '',
    location: '',
    type: '',
    isCustom: false,
    details: '',
    image: undefined,
  });

  // Function to handle adding a new event
  const handleAddEvent = async () => {
    try {
      const formData = new FormData();
      formData.append('id', newEvent.id);
      formData.append('name', newEvent.name);
      formData.append('date', newEvent.date);
      formData.append('time', newEvent.time);
      formData.append('location', newEvent.location);
      formData.append('type', newEvent.type);
      formData.append('isCustom', String(newEvent.isCustom));
      formData.append('details', newEvent.details || '');

      if (newEvent.image) {
        formData.append('image', newEvent.image); // Append image if it exists
      }

      const response = await axios.post('http://localhost:5000/api/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Event added successfully:', response.data); // Log success message

      // Reset the form after adding
      setNewEvent({
        id: '',
        name: '',
        date: '',
        time: '',
        location: '',
        type: '',
        isCustom: false,
        details: '',
        image: undefined,
      });
    } catch (error: unknown) {
      // Handle error safely with type assertion
      const message = (error as Error).message || 'Failed to add event';
      console.error('Error adding event:', message);
    }
  };

  return (
    <div className='ev-container'>
      <EventForm newEvent={newEvent} setNewEvent={setNewEvent} handleAddEvent={handleAddEvent} />
    </div>
  );
};

export default AddEvent;
