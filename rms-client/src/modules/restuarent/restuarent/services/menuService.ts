export const fetchMenuItems = async () => {
  const response = await fetch('/api/menu-items'); // Update with your actual API endpoint
  if (!response.ok) {
    throw new Error('Failed to fetch menu items');
  }
  return response.json();
};

export const deleteMenuItem = async (id: number) => {
  const response = await fetch(`/api/menu-items/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete menu item');
  }
};

export const addMenuItem = async (menuItem: any) => {
  const response = await fetch('/api/menu-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuItem),
  });
  if (!response.ok) {
    throw new Error('Failed to add menu item');
  }
};

export const editMenuItem = async (menuItem: any) => {
  const response = await fetch(`/api/menu-items/${menuItem.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuItem),
  });
  if (!response.ok) {
    throw new Error('Failed to edit menu item');
  }
};
