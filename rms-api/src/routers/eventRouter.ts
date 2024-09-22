import { Router } from 'express';
import { addEvent, getAllEvents, updateEvent, deleteEvent } from '../controller/eventController';

const router = Router();

// Add new event
router.post('/events', addEvent);

// Get all events
router.get('/events', getAllEvents);

// Update event by ID
router.put('/events/:id', updateEvent);

// Delete event by ID
router.delete('/events/:id', deleteEvent);

export default router;
