import React, { useState } from 'react';
import RoomSearch from './components/RoomSearch';
import RoomList from './components/RoomList';
import { initialRooms } from './utils/roomData';

const Homepage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredRooms = initialRooms.filter((room) =>
    room.roomType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="homepage">
      <RoomSearch searchTerm={searchTerm} onSearch={handleSearch} />
      <RoomList rooms={filteredRooms} />
    </div>
  );
};

export default Homepage;
