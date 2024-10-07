// src/modules/navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you're using react-router-dom
import './navbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className="nav-containerR">
      <div className="nav-left">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/menu" className="nav-link">Menu</Link>
          </li>
          <li className="nav-item">
            <Link to="/drinks" className="nav-link">Bar</Link>
          </li>
          <li className="nav-item">
            <Link to="/reservation-mybooking" className="nav-link">MyBookings</Link>
          </li>
          <li className="nav-item">
            <Link to="/aboutus" className="nav-link">About Us</Link>
          </li>

        </ul>
      </div>

    </nav>
  );
};

export default Navbar;
