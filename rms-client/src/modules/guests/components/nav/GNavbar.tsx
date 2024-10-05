// src/modules/navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you're using react-router-dom
import './Gnavbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className="nav-containerM">
      <div className="nav-left">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/pr" className="nav-link">Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="/displayfeedback" className="nav-link">Feedback</Link>
          </li>
          <li className="nav-item">
            <Link to="/loyality" className="nav-link">Loyality</Link>
          </li>

        </ul>
      </div>

    </nav>
  );
};

export default Navbar;
