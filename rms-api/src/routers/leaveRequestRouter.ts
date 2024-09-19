import express from 'express';
import { getLeaveRequests, createLeaveRequest, updateLeaveRequestStatus, deleteLeaveRequest } from '../controller/leaveRequestController';

const router = express.Router();

// Route for fetching leave requests
router.get('/leave-requests', getLeaveRequests);

// Route for creating a leave request
router.post('/leave-requests', createLeaveRequest);

// Route for updating leave request status
router.put('/leave-requests/:id', updateLeaveRequestStatus);

// Route for deleting a leave request
router.delete('/leave-requests/:id', deleteLeaveRequest);

export default router;
