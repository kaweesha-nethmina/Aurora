export interface Room {
  id: string; // Changed to string
  name: string;
  price: number;
  rating: number;
  roomType: string;
  image: string; // This should hold the image URL
  description: string;
}

export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const response = await fetch('http://localhost:5000/api/rooms'); // Update your API endpoint
    if (!response.ok) throw new Error('Failed to fetch rooms');
    const data = await response.json();
    return data; // Ensure that data includes all necessary fields
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return [];
  }
};
