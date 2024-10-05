import React from 'react';
import { Link } from 'react-router-dom';
import './EManagerHeader.css'; // Custom CSS for SManagerHeader
import userIcon from '../../../core/Images/user.png'; // Path to your user icon

interface SManagerHeaderProps {
    activeTab: string;
}

const EManagerHeader: React.FC<SManagerHeaderProps> = ({ activeTab }) => {
    return (
        <header className="header">
            <nav className="nav-links">
                <Link to="/EManager/event" className={activeTab === 'events' ? 'active' : ''}>Events</Link>
                <Link to="/EManager/addevent" className={activeTab === 'add-event' ? 'active' : ''}>Add Event</Link>
                <Link to="/EManager/fixedtable" className={activeTab === 'fbookings' ? 'active' : ''}>Fixed Event Bookings</Link>
                <Link to="#" className={activeTab === 'payments' ? 'active' : ''}>Payments</Link>
            </nav>
            <div className="user-icon">
                <img src={userIcon} alt="User Icon" />
            </div>
        </header>
    );
};

export default EManagerHeader;
