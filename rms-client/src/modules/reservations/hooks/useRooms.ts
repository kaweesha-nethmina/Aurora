import { useState } from 'react';

export interface Room {
  id: number;
  name: string;
  price: number;
  facilities: string[];
  image: string;
  description: string;
}

const rooms: Room[] = [
  {
    id: 1,
    name: 'Single Room',
    price: 100,
    facilities: ['Wi-Fi', 'TV', 'Air Conditioner'],
    image: 'https://via.placeholder.com/200x150',
    description: 'This is a single room with one bed and a private bathroom.',
  },
  {
    id: 2,
    name: 'Double Room',
    price: 150,
    facilities: ['Wi-Fi', 'TV', 'Air Conditioner', 'Balcony'],
    image: 'https://via.placeholder.com/200x150',
    description: 'This is a double room with two beds and a private bathroom.',
  },
  {
    id: 3,
    name: 'Suite',
    price: 250,
    facilities: ['Wi-Fi', 'TV', 'Air Conditioner', 'Balcony', 'Living Room'],
    image: 'https://via.placeholder.com/200x150',
    description: 'This is a suite with a living room, two beds, and a private bathroom.',
  },
];

export const useRooms = () => {
  const [search, setSearch] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleViewMoreDetails = (room: Room) => {
    setSelectedRoom(room);
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  return {
    search,
    selectedRoom,
    filteredRooms,
    handleSearch,
    handleViewMoreDetails,
    setSelectedRoom,
  };
};
