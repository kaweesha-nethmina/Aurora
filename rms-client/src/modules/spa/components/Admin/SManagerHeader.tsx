import React from 'react';
import { Link } from 'react-router-dom';
import './SManagerHeader.css'; // Custom CSS for SManagerHeader
import userIcon from '../../../core/Images/user.png'; // Path to your user icon

interface SManagerHeaderProps {
    activeTab: string;
}

const SManagerHeader: React.FC<SManagerHeaderProps> = ({ activeTab }) => {
    return (
        <header className="header">
            <nav className="nav-links">
                <Link to="/SManager/Sappointments" className={activeTab === 'appointments' ? 'active' : ''}>Medical</Link>
                <Link to="/SManager/spaTable" className={activeTab === 'add-customer' ? 'active' : ''}>Spa</Link>
                <Link to="/SManager/report" className={activeTab === 'inventory' ? 'active' : ''}>Report</Link>
            </nav>
            <div className="user-icon">
                <img src={userIcon} alt="User Icon" />
            </div>
        </header>
    );
};

export default SManagerHeader;
