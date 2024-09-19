export interface Room {
    id: number;
    roomType: string;
    price: number;
    rating: number;
    description: string;
    image: string;
  }
  
  export const initialRooms: Room[] = [
    { id: 1, roomType: 'Single', price: 100, rating: 4.5, description: 'Single room with one bed', image: 'https://example.com/image1.jpg' },
    { id: 2, roomType: 'Double', price: 200, rating: 4.8, description: 'Double room with two beds', image: 'https://example.com/image2.jpg' },
    { id: 3, roomType: 'Suite', price: 500, rating: 5, description: 'Suite room with one bed and living area', image: 'https://example.com/image3.jpg' },
  ];
  