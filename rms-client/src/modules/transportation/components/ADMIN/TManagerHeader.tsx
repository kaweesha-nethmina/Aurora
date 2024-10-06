import React from 'react';
import { Link } from 'react-router-dom';
import './TManagerHeader.css'; // Import custom CSS for this header
import userIcon from '../../../core/Images/user.png'; // Path to your user icon image

interface TManagerHeaderProps {
    activeTab: string;
}

const TManagerHeader: React.FC<TManagerHeaderProps> = ({ activeTab }) => {
    return (
        <header className="header">
            <nav className="nav-links">
                <Link to="/Tmanager/drivers" className={activeTab === 'drivers' ? 'active' : ''}>Drivers</Link>
                <Link to="/Tmanager/bookings" className={activeTab === 'bookings' ? 'active' : ''}>Bookings</Link>
                <Link to="/Tmanager/add-drivers" className={activeTab === 'add-drivers' ? 'active' : ''}>Add Drivers</Link>
                <Link to="/Tmanager/report" className={activeTab === 'report' ? 'active' : ''}>Report</Link>
            </nav>
            <div className="user-icon">
                <img src={userIcon} alt="User Icon" />
            </div>
        </header>
    );
};

export default TManagerHeader;
