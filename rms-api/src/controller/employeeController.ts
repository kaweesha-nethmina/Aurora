import { Request, Response } from 'express';
import Employee from '../model/employeeModel'; // Adjust path as necessary

// Get all employees
export const getEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Get an employee by ID
export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Create a new employee
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  const { employeeID, firstName, lastName, position, department, hire_date, contact_info } = req.body;

  try {
    const newEmployee = new Employee({
      employeeID,
      firstName,
      lastName,
      position,
      department,
      hire_date,
      contact_info,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err: unknown) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// Update an existing employee by ID
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, { new: true });
    if (updatedEmployee) {
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err: unknown) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// Delete an employee by ID
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (deletedEmployee) {
      res.status(200).json({ message: 'Employee deleted' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
};
