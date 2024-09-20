// src/modules/navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you're using react-router-dom
import '../navbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className="nav-containerM">
      <div className="nav-left">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/roomreservation" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/profilescreen" className="nav-link">My Bookings</Link>
          </li>

        </ul>
      </div>

    </nav>
  );
};

export default Navbar;
