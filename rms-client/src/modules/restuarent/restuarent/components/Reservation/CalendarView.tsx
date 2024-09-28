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
    const available = Math.floor(Math.random() * 10); // Random available table count (for demo purposes)
    setAvailableTables(available);
  };

  useEffect(() => {
    if (selectedDate) {
      checkTableAvailability(selectedDate);
    }
  }, [selectedDate]);

  // Function to apply custom classes to calendar tiles
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    let className = '';

    // Highlight weekends
    if (view === 'month' && (date.getDay() === 0 || date.getDay() === 6)) {
      className += ' weekend'; // Apply weekend class
    }

    // Highlight the selected date
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      className += ' selected'; // Apply selected date class
    }

    return className;
  };

  return (
    <div className="calendar-view">
      <h3>Select a date to check available tables</h3>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        minDate={new Date(arrivalDate)}
        maxDate={new Date(departureDate)}
        tileClassName={tileClassName} // Apply custom classes
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
