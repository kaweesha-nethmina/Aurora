import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leave-requests'; // Adjust API URL if necessary

export interface LeaveRequest {
  _id: string;
  employee: string;
  startDate: string;
  endDate: string;
  catagory: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const fetchLeaveRequests = async (): Promise<LeaveRequest[]> => {
  try {
    const response = await axios.get<LeaveRequest[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    throw error;
  }
};

export const updateLeaveRequestStatus = async (id: string, status: string): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${id}`, { status });
  } catch (error) {
    console.error('Error updating leave request status:', error);
    throw error;
  }
};

export const deleteLeaveRequest = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting leave request:', error);
    throw error;
  }
};
