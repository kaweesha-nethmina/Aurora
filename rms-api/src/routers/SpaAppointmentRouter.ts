import { Router } from 'express';
import { createSpaAppointment, getSpaAppointments, getSpaAppointmentById, updateSpaAppointment, deleteSpaAppointment, updateSpaAppointmentStatus } from '../controller/SpaAppointmentController';

const router = Router();

router.post('/', createSpaAppointment);
router.get('/', getSpaAppointments);
router.get('/:id', getSpaAppointmentById);
router.put('/:id', updateSpaAppointment);
router.delete('/:id', deleteSpaAppointment);
router.put('/spaappointments/:id/status', updateSpaAppointmentStatus);


export default router;
