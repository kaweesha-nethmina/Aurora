import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../styles/EventCard.css';
import Header from '../../core/components/Header';
import axios from 'axios';

// Define the Event type
interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  image?: string; // Optional image field
}

const EventCard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>('http://localhost:5000/api/events');
        setEvents(response.data);
        setFilteredEvents(response.data); // Initialize filtered events
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on the search term
  useEffect(() => {
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="event-card-container">
      <Header activeTab={'events'} />

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar2"
      />

      <div className="event-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div className="event-card" key={event.id}>
              {event.image && <img src={event.image} alt={event.name} className="event-image" />}
              <div className="event-content">
                <h2>{event.name}</h2>
                <p className="event-location">{event.location}</p>
                <p className="event-description">{event.description}</p>
                <Link
                  to={`/events/${event.id}`}
                  state={{ event }}
                  className="view-details-btn"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventCard;
