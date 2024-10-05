import multer from 'multer';
import express from 'express';
import { addEvent, getAllEvents, updateEvent, deleteEvent } from '../controller/eventController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Configure the uploads directory

router.post('/events', upload.single('image'), addEvent);
router.get('/events', getAllEvents);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

export default router;
