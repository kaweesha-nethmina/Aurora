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
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setNewEvent({ id: 0, name: '', date: '', time: '', location: '' });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return { events, newEvent, setNewEvent, handleAddEvent, handleDeleteEvent };
};

export default useEvents;
