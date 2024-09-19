import express from 'express';
import {
  getMenuItems,
  getMenuItemById,
  addMenuItem,
  editMenuItem,
  deleteMenuItem,
} from './../controller/menuController';

const router = express.Router();

// Get all menu items
router.get('/menuItems', getMenuItems);

// Get a specific menu item by ID
router.get('/menuItems/:id', getMenuItemById);

// Add a new menu item
router.post('/menuItems', addMenuItem);

// Edit a specific menu item by ID
router.put('/menuItems/:id', editMenuItem);

// Delete a specific menu item by ID
router.delete('/menuItems/:id', deleteMenuItem);

export default router;
