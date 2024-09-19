import { Request, Response } from 'express';
import MenuItem from '../model/menuItemModel';

// Get all menu items
export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (err: unknown) {
    const errorMessage = (err as Error).message;
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
    const { name, price, description, category, image, foodCode, availability } = req.body;

    // Validate required fields
    if (!name || !price || !category || !foodCode) {
      return res.status(400).json({ message: 'Name, price, category, and food code are required' });
    }

    // Create a new menu item
    const newMenuItem = new MenuItem({
      name,
      price,
      description,
      category,
      image, // Updated to match the schema
      foodCode,
      availability,
    });

    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err: unknown) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};

// Edit a menu item by food code
export const editMenuItem = async (req: Request, res: Response) => {
  try {
    const { foodCode } = req.params;
    const updatedMenuItem = await MenuItem.findOneAndUpdate({ foodCode }, req.body, { new: true });

    if (!updatedMenuItem) return res.status(404).json({ message: 'Menu item not found' });

    res.status(200).json(updatedMenuItem);
  } catch (err: unknown) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};

// Delete a menu item by food code
export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { foodCode } = req.params;
    const deletedMenuItem = await MenuItem.findOneAndDelete({ foodCode });

    if (!deletedMenuItem) return res.status(404).json({ message: 'Menu item not found' });

    res.status(200).json({ message: 'Menu item deleted' });
  } catch (err: unknown) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};
