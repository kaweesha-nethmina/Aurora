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
                <Link to="/SManager/Sappointments" className={activeTab === 'appointments' ? 'active' : ''}>Appointments</Link>
                <Link to="#" className={activeTab === 'add-customer' ? 'active' : ''}>Add Customer</Link>
                <Link to="#" className={activeTab === 'inventory' ? 'active' : ''}>Inventory</Link>
            </nav>
            <div className="user-icon">
                <img src={userIcon} alt="User Icon" />
            </div>
        </header>
    );
};

export default SManagerHeader;
