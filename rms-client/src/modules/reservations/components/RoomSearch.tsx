import React, { ChangeEvent } from 'react';

interface RoomSearchProps {
  searchTerm: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RoomSearch: React.FC<RoomSearchProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Search rooms"
        value={searchTerm}
        onChange={onSearch}
        className="room-search-input"
      />
    </div>
  );
};

export default RoomSearch;
