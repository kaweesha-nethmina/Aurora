import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import '../../../employees/EmployeeDashboard.css'; // Shared CSS file
import SManagerHeader from './SManagerHeader'; // Header for SManager
import Sidebar from '../../../core/components/Sidebar';

const SManagerDashboard: React.FC = () => {
    const location = useLocation();

    // Set the active tab based on the current path
    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/SManager/appointments') return 'appointments';
        if (path === '/SManager/add-customer') return 'add-customer';
        if (path === '/SManager/inventory') return 'inventory';
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
