import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../core/components/Header';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './../styles/FixedEventDetails.css'; // Ensure this path is correct

const FixedEventDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  // Define per person charge
  const perPersonCharge = 4000; // Set your per person charge here

  // Sample predefined options for time slots
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
    // Mark the selected slot as unavailable
    setAvailableSlots((prevSlots) => prevSlots.filter((s) => s !== slot));
  };

  const handleSubmitBooking = async () => {
    if (!selectedSlot || !selectedDate || participantCount < 1) {
      alert('Please select a date, time slot, and participant count.');
      return;
    }
  
    // Calculate total charge
    const totalCharge = participantCount * perPersonCharge;
  
    // Send booking data to backend
    try {
      const response = await fetch('http://localhost:5000/api/eventbookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event?.id, // Assuming event has an id
          date: selectedDate,
          timeSlot: selectedSlot,
          participantCount: participantCount,
          totalCharge: totalCharge,
          userId: 'exampleUserId', // Replace with actual user ID
          userName: 'John Doe', // Replace with actual user name
          contactInfo: 'johndoe@example.com', // Replace with actual contact info
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to book event');
      }
  
      const bookingData = await response.json();
      console.log('Booking confirmed:', bookingData);
  
      // Redirect to payment page
      navigate('/fixed-event-payment', {
        state: { 
          numOfParticipants: participantCount, 
          perPersonCharge: perPersonCharge 
        }
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Error: ' + error.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
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

      {/* Date Selection */}
      <div className="event-date-selection">
        <h3>Select Event Date:</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          minDate={new Date()} // Ensure the user cannot select a past date
          placeholderText="Select a date"
          className="date-picker"
        />
      </div>
      <br></br>

      {/* Time Slot Selection */}
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
      <br></br>

      {/* Participant Count */}
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

      {/* Back Button */}
      <Link to="/eventcard" className="back-btn">
        Back
      </Link>
    </div>
  );
};

export default FixedEventDetails;
