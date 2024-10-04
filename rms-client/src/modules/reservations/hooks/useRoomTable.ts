// src/modules/reservations/hooks/useRoomTable.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Room {
  roomId: string;
  _id: string; // Updated to match MongoDB default field name
  roomType: string;
  price: number;
  rating: number;
  description: string;
  image?: string; // Optional
}

const useRoomTable = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get<Room[]>('http://localhost:5000/api/rooms');
        setRooms(response.data); // TypeScript should now infer this as Room[]
      } catch (err) {
        setError('Failed to fetch rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleDelete = async (roomId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/rooms/${roomId}`);
      setRooms(rooms.filter((room) => room._id !== roomId));
    } catch (err) {
      setError('Failed to delete room');
    }
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
  };

  const handleSaveEdit = async () => {
    if (editingRoom) {
      try {
        const updatedRoom = await axios.put<Room>(`http://localhost:5000/api/rooms/${editingRoom._id}`, editingRoom);
        setRooms(
          rooms.map((room) => (room._id === editingRoom._id ? updatedRoom.data : room))
        );
        setEditingRoom(null);
      } catch (err) {
        setError('Failed to save room');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingRoom(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (editingRoom) {
      const { name, value } = e.target;
      setEditingRoom({
        ...editingRoom,
        [name]: name === 'price' || name === 'rating' ? Number(value) : value,
      });
    }
  };
  

  return {
    rooms,
    loading,
    error,
    handleDelete,
    handleEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleInputChange,
    editingRoom,
  };
};

export default useRoomTable;
