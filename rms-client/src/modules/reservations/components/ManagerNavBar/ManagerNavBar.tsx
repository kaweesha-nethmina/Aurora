import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you're using react-router-dom
import './ManagerNavBar.css'; // Import the CSS file

const ManagerNavBar: React.FC = () => {
  return (
    <nav className="nav-container">
      <div className="nav-left">
        <h1 className="nav-title">Admin Panel</h1>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/addroom" className="nav-link">Add Rooms</Link>
          </li>
          <li className="nav-item">
            <Link to="/roomtable" className="nav-link">Room Details</Link>
          </li>
          <li className="nav-item">
            <Link to="/reservationtable" className="nav-link">Reservations</Link>
          </li>
          <li className="nav-item">
            <Link to="/canceltable" className="nav-link">Canceled Reservations</Link>
          </li>
          <li className="nav-item">
            <Link to="/reports" className="nav-link">Reports</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ManagerNavBar;

