import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ManagerHeader from './components/Manager/ManagerHeader';
import Sidebar from '../core/components/Sidebar';
import '../employees/ManagerDashboard.css';

const ManagerDashboard: React.FC = () => {
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/hr/employees') return 'employees';
    if (path === '/hr/leave-requests') return 'leave-requests';
    if (path === '/hr/duty-roaster') return 'duty-roaster';
    if (path === '/hr/add-employees') return 'add-employees';
    if (path === '/hr/chat') return 'chat';
    if (path === '/hr/reports') return 'reports';
    if (path === '/hr/notices') return 'notices';
    if (path === '/hr/manager-profile') return 'profile';
    return '';
  };

  return (
    <div className="dashboard-layoutM">
      <Sidebar /> {/* Sidebar on the left */}
      <div className="dashboard-contentM">
        <ManagerHeader activeTab={getActiveTab()} />
        <div className="dashboard-containerM">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
