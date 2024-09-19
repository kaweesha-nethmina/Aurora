// src/routes/chatRoutes.ts

import express from 'express';
import { getChats, createChat, deleteChat } from '../controller/chatController';

const router = express.Router();

router.get('/chats', getChats);
router.post('/chats', createChat);
router.delete('/chats/:id', deleteChat); // Add route for deleting chat messages

export default router;
