import express from 'express';
import { signup, login, getAllCustomers } from '../controller/customerController';

const router = express.Router();

// Customer routes
router.post('/signup', signup);
router.post('/login', login); // Updated endpoint path
router.get('/', getAllCustomers);

export default router;
