import React, { useState, useEffect } from 'react';
import './LeaveRequestsTab.css';

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
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

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

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    
    if (!name.trim()) {
      newErrors.push('Name is required.');
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
    } else if (reason.length < 10) {
      newErrors.push('Reason must be at least 10 characters long.');
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
          employee: name,
          startDate,
          endDate,
          reason,
          status: 'pending',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit leave request');
      }

      const newRequest = await response.json();
      setLeaveRequests([...leaveRequests, { ...newRequest, id: leaveRequests.length + 1 }]);
      
      setName('');
      setStartDate('');
      setEndDate('');
      setReason('');
      setErrors([]);
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
          {errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
                <p key={index} className="error">{error}</p>
              ))}
            </div>
          )}
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
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map(request => (
              <tr key={request.id}>
                <td>{request.id}</td>
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
