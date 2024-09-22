// src/modules/navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you're using react-router-dom
import './Snavbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className="nav-containerS">
      <div className="nav-left">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/SpaPage" className="nav-link">Spa</Link>
          </li>
          <li className="nav-item">
            <Link to="/GymPage" className="nav-link">Gym</Link>
          </li>
          <li className="nav-item">
            <Link to="/MedicalPage" className="nav-link">Medical</Link>
          </li>
          <li className="nav-item">
            <Link to="/apoinments" className="nav-link">Appoinments</Link>
          </li>

        </ul>
      </div>

    </nav>
  );
};

export default Navbar;
