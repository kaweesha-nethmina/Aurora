import React from 'react';

interface SearchBarProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onSearchChange }) => {
  return (
    <input
      type="search"
      value={search}
      onChange={onSearchChange}
      placeholder="Search offers" // Update placeholder to match context
      className="search-bar"
    />
  );
};

export default SearchBar;
