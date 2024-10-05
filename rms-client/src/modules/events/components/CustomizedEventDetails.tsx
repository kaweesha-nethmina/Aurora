import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../core/components/Header';
import { useState } from 'react';
import DataPicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './../styles/CustomizedEventDetails.css'

const CustomizedEventDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  // State for guest inputs
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [resources, setResources] = useState<string[]>([]);

  const availableResources = ['DJ', 'Food Catering', 'Photography', 'Lighting', 'Decor'];

  const handleResourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setResources((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmitBooking = () => {
     // Validate fields
     if (!selectedDate) {
        alert('Please select a date.');
        return;
      }
      if (!selectedTime) {
        alert('Please select a time.');
        return;
      }
      if (guestCount < 1) {
        alert('Please enter a valid guest count.');
        return;
      }

      const perPersonCharge = 2500;

      navigate('/customized-event-payment', {
        state: { guestCount,perPersonCharge, additionalResources: resources }
      });
      // If validation passes, proceed with booking
      //alert('Booking Submitted');
  };

  return (
    <div className="ced-event-details">
      <Header activeTab={'events'} />
      <h2>{event?.name}</h2>
      <p>{event?.description}</p>

      <div className="ced-event_calendar-container">
        <label>Select Date:</label>
        <DataPicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          minDate={new Date()}
        />
      </div>

      <div className="ced-event_time_selection">
        <label>Select Time:</label>
        <select value={selectedTime} onChange={handleTimeChange}>
          <option value="">--Select Time--</option>
          <option value="08:00">08:00 AM</option>
          <option value="12:00">12:00 PM</option>
          <option value="16:00">04:00 PM</option>
        </select>
      </div>

      <div className="ced-event-guest-count">
        <label>Guest Count:</label>
        <input
          type="number"
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}
          min="1"
        />
      </div>

      <div className="ced-event-resources">
        <label>Request Additional Resources:</label>
        {availableResources.map((resource) => (
          <div key={resource}>
            <input
              type="checkbox"
              value={resource}
              onChange={handleResourceChange}
              checked={resources.includes(resource)}
            />
            {resource}
          </div>
        ))}
      </div>

      <button onClick={handleSubmitBooking} className="ced-submit-btn">Submit Booking</button>
      <Link to="/eventcard" className="ced-back-btn">Back</Link>
    </div>
  );
};

export default CustomizedEventDetails;
