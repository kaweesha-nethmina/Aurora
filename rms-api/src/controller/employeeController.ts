import { Request, Response } from 'express';
import Employee from '../model/employeeModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
// Create a new employee
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
      const maxEmployee = await Employee.findOne().sort({ employeeID: -1 });
      const newEmployeeID = maxEmployee ? parseInt(maxEmployee.employeeID) + 1 : 1;

      const { firstName, lastName, position, department, hire_date, contact_info } = req.body;

      if (!firstName || !lastName || !position || !department || !hire_date || !contact_info) {
          res.status(400).json({ message: 'All fields are required' });
          return;
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(contact_info.password, 10);

      const newEmployee = new Employee({
          employeeID: newEmployeeID.toString(),
          firstName,
          lastName,
          position,
          department,
          hire_date,
          contact_info: {
              ...contact_info,
              password: hashedPassword, // Store hashed password
          },
      });

      const savedEmployee = await newEmployee.save();
      res.status(201).json(savedEmployee);
  } catch (err: unknown) {
      console.error('Error creating employee:', err);
      res.status(500).json({ message: (err as Error).message || 'An error occurred while creating the employee' });
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

// Login employee
export const loginEmployee = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const employee = await Employee.findOne({ "contact_info.username": username });

    if (!employee || !employee.contact_info) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, employee.contact_info.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({ token, employee: { // Include employee data
      id: employee._id,
      username: employee.contact_info.username,
      email: employee.contact_info.email,
      firstName: employee.firstName,
      lastName: employee.lastName,
      phone: employee.contact_info.phone,
    } });
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
};




