import express from 'express';
import { addDriver, getDrivers, updateDriver, deleteDriver } from '../controller/driverController';

const router = express.Router();

// POST: Add a new driver
router.post('/drivers', addDriver);

// GET: Get all drivers
router.get('/drivers', getDrivers);

// PUT: Update driver by driverCode
router.put('/drivers/:driverCode', updateDriver);

// DELETE: Delete driver by driverCode
router.delete('/drivers/:driverCode', deleteDriver);

export default router;
