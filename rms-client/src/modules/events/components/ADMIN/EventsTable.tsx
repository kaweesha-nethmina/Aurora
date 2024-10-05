import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventModal from './EventModal';

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

const EventsTable: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleUpdateEvent = (eventId: string) => {
    const eventToEdit = events.find(event => event.id === eventId);
    setSelectedEvent(eventToEdit || null);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEventUpdate = (updatedEvent: Event) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  return (
    <div>
      <h2>Events List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Type</th>
            <th>Is Customizable</th>
            <th>Details</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.time}</td>
              <td>{event.location}</td>
              <td>{event.type}</td>
              <td>{event.isCustom ? 'Yes' : 'No'}</td>
              <td>{event.details || 'N/A'}</td>
              <td>
                {event.image ? (
                  <img src={event.image} alt={event.name} style={{width: '50px', height: '50px'}} />
                ) : (
                  'No image'
                )}
              </td>
              <td>
                <button onClick={() => handleUpdateEvent(event.id)}>Update</button>
                <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <EventModal
          event={selectedEvent}
          onClose={handleModalClose}
          onUpdate={handleEventUpdate}
        />
      )}
    </div>
  );
};

export default EventsTable;