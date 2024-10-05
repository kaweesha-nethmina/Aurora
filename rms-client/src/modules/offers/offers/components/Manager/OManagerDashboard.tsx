import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './OManagerDashboard.css'; // Assuming you're using a shared CSS file
import OManagerHeader from './OManagerHeader'; // New header import for OManager
import Sidebar from '../../../../core/components/Sidebar';

const OManagerDashboard: React.FC = () => {
    const location = useLocation();

    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/OManager/AddOffer') return 'AddOffer';
        if (path === '/OManager/offers') return 'offers';
        if (path === '/OManager/DataTable') return 'bookings';
        if (path === '/OManager/DailyReportGenerationForm') return 'reports';
        return '';
    };

    return (
        <div className="dashboard-layoutO">
            <Sidebar /> {/* Sidebar on the left */}
            <div className="dashboard-contentO">
                <OManagerHeader activeTab={getActiveTab()} /> {/* Header for OManagerDashboard */}
                <div className="dashboard-containerO">
                    <Outlet /> {/* Renders the matched child route */}
                </div>
            </div>
        </div>
    );
};

export default OManagerDashboard;
