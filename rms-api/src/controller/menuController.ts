import { Request, Response } from 'express';
import MenuItem from '../model/menuItemModel';

// Get all menu items
export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (err: unknown) {
    const errorMessage = (err as Error).message; // Explicitly cast err to Error
    res.status(500).json({ error: errorMessage });
  }
};

// Get a single menu item by ID
export const getMenuItemById = async (req: Request, res: Response) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json(menuItem);
  } catch (err: unknown) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};

// Add a new menu item
export const addMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, price, description, foodCode, category, image } = req.body;
    const newMenuItem = new MenuItem({ name, price, description, foodCode, category, image });
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err: unknown) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};

// Edit a menu item
export const editMenuItem = async (req: Request, res: Response) => {
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json(updatedMenuItem);
  } catch (err: unknown) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json({ message: 'Menu item deleted' });
  } catch (err: unknown) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};
