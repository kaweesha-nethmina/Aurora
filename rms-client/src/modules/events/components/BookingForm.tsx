import { useState } from 'react';
import './../styles/BookingForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../core/components/Header';

const BookingForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [guests, setGuests] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name, email, phone, eventDate, startTime, endTime, guests);
    navigate(`/events/${id}/payment`);

  };

  

  const handleBackClick =() => {
    navigate(`/events/${id}`);
  };

  return (
    <div className='bform-container'>
      <Header activeTab={'events'} />
      <form onSubmit={handleSubmit} className="booking-form-event">
      <h2>Booking Form</h2>
      
      <label>Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      
      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      <label>Phone</label>
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      
      <label>Event Date</label>
      <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)}  />

      <label>Start Time</label>
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}  />

      <label>End Time</label>
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}  />

      <label>Number of Guests</label>
      <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} />
      
      <button type="submit">Book Event</button>
      
      <button type="button" onClick={handleBackClick}>Back</button>
      
    </form>
    </div>
    
  );
};

export default BookingForm;
