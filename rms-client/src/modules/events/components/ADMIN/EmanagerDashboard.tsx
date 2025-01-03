import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './EmanagerDashboard.css'; // Shared CSS file
import SManagerHeader from './EManagerHeader'; // Header for SManager
import Sidebar from '../../../core/components/Sidebar';

const EManagerDashboard: React.FC = () => {
    const location = useLocation();

    // Set the active tab based on the current path
    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/SManager/events') return 'events';
        if (path === '/SManager/add-event') return 'add-event';
        if (path === '/SManager/bookings') return 'bookings';
        if (path === '/SManager/customtable') return 'payments';
        return '';
    };

    return (
        <div className="dashboard-layoutE">
            <Sidebar /> {/* Sidebar on the left */}
            <div className="dashboard-contentE">
                <SManagerHeader activeTab={getActiveTab()} /> {/* Updated header */}
                <div className="dashboard-containerE">
                    <Outlet /> {/* Renders the matched child route */}
                </div>
            </div>
        </div>
    );
};

export default EManagerDashboard;
