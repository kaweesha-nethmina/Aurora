import { Request, Response } from 'express';
import LeaveRequestModel from '../model/leaveRequestModel';

// Fetch all leave requests
export const getLeaveRequests = async (req: Request, res: Response) => {
  try {
    const leaveRequests = await LeaveRequestModel.find();
    res.status(200).json(leaveRequests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leave requests', error: err });
  }
};

// Create a new leave request
export const createLeaveRequest = async (req: Request, res: Response) => {
  try {
    const leaveRequest = new LeaveRequestModel(req.body);
    await leaveRequest.save();
    res.status(201).json(leaveRequest);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create leave request', error: err });
  }
};

// Update leave request status
export const updateLeaveRequestStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const updatedLeaveRequest = await LeaveRequestModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedLeaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.status(200).json(updatedLeaveRequest);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update leave request status', error: err });
  }
};

// Delete a leave request
export const deleteLeaveRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const deletedLeaveRequest = await LeaveRequestModel.findByIdAndDelete(id);
    if (!deletedLeaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.status(200).json({ message: 'Leave request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete leave request', error: err });
  }
};