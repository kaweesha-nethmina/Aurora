import React from 'react';

interface RoomFilterProps {
  selectedType: string;
  onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RoomFilter: React.FC<RoomFilterProps> = ({ selectedType, onFilter }) => {
  return (
    <select value={selectedType} onChange={onFilter} className="filter-select">
      <option value="">All Types</option>
      <option value="single">Single</option>
      <option value="double">Double</option>
      <option value="suite">Suite</option>
      <option value="family">Family</option>
      <option value="deluxe">Deluxe</option>
    </select>
  );
};

export default RoomFilter;
