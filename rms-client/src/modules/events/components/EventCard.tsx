import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/EventCard.css';
import Header from '../../core/components/Header';

// Define the Event type
interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  image?: string;  // Optional image field
}

// Add Event Cards to display
const events: Event[] = [
  { id: 1, name: 'Weddings', date: '2024-01-01', location: 'Choose from 15 locations', description: 'Make your special day unforgettable with our luxurious wedding packages.', image: '/images/image1.jpg' },
  { id: 2, name: 'Conferences', date: '2024-01-02', location: 'Choose from 12 conference spaces', description: 'Host your next conference with state-of-the-art facilities and professional services.', image: '/images/event2.jpg' },
  { id: 3, name: 'Parties', date: '2024-01-03', location: 'Choose from 5 locations', description: 'Plan your party with us for a memorable and fun-filled experience.', image: '/images/event3.jpg' },
];

const EventCard: React.FC = () => {
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
              <Link to={`/events/${event.id}`} className="view-details-btn">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
