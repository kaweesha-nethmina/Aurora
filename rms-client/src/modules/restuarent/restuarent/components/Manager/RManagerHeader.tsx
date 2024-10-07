import React from 'react';
import { Link } from 'react-router-dom';
import './RManagerHeader.css'; // Import custom CSS for this header
import userIcon from '../../../../core/Images/user.png'; // Path to your user icon image

interface RManagerHeaderProps {
    activeTab: string;
  }
  
  const RManagerHeader: React.FC<RManagerHeaderProps> = ({ activeTab }) => {
    return (
      <header className="header">
        <nav className="nav-links">
          <Link to="/Rmanager/admincancel" className={activeTab === 'admincancel' ? 'active' : ''}>Notify</Link>
          <Link to="/Rmanager/editmenu" className={activeTab === 'editmenu' ? 'active' : ''}>Edit Menu</Link>
          <Link to="/Rmanager/addmenu" className={activeTab === 'addmenu' ? 'active' : ''}>Add Menu</Link>
          <Link to="/Rmanager/tablereserve" className={activeTab === 'tablereserve' ? 'active' : ''}>Table Reserve</Link>
          <Link to="/Rmanager/report" className={activeTab === 'report' ? 'active' : ''}>Report</Link> {/* Added path */}
        </nav>
        <div className="user-icon">
          <img src={userIcon} alt="User Icon" />
        </div>
      </header>
    );
  };
  
  export default RManagerHeader;
