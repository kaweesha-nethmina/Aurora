import express from 'express';
import { createNotice, getNotices, updateNotice, deleteNotice } from '../controller/noticesController';

const router = express.Router();

router.post('/', createNotice);       // Create
router.get('/', getNotices);          // Read
router.put('/:id', updateNotice);  // Update
router.delete('/:id', deleteNotice); // Delete

export default router;
