import { useState } from 'react';
import EventForm from '../EventForm';
import './AddEvent.css';
interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  type: string;
}

export const AddEvent = () => {
  // Initial state for the new event
  const [newEvent, setNewEvent] = useState<Event>({
    id: Date.now(),
    name: '',
    date: '',
    time: '',
    location: '',
    type: '' // Add this
  });
  

  // Function to handle adding a new event
  const handleAddEvent = () => {
    // Optionally reset the form after adding
    setNewEvent({
      id: Date.now(),
      name: '',
      date: '',
      time: '',
      location: '',
      type: ''
    });
  };

  return (
    <div className='ev-container'>
     <EventForm newEvent={newEvent} setNewEvent={setNewEvent} handleAddEvent={handleAddEvent} />
    </div>
  );
};
export default AddEvent;