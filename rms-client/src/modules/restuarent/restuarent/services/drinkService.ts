// drinkService.ts
export interface DrinkItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    foodCode: string;
}

export const fetchDrinkItems = async (): Promise<DrinkItem[]> => {
    return [
        {
            id: '1',
            name: 'Coca Cola',
            description: 'Refreshing soda',
            price: 1.99,
            image: 'https://i.pinimg.com/564x/26/56/18/265618a6b4460094d0f2b252fcec57d5.jpg',
            category: 'Drinks',
            foodCode: 'D001',
        },
        {
            id: '2',
            name: 'Orange Juice',
            description: 'Freshly squeezed orange juice',
            price: 2.99,
            image: 'https://i.pinimg.com/564x/26/56/18/265618a6b4460094d0f2b252fcec57d5.jpg',
            category: 'Drinks',
            foodCode: 'D002',
        },
        {
            id: '2',
            name: 'Orange Juice',
            description: 'Freshly squeezed orange juice',
            price: 2.99,
            image: 'https://i.pinimg.com/564x/26/56/18/265618a6b4460094d0f2b252fcec57d5.jpg',
            category: 'Drinks',
            foodCode: 'D002',
        },
        {
            id: '2',
            name: 'Orange Juice',
            description: 'Freshly squeezed orange juice',
            price: 2.99,
            image: 'https://i.pinimg.com/564x/26/56/18/265618a6b4460094d0f2b252fcec57d5.jpg',
            category: 'Drinks',
            foodCode: 'D002',
        },
        {
            id: '2',
            name: 'Orange Juice',
            description: 'Freshly squeezed orange juice',
            price: 2.99,
            image: 'https://i.pinimg.com/564x/26/56/18/265618a6b4460094d0f2b252fcec57d5.jpg',
            category: 'Drinks',
            foodCode: 'D002',
        },
        {
            id: '2',
            name: 'Orange Juice',
            description: 'Freshly squeezed orange juice',
            price: 2.99,
            image: 'https://i.pinimg.com/564x/26/56/18/265618a6b4460094d0f2b252fcec57d5.jpg',
            category: 'Drinks',
            foodCode: 'D002',
        },
        // Add more drinks...
    ];
};
