import { Request, Response } from 'express';
import DutyRoaster from '../model/dutyRoasterModel';
import Employee from '../model/employeeModel';

// Get all duty roasters
export const getAllDutyRoasters = async (req: Request, res: Response) => {
  try {
    console.log('Fetching duty roasters...');
    const dutyRoasters = await DutyRoaster.find();
    console.log('Duty roasters fetched:', dutyRoasters);
    res.status(200).json(dutyRoasters);
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching duty roasters:', err.message);
    res.status(500).json({ message: 'Failed to fetch duty roasters', error: err.message });
  }
};

// Create a new duty roaster entry
export const createDutyRoaster = async (req: Request, res: Response) => {
  console.log('Request body:', req.body); // Log the request body
  const { date, employeeName, shift } = req.body;

  if (!date || !employeeName || !shift) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newDutyRoaster = new DutyRoaster({ date, employeeName, shift });
    await newDutyRoaster.save();
    console.log('Duty Roaster Created:', newDutyRoaster);
    res.status(201).json(newDutyRoaster);
  } catch (error) {
    const err = error as Error;
    console.error('Failed to create duty roaster entry:', err.message);
    res.status(500).json({ message: 'Failed to create duty roaster entry', error: err.message });
  }
};

// Update an existing duty roaster entry
export const updateDutyRoaster = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, employeeName, shift } = req.body;

  try {
    const updatedDutyRoaster = await DutyRoaster.findByIdAndUpdate(
      id,
      { date, employeeName, shift },
      { new: true, runValidators: true }
    );

    if (!updatedDutyRoaster) {
      return res.status(404).json({ message: 'Duty roaster entry not found' });
    }

    console.log('Duty Roaster Updated:', updatedDutyRoaster);
    res.status(200).json(updatedDutyRoaster);
  } catch (error) {
    const err = error as Error;
    console.error('Failed to update duty roaster entry:', err.message);
    res.status(500).json({ message: 'Failed to update duty roaster entry', error: err.message });
  }
};

// Delete a duty roaster entry
export const deleteDutyRoaster = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedDutyRoaster = await DutyRoaster.findByIdAndDelete(id);

    if (!deletedDutyRoaster) {
      return res.status(404).json({ message: 'Duty roaster entry not found' });
    }

    res.status(200).json({ message: 'Duty roaster entry deleted successfully' });
  } catch (error) {
    const err = error as Error;
    console.error('Failed to delete duty roaster entry:', err.message);
    res.status(500).json({ message: 'Failed to delete duty roaster entry', error: err.message });
  }
};

// Get all employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching employees:', err.message);
    res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
  }
};
