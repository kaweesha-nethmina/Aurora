import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../styles/EventCard.css';
import Header from '../../core/components/Header';
import axios from 'axios';

// Define the Event type
interface Event {
  id: string; // Use string if you're using a custom ID
  name: string;
  date: string;
  location: string;
  description: string;
  image?: string;  // Optional image field
}

const EventCard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="event-card-container">
      <Header activeTab={'events'} />

      <div className="event-grid">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            {/* Optional Image */}
            {event.image && <img src={event.image} alt={event.name} className="event-image" />}
            <div className="event-content">
              <h2>{event.name}</h2>
              <p className="event-location">{event.location}</p>
              <p className="event-description">{event.description}</p>
              <Link
                to={`/events/${event.id}`} // Only the pathname
                state={{ event }} // Passing event data as state
                className="view-details-btn"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
