export interface MenuItem {
  _id?: string; // Optional for new items
  name: string;
  price: number;
  description: string;
  foodCode: string;
  category: string;
  image: string; // Include the image property
  availability?: boolean; // Optional, depending on your needs
}

export const addMenuItem = async (menuItem: MenuItem) => {
  const response = await fetch('http://localhost:5000/api/menu-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuItem),
  });

  if (!response.ok) {
    throw new Error('Failed to add menu item');
  }

  return response.json();
};

export const editMenuItem = async (menuItem: MenuItem) => {
  const response = await fetch(`http://localhost:5000/api/menu-items/${menuItem._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuItem),
  });

  if (!response.ok) {
    throw new Error('Failed to edit menu item');
  }

  return response.json();
};
