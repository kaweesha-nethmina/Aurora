import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './SManagerDashboard.css'; // Shared CSS file
import SManagerHeader from './SManagerHeader'; // Header for SManager
import Sidebar from '../../../core/components/Sidebar';

const SManagerDashboard: React.FC = () => {
    const location = useLocation();

    // Set the active tab based on the current path
    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/SManager/Sappointments') return 'appointments';
        if (path === '/SManager/spaTable') return 'add-customer';
        if (path === '/SManager/report') return 'inventory';
        return '';
    };

    return (
        <div className="dashboard-layoutS">
            <Sidebar /> {/* Sidebar on the left */}
            <div className="dashboard-contentS">
                <SManagerHeader activeTab={getActiveTab()} /> {/* Header for SManagerDashboard */}
                <div className="dashboard-containerS">
                    <Outlet /> {/* Renders the matched child route */}
                </div>
            </div>
        </div>
    );
};

export default SManagerDashboard;
