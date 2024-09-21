import React from 'react';
import { Link } from 'react-router-dom';
import './GManagerHeader.css'; // Import custom CSS for this header
import userIcon from '../../../core/Images/user.png'; // Path to your user icon image

interface GManagerHeaderProps {
    activeTab: string;
}
  
const GManagerHeader: React.FC<GManagerHeaderProps> = ({ activeTab }) => {
    return (
      <header className="header">
        <nav className="nav-links">
          <Link to="/GManager/feedback" className={activeTab === 'feedback' ? 'active' : ''}>Feedback</Link>
          <Link to="/GManager/Adminview" className={activeTab === 'users' ? 'active' : ''}>Users</Link>
          <Link to="/GManager/Dashboard" className={activeTab === 'reports' ? 'active' : ''}>Reports</Link>
        </nav>
        <div className="user-icon">
          <img src={userIcon} alt="User Icon" />
        </div>
      </header>
    );
};
  
export default GManagerHeader;
