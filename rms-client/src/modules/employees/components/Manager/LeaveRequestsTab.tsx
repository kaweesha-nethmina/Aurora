import React from 'react';
import useLeaveRequests from '../../hooks/Manager/useLeaveRequests';
import { updateLeaveRequestStatus, deleteLeaveRequest, LeaveRequest } from '../../services/Manager/leaveRequestService';
import './ManagerCss/LeaveRequestsStyles.css'; // Import the CSS file

const LeaveRequestsTab: React.FC = () => {
  const { leaveRequests, loading, error } = useLeaveRequests();

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateLeaveRequestStatus(id, status);
      // Refetch data or update local state
      window.location.reload(); // Alternatively, you can refetch data instead of reloading
    } catch (err) {
      console.error('Failed to update leave request status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLeaveRequest(id);
      // Refetch data or update local state
      window.location.reload(); // Alternatively, you can refetch data instead of reloading
    } catch (err) {
      console.error('Failed to delete leave request:', err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="leaveRequestsContainer">
      <h2 className="leaveRequestsHeader">Leave Requests</h2>
      {error && <p>{error}</p>}
      <table className="leaveRequestsTable">
        <thead>
          <tr>
            <th className="tableHeader">Employee</th>
            <th className="tableHeader">Start Date</th>
            <th className="tableHeader">End Date</th>
            <th className="tableHeader">Reason</th>
            <th className="tableHeader">Status</th>
            <th className="tableHeader">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request: LeaveRequest) => (
            <tr key={request._id}>
              <td>{request.employee}</td>
              <td>{request.startDate}</td>
              <td>{request.endDate}</td>
              <td>{request.reason}</td>
              <td>{request.status}</td>
              <td className="actionButtons">
                <button className="approveButton" onClick={() => handleStatusChange(request._id, 'approved')}>Approve</button>
                <button className="rejectButton" onClick={() => handleStatusChange(request._id, 'rejected')}>Reject</button>
                <button className="delete-buttonL" onClick={() => handleDelete(request._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequestsTab;
