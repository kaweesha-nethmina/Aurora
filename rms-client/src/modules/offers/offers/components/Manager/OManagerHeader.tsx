import React from 'react';
import { Link } from 'react-router-dom';
import './OManagerHeader.css'; // Import custom CSS for this header
import userIcon from '../../../../core/Images/user.png'; // Path to your user icon image

interface OManagerHeaderProps {
    activeTab: string;
}

const OManagerHeader: React.FC<OManagerHeaderProps> = ({ activeTab }) => {
    return (
        <header className="header">
            <nav className="nav-links">
                <Link to="/OManager/AddOffer" className={activeTab === 'add-offer' ? 'active' : ''}>Add Offer</Link>
                <Link to="/OManager/OffersTable" className={activeTab === 'offers' ? 'active' : ''}>Offers</Link>
                <Link to="/OManager/bookings" className={activeTab === 'bookings' ? 'active' : ''}>Bookings</Link>
                <Link to="/OManager/reports" className={activeTab === 'reports' ? 'active' : ''}>Reports</Link>
            </nav>
            <div className="user-icon">
                <img src={userIcon} alt="User Icon" />
            </div>
        </header>
    );
};

export default OManagerHeader;
