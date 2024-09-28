import express from 'express';
import { getAllDutyRoasters, createDutyRoaster, updateDutyRoaster, deleteDutyRoaster, getAllEmployees} from '../controller/dutyRoasterController';

const router = express.Router();

router.get('/', getAllDutyRoasters);
router.post('/', createDutyRoaster);
router.put('/:id', updateDutyRoaster);
router.delete('/:id', deleteDutyRoaster);
router.get('/employees', getAllEmployees);

export default router;
