import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './RoomMDashboard.css'; // Custom CSS file for this dashboard
import RoomManagerHeader from './RoomManagerHeader'; // Replace with your actual header component
import Sidebar from '../../../../../src/modules/core/components/Sidebar';

const RoomManagerDashboard: React.FC = () => {
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/roommanager') return 'roommanager'; // Adjust path as needed
    if (path === '/roomedit') return 'roomedit';
    if (path === '/roomadd') return 'roomadd';
    if (path === '/roomreserve') return 'roomreserve'; // Example path for room reservations
    return '';
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />  
       
      <div className="dashboard-content">
      <RoomManagerHeader activeTab={getActiveTab()} />
      
        <div className="dashboard-containerR">
          <Outlet /> {/* Renders the matched child route */}
        </div>
      </div>
    </div>
  );
};

export default RoomManagerDashboard;
