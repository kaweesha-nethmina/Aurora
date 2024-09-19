// Path: restaurant/services/menuService.ts

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    foodCode: string;  // Add this if not already present
  }
  
  export const fetchMenuItems = async (): Promise<MenuItem[]> => {
    // Example data, replace with real API call
    return [
      {
        id: '1',
        name: 'Cheese Pizza',
        description: 'Delicious cheese pizza with a crispy crust.',
        price: 12.99,
        image: 'https://i.pinimg.com/736x/c3/77/dd/c377dd4a65a53c9824754ce53a9f30e1.jpg',
        category: 'Main Course',
        foodCode: 'F001',
      },
      {
        id: '1',
        name: 'Cheese Pizza',
        description: 'Delicious cheese pizza with a crispy crust.',
        price: 12.99,
        image: 'https://i.pinimg.com/736x/c3/77/dd/c377dd4a65a53c9824754ce53a9f30e1.jpg',
        category: 'Main Course',
        foodCode: 'F001',
      },
      {
        id: '1',
        name: 'Cheese Pizza',
        description: 'Delicious cheese pizza with a crispy crust.',
        price: 12.99,
        image: 'https://i.pinimg.com/736x/c3/77/dd/c377dd4a65a53c9824754ce53a9f30e1.jpg',
        category: 'Main Course',
        foodCode: 'F001',
      },
      {
        id: '1',
        name: 'Cheese Pizza',
        description: 'Delicious cheese pizza with a crispy crust.',
        price: 12.99,
        image: 'https://i.pinimg.com/736x/c3/77/dd/c377dd4a65a53c9824754ce53a9f30e1.jpg',
        category: 'Main Course',
        foodCode: 'F001',
      },
      {
        id: '1',
        name: 'Cheese Pizza',
        description: 'Delicious cheese pizza with a crispy crust.',
        price: 12.99,
        image: 'https://i.pinimg.com/736x/c3/77/dd/c377dd4a65a53c9824754ce53a9f30e1.jpg',
        category: 'Main Course',
        foodCode: 'F001',
      },
      {
        id: '1',
        name: 'Cheese Pizza',
        description: 'Delicious cheese pizza with a crispy crust.',
        price: 12.99,
        image: 'https://i.pinimg.com/736x/c3/77/dd/c377dd4a65a53c9824754ce53a9f30e1.jpg',
        category: 'Main Course',
        foodCode: 'F001',
      },
      // More items...
    ];
  };
  