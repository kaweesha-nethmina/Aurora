import { Link } from 'react-router-dom';
import './../styles/EventCard.css';
import Header from '../../core/components/Header';


//Add Event Cards to display
const events = [
    { id: 1, name: 'Event 1', date: '2024-01-01', location: 'Location 1', description: 'Description 1' },
    { id: 2, name: 'Event 2', date: '2024-01-02', location: 'Location 2', description: 'Description 2' },
    { id: 3, name: 'Event 3', date: '2024-01-03', location: 'Location 3', description: 'Description 3' },
  ];

const EventCard = () => {
    return (
        <div className="event-card-container">
          <Header activeTab={'events'} />
          
          {events.map((event) => (
            <div className="event-card" key={event.id}>
              <h2>{event.name}</h2>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>{event.description}</p>
              <Link to={`/events/${event.id}`} className="view-details-btn">View Details</Link>
            </div>
          ))}
        </div>
      );
    };
export default EventCard;
