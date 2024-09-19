import React, { useState, useEffect } from 'react';
import { fetchNotices } from '../../services/Manager/noticeService';
import '../../components/Employee/noticesStyle.css';

const EmployeeNoticesTab: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await fetchNotices();
        setNotices(data);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
        setError('Failed to fetch notices');
      }
    };
    loadNotices();
  }, []);

  return (
    <div className="notices-container">
      <h2 className="notices-header">NOTICES</h2>
      
      {error && <p className="error-message">{error}</p>}

      {notices.length === 0 ? (
        <p>No notices available</p>
      ) : (
        <ul className="notices-list">
          {notices.map(notice => (
            <li key={notice._id} className="notice-item2">
              <h3 className="notice-title">{notice.title}</h3>
              <p className="notice-description">{notice.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeNoticesTab;
