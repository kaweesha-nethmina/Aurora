import express from 'express';
import { signup, login, getAllCustomers, deleteCustomer } from '../controller/customerController';

const router = express.Router();

// Customer routes
router.post('/signup', signup);
router.post('/login', login); // Updated endpoint path
router.get('/', getAllCustomers);
router.delete('/:id', deleteCustomer);

export default router;
