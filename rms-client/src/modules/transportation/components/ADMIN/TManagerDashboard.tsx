import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './TManagerDashboard.css'; // Custom CSS file for this dashboard
import TManagerHeader from './TManagerHeader'; // Updated to use TManagerHeader
import Sidebar from '../../../core/components/Sidebar';

const TManagerDashboard: React.FC = () => {
    const location = useLocation();
  
    const getActiveTab = () => {
        const path = location.pathname;
        if (path.endsWith('/drivers')) return 'drivers';
        if (path.endsWith('/bookings')) return 'bookings';
        if (path.endsWith('/add-drivers')) return 'add-drivers';
        if (path.endsWith('/report')) return 'report';
        return '';
    };
  
    return (
        <div className="dashboard-layoutT">
            <Sidebar /> {/* Sidebar on the left */}
            <div className="dashboard-contentT">
                <TManagerHeader activeTab={getActiveTab()} /> {/* Header for TManagerDashboard */}
                <div className="dashboard-containerT">
                    <Outlet /> {/* Renders the matched child route */}
                </div>
            </div>
        </div>
    );
};

export default TManagerDashboard;
