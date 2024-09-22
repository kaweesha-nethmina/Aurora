import { Link, useLocation } from 'react-router-dom';
import './../styles/EventDetails.css';
import Header from '../../core/components/Header';

const EventDetails = () => {
  const location = useLocation();
  const event = location.state?.event; // Accessing the passed event data

  return (
    <div className="event-details">
      <div className='aaa'>
      <Header activeTab={'events'} />
      <h2>{event?.name}</h2>
      <p>{event?.date}</p>
      <p>{event?.location}</p>
      <p>{event?.description}</p>
      <Link to={`/events/${event?.id}/book`} className="book-btn">Book Event</Link>
      <Link to={'/eventcard'} className="back-btn">Back</Link>
      </div>
    </div>
  );
};

export default EventDetails;
