// src/modules/navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you're using react-router-dom
import './Onavbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className="nav-containerM">
      <div className="nav-left">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="#" className="nav-link">View Bookings</Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link">Payment</Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link">Terms&Conditions</Link>
          </li>

        </ul>
      </div>

    </nav>
  );
};

export default Navbar;
