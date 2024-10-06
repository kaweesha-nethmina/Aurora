// src/modules/navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you're using react-router-dom
import './navbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className="nav-containerT">
      <div className="nav-left">
        <ul className="nav-menu">
        <li className="nav-item">
            <Link to="/transportation" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/Tbform" className="nav-link">Book Now</Link>
          </li>
          <li className="nav-item">
            <Link to="/mybook" className="nav-link">Mybookings</Link>
          </li>
          

        </ul>
      </div>

    </nav>
  );
};

export default Navbar;
