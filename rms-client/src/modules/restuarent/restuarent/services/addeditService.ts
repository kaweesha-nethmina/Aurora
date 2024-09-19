// Example service methods
export interface MenuItem {
    id?: string;
    name: string;
    price: number;
    description: string;
    foodCode: string;
    category: 'food' | 'drink';
    image: string;
  }
  
  let menuItems: MenuItem[] = [];
  
  export const addMenuItem = async (menuItem: MenuItem): Promise<void> => {
    menuItems.push({ ...menuItem, id: Date.now().toString() });
  };
  
  export const editMenuItem = async (updatedItem: MenuItem): Promise<void> => {
    menuItems = menuItems.map(item => item.id === updatedItem.id ? updatedItem : item);
  };
  
  // Fetch or other methods if necessary
  