import express from 'express';
import { getMenuItems, getMenuItemById, addMenuItem, editMenuItem, deleteMenuItem } from '../controller/menuController';

const router = express.Router();

// GET all menu items
router.get('/', getMenuItems);

// GET a menu item by ID
router.get('/:id', getMenuItemById);

// POST add a new menu item
router.post('/', addMenuItem);

// PUT update a menu item by food code
router.put('/:foodCode', editMenuItem);

// DELETE a menu item by food code
router.delete('/:foodCode', deleteMenuItem);

export default router;