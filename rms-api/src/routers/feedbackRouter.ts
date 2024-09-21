// src/routers/feedbackRouter.ts
import express from 'express';
import { addFeedback, getFeedbacks, deleteFeedback } from '../controller/feedbackController';

const router = express.Router();

// POST: Add new feedback
router.post('/feedback', addFeedback);

// GET: Get all feedback
router.get('/feedback', getFeedbacks);

// DELETE: Delete feedback by ID
router.delete('/feedback/:id', deleteFeedback);

export default router;