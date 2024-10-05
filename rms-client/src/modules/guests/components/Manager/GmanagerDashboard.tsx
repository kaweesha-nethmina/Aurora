import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './GManagerDashboard.css'; // Custom CSS file for this dashboard
import GManagerHeader from './GManagerHeader'; // Updated header import
import Sidebar from '../../../core/components/Sidebar';

const GManagerDashboard: React.FC = () => {
    const location = useLocation();
  
    const getActiveTab = () => {
      const path = location.pathname;
      if (path === '/feedback') return 'feedback';
      if (path === '/users') return 'users';
      if (path === '/reports') return 'reports';
      return '';
    };
  
    return (
      <div className="dashboard-layoutG">
        <Sidebar /> {/* Sidebar on the left */}
        <div className="dashboard-contentG">
          <GManagerHeader activeTab={getActiveTab()} /> {/* Header for GManagerDashboard */}
          <div className="dashboard-containerG">
            <Outlet /> {/* Renders the matched child route */}
          </div>
        </div>
      </div>
    );
};
  
export default GManagerDashboard;
