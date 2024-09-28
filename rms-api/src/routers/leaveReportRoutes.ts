// routes/leaveReportRoutes.ts

import express from 'express';
import { getLeaveReportByEmployee } from '../controller/leaveReportController';

const router = express.Router();

// Define the route to get leave report by employee
router.get('/leave-report', getLeaveReportByEmployee);

export default router;
