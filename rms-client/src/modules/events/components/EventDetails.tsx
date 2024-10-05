import { Link, useLocation, useNavigate } from 'react-router-dom';
import './../styles/EventDetails.css';
import Header from '../../core/components/Header';

const EventDetails = () => {
  const location = useLocation();
  const event = location.state?.event; // Accessing the passed event data
  const navigate = useNavigate();

  const handleBooking = () => {
    if (event.isCustom) {
      navigate(`/custom-events/${event.id}`, { state: { eventName: event.name, event } });
    } else {
      navigate(`/fixed-events/${event.id}`, { state: { eventName: event.name, event } });
    }
  };
  

  return (
    <div className='container1'>
      <Header activeTab={'events'} />
      <div className="ed-event-details">
      
      <h2>{event?.name}</h2>
      <p>{event?.date}</p>
      <p>{event?.location}</p>
      <p>{event?.description}</p>
      

      {event?.isCustom && event.details && (
        <div className="ed-customization-options">
          <h4>Customization Options</h4>
          <p>{event.details}</p>
        </div>
      )}

      <button onClick={handleBooking} className="ed-book-btn">Book Event</button>
      <Link to={'/eventcard'} className="ed-back-btn">Back</Link>
    </div>
    </div>
  );
};

export default EventDetails;
