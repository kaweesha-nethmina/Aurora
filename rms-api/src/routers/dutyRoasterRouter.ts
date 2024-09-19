import express from 'express';
import { getAllDutyRoasters, createDutyRoaster, updateDutyRoaster, deleteDutyRoaster } from '../controller/dutyRoasterController';

const router = express.Router();

router.get('/', getAllDutyRoasters);
router.post('/', createDutyRoaster);
router.put('/:id', updateDutyRoaster);
router.delete('/:id', deleteDutyRoaster);

export default router;
