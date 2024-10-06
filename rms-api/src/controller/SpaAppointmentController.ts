import { Request, Response } from 'express';
import SpaAppointment from '../model/SpaAppointment';

// Create a new spa appointment
export const createSpaAppointment = async (req: Request, res: Response) => {
    try {
        const newAppointment = new SpaAppointment(req.body);
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create spa appointment', error });
    }
};

// Get all spa appointments
export const getSpaAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await SpaAppointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve appointments', error });
    }
};

// Get a single spa appointment by ID
export const getSpaAppointmentById = async (req: Request, res: Response) => {
    try {
        const appointment = await SpaAppointment.findById(req.params.id);
        if (appointment) {
            res.status(200).json(appointment);
        } else {
            res.status(404).json({ message: 'Spa appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve appointment', error });
    }
};

// Update a spa appointment
export const updateSpaAppointment = async (req: Request, res: Response) => {
    try {
        const updatedAppointment = await SpaAppointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedAppointment) {
            res.status(200).json(updatedAppointment);
        } else {
            res.status(404).json({ message: 'Spa appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update appointment', error });
    }
};

// Delete a spa appointment
export const deleteSpaAppointment = async (req: Request, res: Response) => {
    try {
        const deletedAppointment = await SpaAppointment.findByIdAndDelete(req.params.id);
        if (deletedAppointment) {
            res.status(200).json({ message: 'Appointment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Spa appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete appointment', error });
    }
};

// In your controller file
export const updateSpaAppointmentStatus = async (req: Request, res: Response) => {
    try {
        const updatedAppointment = await SpaAppointment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (updatedAppointment) {
            res.status(200).json(updatedAppointment);
        } else {
            res.status(404).json({ message: 'Spa appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update appointment', error });
    }
};
