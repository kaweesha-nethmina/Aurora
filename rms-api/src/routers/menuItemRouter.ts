import express from 'express';
import multer from 'multer';
import {
  getMenuItems,
  getMenuItemById,
  addMenuItem,
  editMenuItem,
  deleteMenuItem,
} from '../controller/menuController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set the destination for uploaded files

// GET all menu items
router.get('/', getMenuItems);

// GET a menu item by ID
router.get('/:id', getMenuItemById);

// POST add a new menu item (with image upload)
router.post('/', upload.single('image'), addMenuItem);

// PUT update a menu item by food code (with image upload)
router.put('/:foodCode', upload.single('image'), editMenuItem);

// DELETE a menu item by food code
router.delete('/:foodCode', deleteMenuItem);

export default router;
