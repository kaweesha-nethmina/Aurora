
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import useEvents from './states/useEvents';

import './styles.css';

const EventManagement = () => {
  const { events, newEvent, setNewEvent, handleAddEvent, handleDeleteEvent, handleUpdateEvent } = useEvents();

  return (
    <div className="containere">
      <div className="content">
        <EventList events={events} handleDeleteEvent={handleDeleteEvent} handleUpdateEvent={handleUpdateEvent} handleAddEvent={handleAddEvent}/>
        
      </div>
    </div>
  );
};



export default EventManagement;
