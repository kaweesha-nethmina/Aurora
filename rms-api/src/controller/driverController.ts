// src/controllers/driverController.ts
import { Request, Response } from 'express';
import Driver from '../model/driverModel';

// Add new driver
export const addDriver = async (req: Request, res: Response) => {
  try {
    const { driverCode, firstName, lastName, phoneNumber } = req.body;

    // Check for existing driver code
    const existingDriver = await Driver.findOne({ driverCode });
    if (existingDriver) {
      return res.status(400).json({ message: 'Driver code already exists' });
    }

    const driver = new Driver({
      driverCode,
      firstName,
      lastName,
      phoneNumber,
    });

    await driver.save();
    res.status(201).json({ message: 'Driver added successfully', driver });
  } catch (error) {
    console.error('Error adding driver:', error);
    res.status(500).json({ message: 'Failed to add driver', error });
  }
};

// Get all drivers
export const getDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ message: 'Failed to fetch drivers', error });
  }
};

// Update driver by driverCode
export const updateDriver = async (req: Request, res: Response) => {
  const { driverCode } = req.params;
  const { firstName, lastName, phoneNumber } = req.body;

  try {
    const updatedDriver = await Driver.findOneAndUpdate(
      { driverCode },
      { firstName, lastName, phoneNumber },
      { new: true } // Return the updated driver
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ message: 'Driver updated successfully', driver: updatedDriver });
  } catch (error) {
    console.error('Error updating driver:', error);
    res.status(500).json({ message: 'Failed to update driver', error });
  }
};

// Delete driver by driverCode
export const deleteDriver = async (req: Request, res: Response) => {
  const { driverCode } = req.params;

  try {
    const deletedDriver = await Driver.findOneAndDelete({ driverCode });

    if (!deletedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    console.error('Error deleting driver:', error);
    res.status(500).json({ message: 'Failed to delete driver', error });
  }
};
