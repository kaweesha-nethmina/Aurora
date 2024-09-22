import React, { useState } from 'react';
import EventForm from '../EventForm';
import './AddEvent.css';
interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
}

export const AddEvent = () => {
  // Initial state for the new event
  const [newEvent, setNewEvent] = useState<Event>({
    id: Date.now(), // You can use a unique value generator for id
    name: '',
    date: '',
    time: '',
    location: ''
  });

  // Function to handle adding a new event
  const handleAddEvent = () => {
    // Add the logic to add the event (e.g., save to a database, update UI)
    console.log('Event added:', newEvent);
    // Optionally reset the form after adding
    setNewEvent({
      id: Date.now(),
      name: '',
      date: '',
      time: '',
      location: ''
    });
  };

  return (
    <div className='ev-container'>
      <EventForm newEvent={newEvent} setNewEvent={setNewEvent} handleAddEvent={handleAddEvent} />
    </div>
  );
};
export default AddEvent;