import { useState } from 'react';

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
}

const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, name: 'Wedding', date: '2023-03-01', time: '10:00 AM', location: 'Beach' },
    { id: 2, name: 'Conference', date: '2023-03-15', time: '9:00 AM', location: 'Conference Room' },
  ]);

  const [newEvent, setNewEvent] = useState<Event>({
    id: 0,
    name: '',
    date: '',
    time: '',
    location: '',
  });

  const handleAddEvent = () => {
    if (newEvent.id == 0){
        //add new event
        setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    }
    else{
        //update existing events
        setEvents(events.map(event => event.id == newEvent.id ? newEvent : event))
    }  
    setNewEvent({ id: 0, name: '', date: '', time: '', location: '' });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleUpdateEvent = (event: Event) => {
    setNewEvent(event); //set the event to the form for updating
  }
  return { events, newEvent, setNewEvent, handleAddEvent, handleDeleteEvent, handleUpdateEvent };
};

export default useEvents;
