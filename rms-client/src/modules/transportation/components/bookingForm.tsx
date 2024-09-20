import React, { useState } from 'react';
import './style/BookingForm.css';

interface Booking {
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropff: string;
  date: string;
  time: string;
  status: string;
}

const BookingForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showWaitingTable, setShowWaitingTable] = useState(false);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedBookings, setSelectedBookings] = useState<number[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newBooking: Booking = {
      name,
      email,
      phone,
      pickup,
      dropff,
      date,
      time,
      status: 'pending',
    };
    setBookings([...bookings, newBooking]);
    setShowWaitingTable(true);
    setName('');
    setEmail('');
    setPhone('');
    setPickup('');
    setDropoff('');
    setDate('');
    setTime('');
    setShowCheckboxes(false); // Reset checkboxes
    setSelectedBookings([]);
  };

  const handleCancelAllBookings = () => {
    if (bookings.length > 1) {
      setShowCheckboxes(!showCheckboxes);
    } else if (bookings.length === 1) {
      setBookings([]);
      setShowWaitingTable(false); // Hide the table when all bookings are cancelled
    }
  };

  const handleCancelSelected = () => {
    const filteredBookings = bookings.filter(
      (_, index) => !selectedBookings.includes(index)
    );
    setBookings(filteredBookings);
    if (filteredBookings.length === 0) {
      setShowWaitingTable(false); // Hide the table if no bookings left
    }
    setShowCheckboxes(false); // Hide checkboxes
    setSelectedBookings([]); // Clear selection
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedBookings((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index) // Remove if already selected
        : [...prevSelected, index] // Add if not selected
    );
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title">Book Your Vehicle</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                Name<span>*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email<span>*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">
                Phone<span>*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                placeholder="Enter your phone number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pickup">
                Pickup Location<span>*</span>
              </label>
              <input
                id="pickup"
                type="text"
                value={pickup}
                onChange={(event) => setPickup(event.target.value)}
                required
                placeholder="Enter pickup location"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dropff">
                Dropoff Location<span>*</span>
              </label>
              <input
                id="dropff"
                type="text"
                value={dropff}
                onChange={(event) => setDropoff(event.target.value)}
                required
                placeholder="Enter dropoff location"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">
                Date<span>*</span>
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="time">
                Time<span>*</span>
              </label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                required
              />
            </div>
          </div>

          <button className="submit-btn" type="submit">
            Book Now
          </button>
        </form>
      </div>

      {showWaitingTable && (
        <div className="table-container">
          <h2>Your Bookings</h2>
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Pickup</th>
                <th>Dropoff</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                {showCheckboxes && <th>Select</th>}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.pickup}</td>
                  <td>{booking.dropff}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td className={`status ${booking.status}`}>
                    {booking.status}
                  </td>
                  {showCheckboxes && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedBookings.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <button className="cancel-btn" onClick={handleCancelAllBookings}>
            Cancel Booking
          </button>

          {showCheckboxes && selectedBookings.length > 0 && (
            <button className="confirm-cancel-btn" onClick={handleCancelSelected}>
              Confirm Selected
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingForm;
