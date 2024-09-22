import { Router } from 'express';
import { addEvent, getAllEvents, updateEvent, deleteEvent } from '../controller/eventController';

const router = Router();

// Add new event
router.post('/events', addEvent);

// Get all events
router.get('/events', getAllEvents);

// Update event by custom ID
router.put('/events/:id', updateEvent); // This assumes you're passing the custom id as a URL param

// Delete event by custom ID
router.delete('/events/:id', deleteEvent); // This also uses the custom id

export default router;
