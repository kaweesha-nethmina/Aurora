// Path: restaurant/components/SearchFilter/SearchFilter.tsx
import React from 'react';
import './searchFilter.css';

interface SearchFilterProps {
  category: string;
  setCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ searchTerm, setSearchTerm }) => {


  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search menu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input2"
      />
      {/* <select
        value={category}
        onChange={handleCategoryChange}  // Use the handler function
        className="category-dropdown"
      >
        <option value="All">All</option>
        <option value="Appetizers">Appetizers</option>
        <option value="Main Course">Main Course</option>
        <option value="Drinks">Drinks</option>
        <option value="Desserts">Desserts</option>
      </select> */}
    </div>
  );
};

export default SearchFilter;
