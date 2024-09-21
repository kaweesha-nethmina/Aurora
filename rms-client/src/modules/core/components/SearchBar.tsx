import React, { useState } from 'react';
 // Add styles specific to the search bar

interface SearchBarProps {
  onSearch: (searchParams: {
    date: string;
    roomType: string;
    memberCount: number;
  }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [date, setDate] = useState('');
  const [roomType, setRoomType] = useState('');
  const [memberCount, setMemberCount] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ date, roomType, memberCount });
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="input-group">
        <label htmlFor="date">Check-in Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="roomType">Room Type:</label>
        <select
          id="roomType"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          required
        >
          <option value="">Select Room Type</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="memberCount">Members:</label>
        <input
          type="number"
          id="memberCount"
          value={memberCount}
          onChange={(e) => setMemberCount(Number(e.target.value))}
          min="1"
          required
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
