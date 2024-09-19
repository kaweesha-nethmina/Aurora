import { useState, useEffect } from 'react';
import { fetchLeaveRequests, LeaveRequest } from '../../services/Manager/leaveRequestService';

const useLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLeaveRequests();
        setLeaveRequests(data);
      } catch (err) {
        console.error('Error fetching leave requests:', err); // Log error for debugging
        setError('Failed to fetch leave requests');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { leaveRequests, loading, error };
};

export default useLeaveRequests;
