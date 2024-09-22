import { Router } from 'express';
import {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  updateAppointmentDetails,
} from '../controller/appointmentController';

const router = Router();

router.get('/', getAppointments);
router.post('/', createAppointment);
router.get('/:id', getAppointmentById);
router.patch('/:id', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);
router.put('/:id', updateAppointmentDetails);

export default router;
