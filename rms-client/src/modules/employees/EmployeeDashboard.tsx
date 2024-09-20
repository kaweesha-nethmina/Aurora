import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom'; // Import useLocation for routing information
import EmployeeHeader from './components/Employee/EmployeeHeader'; // Ensure the correct path
import './EmployeeDashboard.css'; // Ensure the correct path

const EmployeeDashboard: React.FC = () => {
  const location = useLocation();

  // Function to determine the active tab
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('profile')) return 'profile';
    if (path.includes('leave-requests')) return 'leave-requests';
    if (path.includes('duty-roaster')) return 'duty-roaster';
    if (path.includes('chat')) return 'chat';
    if (path.includes('notices')) return 'notices';
    return ''; // Default to an empty string if no match
  };

  return (
    <div>
      <EmployeeHeader activeTab={getActiveTab()} />
      <div className="dashboard-Emp">
        <main className="main-contentEmp">
          <Outlet /> {/* This will render the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
