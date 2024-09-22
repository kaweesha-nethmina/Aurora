import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import EventForm from './EventForm';

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
}

interface EventListProps {
  events: Event[];
  handleDeleteEvent: (id: number) => void;
  handleUpdateEvent: (event: Event) => void;
  handleAddEvent: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, handleDeleteEvent , handleUpdateEvent , handleAddEvent }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newEvent, setNewEvent] = useState<Event>({
    id: events.length + 1, // Assuming you're auto-generating the id
    name: '',
    date: '',
    time: '',
    location: '',
  });

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
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
          handleAddEvent={() => {
            handleAddEvent(newEvent);
            setIsFormVisible(false); //Hide form after submission
          }}
        />
      )}

    </div>
  );
};

export default EventList;
