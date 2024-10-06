import { Router } from 'express';
import { 
  createAppointment, 
  getAppointments, 
  getAppointmentById, 
  updateAppointmentStatus, 
  deleteAppointment, 
  updateAppointmentDetails 
} from '../controller/appointmentController';

const router = Router();

router.get('/', getAppointments);
router.post('/', createAppointment);
router.get('/:id', getAppointmentById);
router.put('/:id/status', updateAppointmentStatus); // Using PUT for status update
router.delete('/:id', deleteAppointment);
router.put('/:id', updateAppointmentDetails);

export default router;
