import React from 'react';

interface RoomSearchProps {
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RoomSearch: React.FC<RoomSearchProps> = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="search"
      value={searchTerm}
      onChange={onSearch}
      placeholder="Search rooms"
      className="search-input"
    />
  );
};

export default RoomSearch;
