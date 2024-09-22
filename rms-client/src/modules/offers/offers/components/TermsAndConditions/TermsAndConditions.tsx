import React, { useState } from 'react';
import '../TermsAndConditions/TermsAndConditions.css';
import Header from '../../../../core/components/Header';
import Navbar from '../nav/ONavbar';

const TermsAndConditions = () => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(!accepted);
  };

  return (
    <div className="containerof">
      <Header activeTab={'offers'} />
      <Navbar />
      <div className='ofcon'>
      <img
        src="https://i.pinimg.com/564x/1a/55/ad/1a55ad12640a86cea9277c19cbc8b37f.jpg"
        alt="Terms and Conditions"
        className="image"
      />
      <h1 className="title">Terms and Conditions</h1>
      <p className="description">
        Please read these terms and conditions carefully before making a booking.
      </p>
      <ul className="list">
        <li className="list-item">Bookings must be guaranteed with a credit card at the time of booking.</li>
        <li className="list-item">Booking can be cancelled or amended 72 hours prior to arrival date; after that, a late cancellation fee equivalent to one night’s stay is applicable.</li>
        <li className="list-item">Subject to availability at time of booking.</li>
        <li className="list-item">Assigned room categories only.</li>
        <li className="list-item">Offer does not apply to group bookings of six rooms or more.</li>
        <li className="list-item">Rates are valid for double occupancy and are inclusive of VAT.</li>
        <li className="list-item">Not valid in conjunction with any other offer.</li>
      </ul>
      <div className="acceptance">
        <input
          type="checkbox"
          id="accept"
          checked={accepted}
          onChange={handleAccept}
          className="checkbox"
        />
        <label htmlFor="accept" className="label">I have read and accepted the terms and conditions.</label>
      </div>
      <div className="contact-info">
        <p>If you have any questions or concerns, please don't hesitate to contact us:</p>
        <p>Phone: 123-456-7890</p>
        <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        <p>Address: 123 Main St, Anytown, USA 12345</p>
      </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
