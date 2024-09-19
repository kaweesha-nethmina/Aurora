import React from 'react';
import { useRooms } from './hooks/useRooms';
import RoomCard from './components/RoomCard';
import RoomDetailsModal from './components/RoomDetailsModal';
import SearchBar from './components/SearchBar';
import '../reservations/css/styles.css';

const RoomReservationPage: React.FC = () => {
  const {
    search,
    selectedRoom,
    filteredRooms,
    handleSearch,
    handleViewMoreDetails,
    setSelectedRoom,
  } = useRooms();

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Room Reservation</h2>
        <SearchBar search={search} onSearchChange={handleSearch} />
      </div>
      <div className="room-list">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} onViewDetails={handleViewMoreDetails} />
        ))}
      </div>
      {selectedRoom && (
        <RoomDetailsModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </div>
  );
};

export default RoomReservationPage;
