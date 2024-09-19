// Path: restaurant/components/SearchFilter/SearchFilter.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import './searchFilter.css';

interface SearchFilterProps {
  category: string;
  setCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ category, setCategory, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    // Navigate to /drinks if Drinks is selected
    if (selectedCategory === 'Drinks') {
      navigate('/drinks');
    }
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search menu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <select
        value={category}
        onChange={handleCategoryChange}  // Use the handler function
        className="category-dropdown"
      >
        <option value="All">All</option>
        <option value="Appetizers">Appetizers</option>
        <option value="Main Course">Main Course</option>
        <option value="Drinks">Drinks</option>
        <option value="Desserts">Desserts</option>
      </select>
    </div>
  );
};

export default SearchFilter;
