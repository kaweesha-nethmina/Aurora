import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import './LeaveRequestsTab.css';

interface LeaveRequest {
  id: number;
  employee: string;
  startDate: string;
  endDate: string;
  catagory: string;
  reason: string;
  status: string;
}

const LeaveRequestForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [catagory, setCatagory] = useState('');
  const [reason, setReason] = useState('');
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<LeaveRequest[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const storedEmployeeData = localStorage.getItem('employeeData');
    const employee = storedEmployeeData ? JSON.parse(storedEmployeeData) : null;
    if (employee) {
      setFullName(`${employee.firstName} ${employee.lastName}`);
    }
  }, []);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/leave-requests');
        if (!response.ok) throw new Error('Failed to fetch leave requests');
        const requests = await response.json();
        setLeaveRequests(requests);
      } catch (err) {
        console.error('Error fetching leave requests:', err);
      }
    };

    fetchLeaveRequests();
  }, []);

  useEffect(() => {
    if (fullName) {
      const userRequests = leaveRequests.filter((request) => request.employee === fullName);
      setFilteredRequests(userRequests);
    }
  }, [fullName, leaveRequests]);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    
    if (!fullName.trim()) {
      newErrors.push('Full Name is required.');
    }

    if (!startDate) {
      newErrors.push('Start Date is required.');
    }

    if (!endDate) {
      newErrors.push('End Date is required.');
    } else if (new Date(startDate) > new Date(endDate)) {
      newErrors.push('End Date must be after Start Date.');
    }

    if (!reason.trim()) {
      newErrors.push('Reason is required.');
    } else if (reason.length < 3) {
      newErrors.push('Reason must be at least 3 characters long.');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/leave-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee: fullName,
          startDate,
          endDate,
          catagory,
          reason,
          status: 'pending',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit leave request');
      }

      const newRequest = await response.json();
      setLeaveRequests([...leaveRequests, { ...newRequest, id: leaveRequests.length + 1 }]);
      setSnackbarMessage('Leave request submitted successfully!');
      setSnackbarOpen(true);
      
      // Reset fields
      setFullName('');
      setStartDate('');
      setEndDate('');
      setCatagory('');
      setReason('');
      setErrors([]);
    } catch (err) {
      console.error('Error submitting leave request:', err);
    }
  };

  const getRowClassName = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'approved-row';
      case 'rejected':
        return 'rejected-row';
      case 'pending':
        return 'pending-row';
      default:
        return '';
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="leave-request-form-container">
      
      <Paper className="cardL" elevation={3}>
        <Typography variant="h5" className="leave-request-form-title">Request Leave</Typography>
        <form onSubmit={handleSubmit} className="leave-request-form">
          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            margin="normal"
            required
            variant="outlined"
          />
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            margin="normal"
            required
            variant="outlined"
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            margin="normal"
            required
            variant="outlined"
          />
          <Select
            label="Category"
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
            fullWidth
            margin="dense"  // Adjusted margin here
            required
            displayEmpty
          >
            <MenuItem value="" disabled>Select a category</MenuItem>
            <MenuItem value="annual">Annual</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
          </Select>

          <TextField
            label="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
            variant="outlined"
          />
          {errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
                <Typography key={index} color="error">{error}</Typography>
              ))}
            </div>
          )}
          <Button type="submit" variant="contained" color="primary" className="submit-button">Submit</Button>
        </form>
      </Paper>
  
      <Paper className="cardR" elevation={3}>
        <Typography variant="h5" className="leave-requests-title">Leave Requests</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map(request => (
                <TableRow key={request.id} className={getRowClassName(request.status)}>
                  <TableCell>{request.employee}</TableCell>
                  <TableCell>{request.startDate}</TableCell>
                  <TableCell>{request.endDate}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>{request.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LeaveRequestForm;
