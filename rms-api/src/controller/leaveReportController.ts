// controllers/leaveReportController.ts

import { Request, Response } from 'express';
import LeaveRequestModel from '../model/leaveRequestModel';

export const getLeaveReportByEmployee = async (req: Request, res: Response) => {
  try {
    const report = await LeaveRequestModel.aggregate([
      {
        $group: {
          _id: '$employee',
          totalLeaves: { $sum: { $subtract: ['$endDate', '$startDate'] } }, // Calculate total leave duration
          leaveCategories: {
            $push: {
              catagory: '$catagory',
              startDate: '$startDate',
              endDate: '$endDate',
              reason: '$reason',
              status: '$status'
            }
          }
        }
      },
      {
        $project: {
          employee: '$_id',
          totalLeaves: 1,
          leaveCategories: 1
        }
      }
    ]);

    return res.json(report);
  } catch (err) {
    console.error('Error generating leave report:', err);
    res.status(500).json({ message: 'Error generating leave report' });
  }
};
