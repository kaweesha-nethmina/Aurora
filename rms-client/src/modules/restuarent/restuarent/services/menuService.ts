// src/services/menuService.ts

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const response = await fetch('http://localhost:5000/api/menu-items');
    if (!response.ok) throw new Error('Failed to fetch menu items');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
};
