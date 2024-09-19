// /reservations/components/CalendarView.tsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './reservation.css';

interface CalendarViewProps {
  arrivalDate: string;
  departureDate: string;
}

const CalendarView: React.FC<CalendarViewProps> = ({ arrivalDate, departureDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTables, setAvailableTables] = useState<number>(0);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    checkTableAvailability(date);
  };

  // Simulated API call to check availability for the selected date
  const checkTableAvailability = (_date: Date) => {
    // Dummy logic for table availability (replace this with actual API call)
    const available = Math.floor(Math.random() * 10); // Random available table count (for demo purposes)
    setAvailableTables(available);
  };

  useEffect(() => {
    if (selectedDate) {
      checkTableAvailability(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="calendar-view">
      <h3>Select a date to check available tables</h3>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        minDate={new Date(arrivalDate)}
        maxDate={new Date(departureDate)}
      />
      {selectedDate && (
        <div className="availability-info">
          <p>Selected Date: {selectedDate.toDateString()}</p>
          <p>Available Tables: {availableTables}</p>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
