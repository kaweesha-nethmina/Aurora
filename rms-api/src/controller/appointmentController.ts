import express, { Request, Response } from 'express';
import Appointment from '../model/appointmentModel';
import { Types } from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Get all appointments
export const getAppointments = async (req: Request, res: Response): Promise<Response> => {
  try {
    const appointments = await Appointment.find();
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// Get appointment by ID
export const getAppointmentById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const appointmentId = new Types.ObjectId(req.params.id);
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// Create a new appointment
export const createAppointment = async (req: Request, res: Response): Promise<Response> => {
  const { doctor, name, email, phone, date, time } = req.body;

  const newAppointment = new Appointment({
    doctor,
    name,
    email,
    phone,
    date,
    time,
    status: 'Pending',
  });

  try {
    await newAppointment.save();
    return res.status(201).json(newAppointment);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};

// Update appointment status
export const updateAppointmentStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid appointment ID' });
  }

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    return res.status(200).json(updatedAppointment);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};



// Update appointment details
export const updateAppointmentDetails = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { doctor, name, email, phone, date, time, status } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid appointment ID' });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { doctor, name, email, phone, date, time, status },
      { new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    return res.status(200).json(updatedAppointment);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};


// Delete an appointment
export const deleteAppointment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const appointmentId = new Types.ObjectId(req.params.id);
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
