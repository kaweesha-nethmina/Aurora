import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeHeader.css'; // Import CSS file for styling
import logo from '../../../core/Images/Aurora white.png'; 
interface EmployeeHeaderProps {
  activeTab: string;
}

const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({ activeTab }) => {
  return (
    <header className="employee-header">
      <div className="logo">
        <img src={logo} alt="Aurora Logo" />
      </div>
      <nav className="nav-links">
        <Link to="profile" className={activeTab === 'profile' ? 'active' : ''}>Profile</Link>
        <Link to="leave-requests" className={activeTab === 'leave-requests' ? 'active' : ''}>Leave Requests</Link>
        <Link to="duty-roaster" className={activeTab === 'duty-roaster' ? 'active' : ''}>Duty Roaster</Link>
        <Link to="chat" className={activeTab === 'chat' ? 'active' : ''}>Chat</Link>
        <Link to="notices" className={activeTab === 'notices' ? 'active' : ''}>Notices</Link>
      </nav>
    </header>
  );
};

export default EmployeeHeader;