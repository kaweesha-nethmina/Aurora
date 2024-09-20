// Path: src/components/Menu/Menu.tsx

import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import SearchFilter from './SearchFilter';
import { fetchMenuItems, MenuItem as MenuItemType } from '../../services/menuService';
import { filterMenuItems } from '../../utils/filterUtils';
import './menu.css';
import Header from '../../../../core/components/Header';
import Navbar from '../HomePage/ResNavbar';

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch menu items from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMenuItems();
        setMenuItems(data);
        setFilteredItems(data); // Initialize filtered items with all items
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchData();
  }, []);

  // Update filtered items whenever menuItems, category, or searchTerm change
  useEffect(() => {
    const filtered = filterMenuItems(menuItems, category, searchTerm);
    setFilteredItems(filtered);
  }, [menuItems, category, searchTerm]);

  return (
    <div className="menu">
      <Header activeTab={''} />
      <Navbar />
      <h2>Our Menu</h2>
      <SearchFilter
        category={category}
        setCategory={setCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="menu-items">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))
        ) : (
          <p>No menu items found.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
