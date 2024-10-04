import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
 // Custom header for this dashboard
import './RManagerDashboard.css';
// import '../../../../employees/ManagerDashboard.css'; // Custom CSS file for this dashboard
import RManagerHeader from './RManagerHeader';
import Sidebar from '../../../../core/components/Sidebar';

const RManagerDashboard: React.FC = () => {
    const location = useLocation();
  
    const getActiveTab = () => {
      const path = location.pathname;
      if (path === '/admincancel') return 'admincancel';
      if (path === '/editmenu') return 'editmenu';
      if (path === '/addmenu') return 'addmenu';
      if (path === '/tablereserve') return 'tablereserve';
      if (path === '/report') return 'report'; // Added path for table reservation
      return '';
    };
  
    return (
      <div className="dashboard-layoutR">
        <Sidebar /> {/* Sidebar on the left */}
        <div className="dashboard-contentR">
          <RManagerHeader activeTab={getActiveTab()} /> {/* Header for RManagerDashboard */}
          <div className="dashboard-containerR">
            <Outlet /> {/* Renders the matched child route */}
          </div>
        </div>
      </div>
    );
  };
  
  export default RManagerDashboard;
