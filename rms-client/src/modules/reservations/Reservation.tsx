import React, { useState, useEffect, useCallback } from 'react';
import RoomCard from './components/RoomCard';
import RoomSearch from './components/RoomSearch';
import useSearch from './hooks/useSearch';
import useFilter from './hooks/useFilter';
import './styles.css';
import Subheader from './components/Navbar';
import Header from '../core/components/Header';
import { fetchRooms, Room } from './services/roomService';

const Reservation: React.FC = () => {
  const { searchTerm, handleSearch } = useSearch();
  const { selectedType } = useFilter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [visibleDetailId, setVisibleDetailId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const roomsData = await fetchRooms();
      setRooms(roomsData);
      setFilteredRooms(roomsData);
    };
    fetchData();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = rooms.filter((room) =>
      room.roomType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedType) {
      filtered = filtered.filter((room) => room.roomType === selectedType);
    }
    setFilteredRooms(filtered);
  }, [rooms, searchTerm, selectedType]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const toggleRoomDetails = useCallback((roomId: string) => {
    setVisibleDetailId((prevId) => prevId === roomId ? null : roomId);
  }, []);

  return (
    <div className="containerRoom">
      <Header activeTab={'rooms'} />
      <Subheader />
      <h1 className="title">Hotel Rooms</h1>
      <div className="controls">
        <RoomSearch searchTerm={searchTerm} onSearch={handleSearch} />
      </div>
      <div className="room-grid">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room._id.toString()} // Change from room.id to room._id.toString()
            room={room}
            isDetailVisible={visibleDetailId === room._id.toString()} // Change from room.id to room._id.toString()
            onToggleDetail={() => toggleRoomDetails(room._id.toString())} // Change from room.id to room._id.toString()
          />
        ))}
      </div>
    </div>
  );
};

export default Reservation;
