import React from 'react';
import { Link } from 'react-router-dom';
import './RoomManagerHeader.css'; // Custom CSS for RoomManagerHeader
import userIcon from '../../../core/Images/user.png'; // Path to your user icon image

interface RoomManagerHeaderProps {
  activeTab: string;
}

const RoomManagerHeader: React.FC<RoomManagerHeaderProps> = ({ activeTab }) => {
  return (
    <header className="header">
      <nav className="nav-links">
        <Link to="/roommanager/addroom" className={activeTab === 'addrooms' ? 'active' : ''}>Add Rooms</Link>
        <Link to="/roommanager/roomdetails" className={activeTab === 'roomdetails' ? 'active' : ''}>Room Details</Link>
        <Link to="/roommanager/reservations" className={activeTab === 'reservations' ? 'active' : ''}>Reservations</Link>
        <Link to="/roommanager/reports" className={activeTab === 'reports' ? 'active' : ''}>Reports</Link>
      </nav>
      <div className="user-icon">
        <img src={userIcon} alt="User Icon" />
      </div>
    </header>
  );
};

export default RoomManagerHeader;
