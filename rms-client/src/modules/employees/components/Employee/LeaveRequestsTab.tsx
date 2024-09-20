import React, { useState, useEffect } from 'react';
import './LeaveRequestsTab.css'; // Ensure the CSS file is present

interface LeaveRequest {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

const LeaveRequestForm: React.FC = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]); // Initialize as empty array

  // Fetch leave requests on component mount
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the end date is after the start date
    if (new Date(startDate) > new Date(endDate)) {
      alert('End Date must be after Start Date');
      return;
    }

    try {
      // Post request to the backend
      const response = await fetch('http://localhost:5000/api/leave-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee: name,
          startDate,
          endDate,
          reason,
          status: 'pending', // Default status
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit leave request');
      }

      const newRequest = await response.json();
      // Add the new leave request to the state
      setLeaveRequests([...leaveRequests, { ...newRequest, id: leaveRequests.length + 1 }]);
      
      // Clear the form fields
      setName('');
      setStartDate('');
      setEndDate('');
      setReason('');
    } catch (err) {
      console.error('Error submitting leave request:', err);
    }
  };

  return (
    <div className="leave-request-form-container">
      <div className="cardL">
        <h2 className="leave-request-form-title">Request Leave</h2>
        <form onSubmit={handleSubmit} className="leave-request-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason:</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
  
      <div className="cardR">
        <h2 className="leave-requests-title">Leave Requests</h2>
        <table className="leave-requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map(request => (
              <tr key={request.id}>
                <td>{request.name}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.reason}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default LeaveRequestForm;
