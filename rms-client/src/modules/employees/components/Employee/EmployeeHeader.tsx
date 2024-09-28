import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import logo from '../../../core/Images/Aurora white.png'; 

interface EmployeeHeaderProps {
  activeTab: string;
}

const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({ activeTab }) => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#272727' }}>
      <Toolbar sx={{ minHeight: '48px', padding: '0 8px' }}> {/* Reduced height */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Aurora Logo" style={{ height: '30px', marginRight: '8px' }} /> {/* Adjusted logo height */}
          
        </div>
        <Tabs value={activeTab} textColor="inherit">
          <Tab label="Profile" component={Link} to="profile" value="profile" />
          <Tab label="Leave Requests" component={Link} to="leave-requests" value="leave-requests" />
          <Tab label="Duty Roaster" component={Link} to="duty-roaster" value="duty-roaster" />
          <Tab label="Chat" component={Link} to="chat" value="chat" />
          <Tab label="Notices" component={Link} to="notices" value="notices" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default EmployeeHeader;
