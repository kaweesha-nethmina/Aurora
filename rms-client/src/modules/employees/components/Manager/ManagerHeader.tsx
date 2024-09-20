import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HRManagerHeader.css'; // Import a CSS file for styling
 // Ensure the correct path to your logo image
import userIcon from '../../../core/Images/user.png'; // Ensure the correct path to your user icon image

interface ManagerHeaderProps {
  activeTab: string;
}

const ManagerHeader: React.FC<ManagerHeaderProps> = ({ activeTab }) => {
  return (
    <header className="headerHR">
      
      <nav className="nav-links">
        <Link to="/hr/employees" className={activeTab === 'employees' ? 'active' : ''}>Employees</Link>
        <Link to="/hr/leave-requests" className={activeTab === 'leave-requests' ? 'active' : ''}>Leave Requests</Link>
        <Link to="/hr/duty-roaster" className={activeTab === 'duty-roaster' ? 'active' : ''}>Duty Roaster</Link>
        <Link to="/hr/add-employees" className={activeTab === 'add-employees' ? 'active' : ''}>Add Employees</Link>
        <Link to="/hr/chat" className={activeTab === 'chat' ? 'active' : ''}>Chat</Link>
        <Link to="/hr/reports" className={activeTab === 'reports' ? 'active' : ''}>Reports</Link>
        <Link to="/hr/notices" className={activeTab === 'notices' ? 'active' : ''}>Notices</Link>
      </nav>
      <div className="user-icon">
        <img src={userIcon} alt="User Icon" />
      </div>
    </header>
  );
};

export default ManagerHeader;
