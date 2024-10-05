import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../core/components/Header';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './../styles/FixedEventPayment.css';

const FixedEventDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  const [availableSlots, setAvailableSlots] = useState<string[]>([
    '07:00 AM - 08:00 AM',
    '08:00 AM - 09:00 AM',
    '05:00 PM - 06:00 PM'
  ]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [participantCount, setParticipantCount] = useState<number>(1);

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setAvailableSlots((prevSlots) => prevSlots.filter((s) => s !== slot));
  };

  const handleSubmitBooking = () => {
    if (!selectedSlot || !selectedDate || participantCount < 1) {
      alert('Please select a date, time slot, and participant count.');
      return;
    }

    // Log to verify the values being passed
    console.log('Submitting booking with:', {
      participantCount,
      perPersonCharge: event.perPersonCharge
    });

    navigate('/fixed-event-payment', {
      state: { numOfParticipants: participantCount, perPersonCharge: event.perPersonCharge }
    });
  };

  const handleParticipantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    if (count > 0) {
      setParticipantCount(count);
    }
  };

  return (
    <div className="event-details">
      <Header activeTab={'events'} />
      <h2>{event?.name}</h2>
      <p>{event?.description}</p>

      <div className="event-date-selection">
        <h3>Select Event Date:</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          minDate={new Date()}
          placeholderText="Select a date"
          className="date-picker"
        />
      </div>
      <br />

      <div className="time-slots">
        <h3>Select a Time Slot:</h3>
        {availableSlots.length > 0 ? (
          availableSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => handleSlotSelect(slot)}
              disabled={selectedSlot === slot}
              className={selectedSlot === slot ? 'selected-slot' : 'time-slot'}
            >
              {slot}
            </button>
          ))
        ) : (
          <p>All slots are booked!</p>
        )}
      </div>
      <br />

      <div className="event-participant-count">
        <h3>Enter Number of Participants:</h3>
        <input
          type="number"
          value={participantCount}
          onChange={handleParticipantChange}
          min="1"
          className="participant-input"
        />
      </div>

      <button onClick={handleSubmitBooking} className="book-btn">
        Confirm Booking
      </button>

      <Link to="/eventcard" className="back-btn">
        Back
      </Link>
    </div>
  );
};

export default FixedEventDetails;
