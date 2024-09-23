export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string; // This should hold the image URL
  foodCode: string;
}

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const response = await fetch('http://localhost:5000/api/menu-items');
    if (!response.ok) throw new Error('Failed to fetch menu items');
    const data = await response.json();
    console.log(data); // Log the fetched data to inspect
    return data; // Ensure that data includes the image field
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
};
