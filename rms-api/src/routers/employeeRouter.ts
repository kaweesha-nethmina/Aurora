// src/routers/employeeRouter.ts
import { Router } from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../controller/employeeController';

const router = Router();

// Define routes
router.get('/', getEmployees); // Matches /employees
router.get('/:id', getEmployeeById);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
