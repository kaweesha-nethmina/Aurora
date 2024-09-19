import { useState } from 'react';
import { Room } from '../states/types';

export const useRoomManagement = (initialRooms: Room[]) => {
  const [rooms, setRooms] = useState(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const addRoom = (newRoom: { name: string; description: string; images: string[] }) => {
    const newRoomWithId = { ...newRoom, id: rooms.length + 1 };
    setRooms([...rooms, newRoomWithId]);
  };

  const editRoom = (room: Room) => {
    setIsEditing(true);
    setSelectedRoom(room);
  };

  const updateRoom = () => {
    if (selectedRoom) {
      const updatedRooms = rooms.map((room) => (room.id === selectedRoom.id ? selectedRoom : room));
      setRooms(updatedRooms);
      setIsEditing(false);
      setSelectedRoom(null);
    }
  };

  const deleteRoom = (id: number) => {
    const filteredRooms = rooms.filter((room) => room.id !== id);
    setRooms(filteredRooms);
  };

  return {
    rooms,
    selectedRoom,
    isEditing,
    addRoom,
    editRoom,
    updateRoom,
    deleteRoom,
    setSelectedRoom,
  };
};
