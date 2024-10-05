import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import EventForm from './EventForm';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  type: string; //new
  isCustom: boolean; //new
  details?: string;
  image?:File;
}

interface EventListProps {
  events: Event[];
  handleDeleteEvent: (id: string) => void;
  handleUpdateEvent: (event: Event) => void;
  handleAddEvent: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, handleDeleteEvent , handleUpdateEvent , handleAddEvent }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newEvent, setNewEvent] = useState<Event>({
    id: '', // Assuming you're auto-generating the id
    name: '',
    date: '',
    time: '',
    location: '',
    type: '',
    //new
    isCustom: false,
    details:'',
    //image: '',
  });

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleFormSubmit = () => {
    handleAddEvent(newEvent); // Call to add event
    setNewEvent({
      id: '',
      name: '',
      date: '',
      time: '',
      location: '',
      type: '',
      isCustom: false,
      details: '',
    }); // Reset form after submission
    setIsFormVisible(false); // Hide form after submission
  };
  
  return (
    <div className="event-list">
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="event-item">

            <div className="event-details">
              <h3>{event.name}</h3>
              <p>{event.date} {event.time}</p>
              <p>{event.location}</p>
            </div>

            <button className="update-button" onClick={() => handleUpdateEvent(event)}>
              Update
            </button>

            <button className="delete-button" onClick={() => handleDeleteEvent(event.id)}>
              Delete
            </button>
          </li>
          
        ))}
      </ul>

      <button className="add-event-button" onClick={toggleFormVisibility}>
        {isFormVisible ? 'Cancel' : 'Add New Event'}
      </button>

      {isFormVisible && (
        <EventForm
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          handleAddEvent={handleFormSubmit}
        />
      )}

    </div>
  );
};

export default EventList;
