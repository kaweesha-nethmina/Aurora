import { Link, useParams } from 'react-router-dom';
import './../styles/EventDetails.css';
import Header from '../../core/components/Header';

const events = [
    { id: 1, name: 'Event 1', date: '2024-01-01', location: 'Location 1', description: 'Description 1' },
    { id: 2, name: 'Event 2', date: '2024-01-02', location: 'Location 2', description: 'Description 2' },
    { id: 3, name: 'Event 3', date: '2024-01-03', location: 'Location 3', description: 'Description 3' },
  ];

const EventDetails = () => {
  const { id } = useParams();
  const event = events.find((event) => event.id === parseInt(id || ''));

  return (
    <div className="event-details">
      <Header activeTab={'events'} />
      <h2>{event?.name}</h2>
      <p>{event?.date}</p>
      <p>{event?.location}</p>
      <p>{event?.description}</p>
      <Link to={`/events/${event?.id}/book`} className="book-btn">Book Event</Link>
      <Link to={'/eventcard'} className="back-btn">Back</Link>
    </div>
  );
};

export default EventDetails;
