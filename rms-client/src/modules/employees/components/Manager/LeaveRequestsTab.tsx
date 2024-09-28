import React from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Button, 
    CircularProgress, 
    Alert 
} from '@mui/material';
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

  if (loading) return <CircularProgress />; // Loading spinner

  return (
    <div className="leaveRequestsContainer">
      <h2 className="leaveRequestsHeader">Leave Requests</h2>
      {error && <Alert severity="error">{error}</Alert>} {/* Display error message */}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveRequests.map((request: LeaveRequest) => (
              <TableRow key={request._id}>
                <TableCell>{request.employee}</TableCell>
                <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{request.catagory}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleStatusChange(request._id, 'approved')}
                    style={{ marginRight: '5px' }} // Spacing
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleStatusChange(request._id, 'rejected')}
                    style={{ marginRight: '5px' }} // Spacing
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={() => handleDelete(request._id)}
                  >
                    🗑️
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeaveRequestsTab;
